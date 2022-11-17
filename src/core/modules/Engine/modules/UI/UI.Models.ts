import * as Prototype from "../Prototype/Prototype";
import {
  Template as TemplateInterface,
  ElementUI as ElementInterface,
  NodeUI as NodeInterface,
  GUI as GlobalUserInterface,
} from "./UI.Interfaces";

export {
  TemplateInterface,
  ElementInterface,
  NodeInterface,
  GlobalUserInterface
};

import { GhostController } from "../../../../Core";

export class Template<T> implements TemplateInterface<T>{

  type:string = "";
  prop:Record<string,string|boolean|number> = {};
  childrens:NodeInterface|[] = new NodeUI;
  proto:T;

  constructor(template?:TemplateInterface<T>){
    if(template)this.Main(template);
  }

  Main(template:TemplateInterface<T>){
    if(template.type)this.type = template.type;
    if(template.prop)this.prop = template.prop;
    if(template.childrens)this.childrens = (Array.isArray(template.childrens)? new NodeUI(template.childrens) : template.childrens)
    if(template.proto)this.proto = template.proto;
  }

}

export class ElementUI<T> implements ElementInterface<T>{

  #template:TemplateInterface<T> = new Template;
  get template(){return this.#template}
  get type(){return this.#template.type;}
  get prop(){return this.#template.prop;}
  get childrens(){return this.#template.childrens;}
  get proto(){return this.#template.proto;}

  constructor(template?:TemplateInterface<T>){
    if(template)this.Main(template);
  }

  Main(template:TemplateInterface<T>){
    this.#template = new Template<T>(template);
  }

  CreateElement(parent?:any):HTMLElement|any{

    const children:HTMLElement|any = document.createElement(this.type);
    const observableAttributes:string[] = [];
    
    if(this.prop)for(const attributeKey of Object.keys(this.prop)){

      const attribute = String(this.prop[attributeKey]) as string;
      const isObservable = attributeKey.includes(':') ? true : false;
      const decodeAttributeObservable = function(attribute){return attribute.split(':').filter((x,i) => x).join('')}
      if(isObservable)observableAttributes.push(decodeAttributeObservable(attributeKey));

      if(attributeKey == "text"){children.innerHTML = attribute}
      else if (attributeKey == "parentStyleSheet"){
        var stylesheet = document.createElement('style');
        stylesheet.type = 'text/css';
        stylesheet.innerHTML = attribute;
        if(parent)parent.appendChild(stylesheet);
        else children.appendChild(stylesheet);
      }
      else if (attributeKey == "selfStyleSheet"){
        var stylesheet = document.createElement('style');
        stylesheet.type = 'text/css';
        stylesheet.innerHTML = attribute;
        children.appendChild(stylesheet);
      }
      else{children.setAttribute((isObservable ? decodeAttributeObservable(attributeKey) : attributeKey),attribute)}

    };

    const component = (new Prototype.Component).define_th(children,this.proto,(observableAttributes.length > 0 ? observableAttributes : null));
    // if(parent)parent.appendChild(component);

    return component;
  }

  // IsHTMLUnknownElement():boolean{
  //   let element:any = document.createElement(this.type);
  //   return element.__proto__.constructor.name == 'HTMLUnknownElement';
  // }
  //
  // HTMLThoriumElement():Models.HTML.ThoriumElement{
  //   return new Models.HTML.ThoriumElement();
  // }

}

export class NodeUI implements NodeInterface{

  #node:ElementInterface<any>[] = [];
  #Elements:GhostController[] = [];
  get elements(){return this.#Elements};
  #parent:HTMLElement|null = null;
  #root:any|null = null;
  get Node():ElementInterface<any>[]{return this.#node;}
  get Parent():HTMLElement|null{return this.#parent;}
  get Root():any|null{return this.#root;}

  constructor(template?:TemplateInterface<any>[]|object[] , root?:any, parent?:any){
    if(template)this.Main(template,root,parent);
  }

  Main(template:TemplateInterface<any>|object[] , root?:any , parent?:HTMLElement){
    if(root) this.#root = root;
    if(parent) this.#parent = parent;
    this.#node = this.normalize(template);
  }

  // BuildIn(parent:any):Promise<Partial<GhostController>>{
  BuildIn(parent:any):Promise<NodeUI>{
    const _this = this;

    function generate(i:number = 0):Promise<Partial<GhostController>>{
      return new Promise(async function(next){

        // rien à générer
        try{
          if(_this.Node.length == 0)throw {code:1 , message : "Pas d'enfants"};

          const children = _this.Node[i].CreateElement(parent);
          parent.appendChild(children);

          /* Enfants à générer */
          if(_this.Node[i].childrens != null){
            _this.Node[i].childrens?.BuildIn(children)
            .then(async function(){

              if(i == _this.Node.length - 1)next(children);
              else next(await generate(i + 1))

            })

          }
          else {
            if(i == _this.Node.length - 1)next(children);
            else next(await generate(i + 1))
          }
        }
        catch(err:any){
          if(err.code == 1)next(parent)
        }

      })
    }

    // const x = Array.from(this.Node , async (node,iterator) => {
    //   const element:Element = node.CreateElement(parent);
    //   parent.appendChild(element);
    //   if(node.childrens)await node.childrens.BuildIn(element);
    //   return element;
    // })

    return new Promise((buildResolve) => {
      Promise.all(Array.from(this.Node , async (node,iterator) => {
        return new Promise(async (next) => {
          const element:Element = node.CreateElement(parent);
          this.#Elements.push(element);
          parent.appendChild(element);
          if(node.childrens)await node.childrens.BuildIn(element);
          next(element as GhostController);
        })
      })).then(() => {
        buildResolve(this);
      })
    })

    // return Promise.all(Array.from(this.Node , async (node,iterator) => {
    //   return new Promise(async (next) => {
    //     const element:Element = node.CreateElement(parent);
    //     this.#Elements.push(element);
    //     parent.appendChild(element);
    //     if(node.childrens)await node.childrens.BuildIn(element);
    //     next(element as GhostController);
    //   })
    // }))

    // return generate();
  }

  Initialise(){
    for(const e of this.#Elements){e.Initialise()}
  }

  normalize = function(template:TemplateInterface<any>|object[]):Array<ElementInterface<any>>|[]{
    if(template && typeof template == 'object' && !Array.isArray(template))template = [template];
    if(template && Array.isArray(template)) return Array.from(template , function(x:any,i:number){
      if(x.__proto__.constructor.name == "Object") return new ElementUI(x);
      else return x;
    });
    else return [];
  }

}

export class GUI implements GlobalUserInterface{

  #ui:NodeInterface = new NodeUI();
  get ui():NodeInterface{return this.#ui;}

  constructor(template?:TemplateInterface<any>){
    if(template)this.Main(template);
  }

  Main(template:TemplateInterface<any>){
    this.#ui = new NodeUI([template]);
  }
}
