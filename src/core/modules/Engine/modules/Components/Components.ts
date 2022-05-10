import {UI} from "../UI/UI";
import { Style } from "../Style/Style";

export namespace Components{

  export class App extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'app',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Main extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'main',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  // BASE HTML

  export class Nav extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'nav',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Article extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'article',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Section extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'section',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Aside extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'aside',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Text extends UI.ElementUI{
    constructor(arg:any,position:string = "left"){

      if(typeof arg == 'object' && 'position' in arg)(function(){
        position = arg.position;
        delete arg.position;
      })()

      // normalisation de la position
      position = (position.split(' ').length == 1 ?
      (function(p1){
        if(p1 == 'top') return 'margin : 0 auto auto auto';
        if(p1 == 'right') return 'margin : auto 0 auto auto';
        if(p1 == 'bottom') return 'margin : auto auto 0 auto';
        if(p1 == 'left') return 'margin : auto auto auto 0';
        if(p1 == 'center') return 'margin : auto auto auto auto';

      })(position)
      :
      (position.split(' ')[0] == 'top' ?
        (function(p2){
          if(p2 == 'left')return 'margin : 0 auto auto 0';
          if(p2 == 'center')return 'margin : 0 auto auto auto';
          if(p2 == 'right')return 'margin : 0 0 auto auto';
        })(position.split(' ')[1])
        :
        (position.split(' ')[0] == 'right' ?
          (function(p2){
            if(p2 == 'top')return 'margin : 0 0 auto 0';
            if(p2 == 'center')return 'margin : auto 0 auto auto';
            if(p2 == 'bottom')return 'margin : auto 0 0 auto';
          })(position.split(' ')[1])
          :
          (position.split(' ')[0] == 'bottom' ?
            (function(p2){
              if(p2 == 'left')return 'margin : auto auto 0 0';
              if(p2 == 'center')return 'margin : auto auto 0 auto';
              if(p2 == 'right')return 'margin : auto 0 0 auto';
            })(position.split(' ')[1])
            :
            (position.split(' ')[0] == 'left' ?
              (function(p2){
                if(p2 == 'top')return 'margin : 0 0 auto 0';
                if(p2 == 'center')return 'margin : auto 0 auto auto';
                if(p2 == 'bottom')return 'margin : auto 0 0 auto';
              })(position.split(' ')[1])
              :
              (position.split(' ')[0] == 'center' ?
                (function(p2){
                  if(p2 == 'top')return 'margin : 0 auto auto auto';
                  if(p2 == 'right')return 'margin : auto 0 auto auto';
                  if(p2 == 'bottom')return 'margin : auto auto 0 auto';
                  if(p2 == 'left')return 'margin : auto auto auto 0';
                })(position.split(' ')[1])
                :
                null
              )
            )
          )
        )
      )
     );

      super(new UI.Template({
        type:'p',
        prop : (typeof arg == 'object' ? (function(x){
          var obj:any = {style : position};
          if('text' in x )(function(text){
            obj.text = text;
            delete x.text;
          })(x.text);
          if('id' in x )(function(id){
            obj.id = id;
            delete x.id;
          })(x.id);
          if('class' in x )(function(clas){
            obj.class = clas;
            delete x.class;
          })(x.class);
          // completion des attribus manquants
          for(const key of Object.keys(arg)){
            if(key != "proto")obj[key] = arg[key];
          }
          return obj;
        })(arg):
          {
            text : arg,
            style : position
          }
        ),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class H1 extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'h1',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Dialog extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'dialog',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Div extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'div',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Container extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'container',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Form extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'form',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Button extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      const template:any = arg;
      if('prop' in arg && 'text' in arg.prop){
        template.text = template.prop.text;
        delete template.prop.text;
      }
      template.childrens = ('text' in arg ? [new Text(template.text,'center')] : arg.childrens)
      super(new UI.Template({
        type:'button',
        prop : arg.prop,
        childrens : template.childrens,
        proto : arg.proto
      }))
    }
  }

  export class Input extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'input',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Textarea extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type:'textarea',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Select extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type : 'select',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Option extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type : 'option',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class OptionGroup extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type : 'optgroup',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Canvas extends UI.ElementUI{
    constructor(arg:UI.TemplateInterface){
      super(new UI.Template({
        type : 'canvas',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  // TODO: Component H1
  // TODO: Component H2
  // TODO: Component H3
  // TODO: Component H4
  // TODO: Component H5
  // TODO: Component H6
  // TODO: Component List
  // TODO: Component DropDown

  // MOBILES

}
