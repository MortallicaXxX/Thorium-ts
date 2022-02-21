import { Models } from "./Models";
import { Prototype } from "./Prototype";

export namespace UI{

  /**
  * @Title ThoriumJS.ElementUI
  * @Desc Représente un élément qt
  * @Constructor arg1{template:{type:string,prop:object|null,childrens:NodeUI|null,proto:object|null}} arg2{root:Engine|null} arg3{parent:any|null}
  */
  export class ElementUI{

    #template:Models.Template = new Models.Template;
    get type(){return this.#template.type;}
    get prop(){return this.#template.prop;}
    get childrens(){return this.#template.childrens;}
    get proto(){return this.#template.proto;}

    constructor(template?:Models.Template){
      if(template)this.Main(template);
    }

    Main(template:Models.Template){
      this.#template = new Models.Template(template);
    }

    CreateElement(parent?:any):HTMLElement|any{
      const _this:ElementUI = this;

      const children:HTMLElement|any = document.createElement(this.type);
      if(_this.prop)for(const attribute of Object.keys(_this.prop)){

        type typeKey = keyof typeof _this.prop;
        const attr:typeKey = attribute as keyof typeof _this.prop;

        if(attribute == "text"){
          children.innerHTML = _this.prop[attr];
        }
        else if (attribute == "parentStyleSheet"){
          var stylesheet = document.createElement('style');
          stylesheet.type = 'text/css';
          stylesheet.innerHTML = _this.prop[attr];
          if(parent)parent.appendChild(stylesheet);
          else children.appendChild(stylesheet);
        }
        else if (attribute == "selfStyleSheet"){
          var stylesheet = document.createElement('style');
          stylesheet.type = 'text/css';
          stylesheet.innerHTML = _this.prop[attr];
          children.appendChild(stylesheet);
        }
        else{
          children.setAttribute(attribute,_this.prop[attr]);
        }
      };

      const component = (new Prototype.Component).define_th(children,this.proto);
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

  /**
  * @Title ThoriumQt.NodeUI
  * @Desc Noeud d'élément qt
  * @Constructor arg1{template:object|[object]} arg2{root:Engine|null} arg3{parent:any|null}
  */
  export class NodeUI{

    #node:ElementUI[] = [];
    #parent:HTMLElement|null = null;
    #root:any|null = null;
    get Node():ElementUI[]{return this.#node;}
    get Parent():HTMLElement|null{return this.#parent;}
    get Root():any|null{return this.#root;}

    constructor(template?:Models.Template[]|object[] , root?:any, parent?:any){
      if(template)this.Main(template,root,parent);
    }

    Main(template:Models.Template|object[] , root?:any , parent?:HTMLElement){
      if(root) this.#root = root;
      if(parent) this.#parent = parent;
      this.#node = this.normalize(template);
    }

    BuildIn(parent:any):Promise<void>{
      const _this = this;

      function generate(i:number = 0):Promise<void>{
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

      return generate();
    }

    normalize = function(template:Models.Template|object[]):Array<ElementUI>|[]{
      if(template && typeof template == 'object' && !Array.isArray(template))template = [template];
      if(template && Array.isArray(template)) return Array.from(template , function(x:any,i:number){
        if(x.__proto__.constructor.name == "Object") return new ElementUI(x);
        else return x;
      });
      else return [];
    }

  }

  export class GUI{

    #ui:NodeUI = new NodeUI();
    get ui():NodeUI{return this.#ui;}

    constructor(template?:Models.Template){
      if(template)this.Main(template);
    }

    Main(template:Models.Template){
      this.#ui = new NodeUI([template]);
    }
  }

}
