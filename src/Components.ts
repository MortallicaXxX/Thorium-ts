import { UI } from "./UI";
import { Models } from "./Models";
import { Style } from "./Style";

export namespace Components{

  export class App extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'app',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Main extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'main',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  // BASE HTML

  export class Nav extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'nav',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Article extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'article',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Section extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'section',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Aside extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
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

      super(new Models.Template({
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
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'h1',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Dialog extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'dialog',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Div extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'div',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Container extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'container',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Form extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'form',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Button extends UI.ElementUI{
    constructor(arg:Models.Template){
      const template:any = arg;
      if('prop' in arg && 'text' in arg.prop){
        template.text = template.prop.text;
        delete template.prop.text;
      }
      template.childrens = ('text' in arg ? [new Text(template.text,'center')] : arg.childrens)
      super(new Models.Template({
        type:'button',
        prop : arg.prop,
        childrens : template.childrens,
        proto : arg.proto
      }))
    }
  }

  export class Input extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'input',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Textarea extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type:'textarea',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }))
    }
  }

  export class Select extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type : 'select',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class Option extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type : 'option',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  export class OptionGroup extends UI.ElementUI{
    constructor(arg:Models.Template){
      super(new Models.Template({
        type : 'optgroup',
        prop : (arg.prop ? arg.prop : {}),
        childrens : (arg.childrens ? arg.childrens : []),
        proto : (arg.proto ? arg.proto : {})
      }));
    }
  }

  /*
  Manque :
    - H1
    - H2
    - H3
    - H4
    - H5
    - H6
    - List
    - DropDown
  */

  // MOBILES

  export namespace Themes{

    export namespace Default{

      export namespace Button{

        export namespace Models{

          export interface Base{
            size?:string,
            background?:string,
            color?:string,
            text:string,
            prop?:object,
            proto?:any,
          }

          export interface Icon extends Base{
            iconURL?:string;
            iconSVG?:string;
            iconSide?:string;
          }

        }
        //
        // export interface Template{
        //   size?:string,
        //   background?:string,
        //   color?:string,
        //   text:string,
        //   prop?:object,
        //   proto?:any,
        // }

        export class Default extends Components.Button{
          constructor(arg:Button.Models.Base){

            if("prop" in arg == false)arg.prop = {};

            super(new Models.Template({
              type: "button",
              prop : {
                ...("prop" in arg ? arg.prop : {}),
                ...{
                  class : `btn ${("size" in arg ? arg.size : "regular")} mr-md-3 mb-2 mb-md-0`,
                  text : arg.text,
                  style : (new Style).Css({
                    color : ("color" in arg ? `var(--${arg.color})` : `var(--white)`),
                    "background-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                    "border-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`)
                  })
                }
              },
              proto : ("proto" in arg ? arg.proto : {}),
            }));
          }
        }

        export class DefaultOutline extends Components.Button{
          constructor(arg:Button.Models.Base){

            if("prop" in arg == false)arg.prop = {};

            super(new Models.Template({
              type: "button",
              prop : {
                ...("prop" in arg ? arg.prop : {}),
                ...{
                  class : `btn outline ${("size" in arg ? arg.size : "regular")} mr-md-3 mb-2 mb-md-0`,
                  text : arg.text,
                  style : (new Style).Css({
                    color : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                    "border-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  })
                }
              },
              proto : {
                ...arg.proto,
                ...{
                  arg : arg,
                  background : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  color : ("color" in arg ? `var(--${arg.color})` : `var(--white)`),
                  onFocus : function(e:Event) {
                    this.element.style.background = this.background;
                    this.element.style.color = this.color;
                    if("proto" in this.arg && "onFocus" in this.arg.proto)this.arg.proto.onFocus(e);
                  },
                  onUnFocus : function(e:Event) {
                    this.element.style.background = this.color;
                    this.element.style.color = this.background;
                    if("proto" in this.arg && "onUnFocus" in this.arg.proto)this.arg.proto.onUnFocus(e);
                  },
                  onMouseEnter : function(e:Event) {
                    this.element.style.background = this.background;
                    this.element.style.color = this.color;
                    if("proto" in this.arg && "onMouseEnter" in this.arg.proto)this.arg.proto.onMouseEnter(e);
                  },
                  onMouseLeave : function(e:Event) {
                    this.element.style.background = this.color;
                    this.element.style.color = this.background;
                    if("proto" in this.arg && "onMouseLeave" in this.arg.proto)this.arg.proto.onMouseLeave(e);
                  }
                }
              },
            }));
          }
        }

        export class DefaultRound extends Components.Button{
          constructor(arg:Button.Models.Base){

            if("prop" in arg == false)arg.prop = {};

            super(new Models.Template({
              type: "button",
              prop : {
                ...("prop" in arg ? arg.prop : {}),
                ...{
                  class : `btn round ${("size" in arg ? arg.size : "regular")} mr-md-3 mb-2 mb-md-0`,
                  text : arg.text,
                  style : (new Style).Css({
                    color : ("color" in arg ? `var(--${arg.color})` : `var(--white)`),
                    "background-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                    "border-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`)
                  })
                }
              },
              proto : ("proto" in arg ? arg.proto : {}),
            }));
          }
        }

        export class DefaultOutlineRound extends Components.Button{
          constructor(arg:Button.Models.Base){

            if("prop" in arg == false)arg.prop = {};

            super(new Models.Template({
              type: "button",
              prop : {
                ...("prop" in arg ? arg.prop : {}),
                ...{
                  class : `btn outline round ${("size" in arg ? arg.size : "regular")} mr-md-3 mb-2 mb-md-0`,
                  text : arg.text,
                  style : (new Style).Css({
                    color : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                    "border-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  })
                }
              },
              proto : {
                ...arg.proto,
                ...{
                  arg : arg,
                  background : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  color : ("color" in arg ? `var(--${arg.color})` : `var(--white)`),
                  onFocus : function(e:Event) {
                    this.element.style.background = this.background;
                    this.element.style.color = this.color;
                    if("proto" in this.arg && "onFocus" in this.arg.proto)this.arg.proto.onFocus(e);
                  },
                  onUnFocus : function(e:Event) {
                    this.element.style.background = this.color;
                    this.element.style.color = this.background;
                    if("proto" in this.arg && "onUnFocus" in this.arg.proto)this.arg.proto.onUnFocus(e);
                  },
                  onMouseEnter : function(e:Event) {
                    this.element.style.background = this.background;
                    this.element.style.color = this.color;
                    if("proto" in this.arg && "onMouseEnter" in this.arg.proto)this.arg.proto.onMouseEnter(e);
                  },
                  onMouseLeave : function(e:Event) {
                    this.element.style.background = this.color;
                    this.element.style.color = this.background;
                    if("proto" in this.arg && "onMouseLeave" in this.arg.proto)this.arg.proto.onMouseLeave(e);
                  }
                }
              },
            }));
          }
        }

        export class Icon extends Components.Button{
          constructor(arg:Button.Models.Icon){
            super(new Models.Template({
              type : "button",
              prop : {
                ...("prop" in arg ? arg.prop : {}),
                ...{
                  class : `btn icon ${(arg.text == "" ? "single" : "dual")} ${("size" in arg ? arg.size : "regular")} mr-md-3 mb-2 mb-md-0`,
                  text : (function(arg){
                    if('iconSide' in arg == false)arg.iconSide = 'left';
                    if(arg.iconSide == 'right' && 'iconURL' in arg) return `${arg.text} <i style=background-image:url(${arg.iconURL})></i>`;
                    else if(arg.iconSide == 'left' && 'iconURL' in arg) return `<i style=background-image:url(${arg.iconURL})></i> ${arg.text}`;
                    else if(arg.iconSide == 'right' && 'iconSVG' in arg) return `${arg.text} ${arg.iconSVG}`;
                    else if(arg.iconSide == 'left' && 'iconSVG' in arg) return `${arg.iconSVG} ${arg.text}`;
                    else return arg.text;
                  })(arg),
                  style : (new Style).Css({
                    color : ("color" in arg ? `var(--${arg.color})` : `var(--primary)`),
                    "border-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                    "background-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  })
                }
              },
              proto : ("proto" in arg ? arg.proto : {})
            }));
          }
        }

        export class IconOutline extends Components.Button{
          constructor(arg:Button.Models.Icon){
            super(new Models.Template({
              type : "button",
              prop : {
                ...("prop" in arg ? arg.prop : {}),
                ...{
                  class : `btn icon outline ${(arg.text == "" ? "single" : "dual")} ${("size" in arg ? arg.size : "regular")} mr-md-3 mb-2 mb-md-0`,
                  text : (function(arg){
                    if('iconSide' in arg == false)arg.iconSide = 'left';
                    if(arg.iconSide == 'right' && 'iconURL' in arg) return `${arg.text} <i style=background-image:url(${arg.iconURL})></i>`;
                    else if(arg.iconSide == 'left' && 'iconURL' in arg) return `<i style=background-image:url(${arg.iconURL})></i> ${arg.text}`;
                    else if(arg.iconSide == 'right' && 'iconSVG' in arg) return `${arg.text} ${arg.iconSVG}`;
                    else if(arg.iconSide == 'left' && 'iconSVG' in arg) return `${arg.iconSVG} ${arg.text}`;
                    else return arg.text;
                  })(arg),
                  style : (new Style).Css({
                    color : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                    "border-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  })
                }
              },
              proto : {
                ...arg.proto,
                ...{
                  arg : arg,
                  background : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  color : ("color" in arg ? `var(--${arg.color})` : `var(--white)`),
                  onFocus : function(e:Event) {
                    this.element.style.background = this.background;
                    this.element.style.color = this.color;
                    if("proto" in this.arg && "onFocus" in this.arg.proto)this.arg.proto.onFocus(e);
                  },
                  onUnFocus : function(e:Event) {
                    this.element.style.background = this.color;
                    this.element.style.color = this.background;
                    if("proto" in this.arg && "onUnFocus" in this.arg.proto)this.arg.proto.onUnFocus(e);
                  },
                  onMouseEnter : function(e:Event) {
                    this.element.style.background = this.background;
                    this.element.style.color = this.color;
                    if("proto" in this.arg && "onMouseEnter" in this.arg.proto)this.arg.proto.onMouseEnter(e);
                  },
                  onMouseLeave : function(e:Event) {
                    this.element.style.background = this.color;
                    this.element.style.color = this.background;
                    if("proto" in this.arg && "onMouseLeave" in this.arg.proto)this.arg.proto.onMouseLeave(e);
                  }
                }
              },
            }));
          }
        }

        export class IconRound extends Components.Button{
          constructor(arg:Button.Models.Icon){
            super(new Models.Template({
              type : "button",
              prop : {
                ...("prop" in arg ? arg.prop : {}),
                ...{
                  class : `btn icon round ${(arg.text == "" ? "single" : "dual")} ${("size" in arg ? arg.size : "regular")} mr-md-3 mb-2 mb-md-0`,
                  text : (function(arg){
                    if('iconSide' in arg == false)arg.iconSide = 'left';
                    if(arg.iconSide == 'right' && 'iconURL' in arg) return `${arg.text} <i style=background-image:url(${arg.iconURL})></i>`;
                    else if(arg.iconSide == 'left' && 'iconURL' in arg) return `<i style=background-image:url(${arg.iconURL})></i> ${arg.text}`;
                    else if(arg.iconSide == 'right' && 'iconSVG' in arg) return `${arg.text} ${arg.iconSVG}`;
                    else if(arg.iconSide == 'left' && 'iconSVG' in arg) return `${arg.iconSVG} ${arg.text}`;
                    else return arg.text;
                  })(arg),
                  style : (new Style).Css({
                    color : ("color" in arg ? `var(--${arg.color})` : `var(--primary)`),
                    "border-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                    "background-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  })
                }
              },
              proto : ("proto" in arg ? arg.proto : {})
            }));
          }
        }

        export class IconOutlineRound extends Components.Button{
          constructor(arg:Button.Models.Icon){
            super(new Models.Template({
              type : "button",
              prop : {
                ...("prop" in arg ? arg.prop : {}),
                ...{
                  class : `btn icon outline round ${(arg.text == "" ? "single" : "dual")} ${("size" in arg ? arg.size : "regular")} mr-md-3 mb-2 mb-md-0`,
                  text : (function(arg){
                    if('iconSide' in arg == false)arg.iconSide = 'left';
                    if(arg.iconSide == 'right' && 'iconURL' in arg) return `${arg.text} <i style=background-image:url(${arg.iconURL})></i>`;
                    else if(arg.iconSide == 'left' && 'iconURL' in arg) return `<i style=background-image:url(${arg.iconURL})></i> ${arg.text}`;
                    else if(arg.iconSide == 'right' && 'iconSVG' in arg) return `${arg.text} ${arg.iconSVG}`;
                    else if(arg.iconSide == 'left' && 'iconSVG' in arg) return `${arg.iconSVG} ${arg.text}`;
                    else return arg.text;
                  })(arg),
                  style : (new Style).Css({
                    color : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                    "border-color" : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  })
                }
              },
              proto : {
                ...arg.proto,
                ...{
                  arg : arg,
                  background : ("background" in arg ? `var(--${arg.background})` : `var(--primary)`),
                  color : ("color" in arg ? `var(--${arg.color})` : `var(--white)`),
                  onFocus : function(e:Event) {
                    this.element.style.background = this.background;
                    this.element.style.color = this.color;
                    if("proto" in this.arg && "onFocus" in this.arg.proto)this.arg.proto.onFocus(e);
                  },
                  onUnFocus : function(e:Event) {
                    this.element.style.background = this.color;
                    this.element.style.color = this.background;
                    if("proto" in this.arg && "onUnFocus" in this.arg.proto)this.arg.proto.onUnFocus(e);
                  },
                  onMouseEnter : function(e:Event) {
                    this.element.style.background = this.background;
                    this.element.style.color = this.color;
                    if("proto" in this.arg && "onMouseEnter" in this.arg.proto)this.arg.proto.onMouseEnter(e);
                  },
                  onMouseLeave : function(e:Event) {
                    this.element.style.background = this.color;
                    this.element.style.color = this.background;
                    if("proto" in this.arg && "onMouseLeave" in this.arg.proto)this.arg.proto.onMouseLeave(e);
                  }
                }
              },
            }));
          }
        }

      }

    }

  }

}
