import { UI } from "../UI/UI";
import { Models } from "../../Models";
import { Style } from "../Style/Style";
import { Prototype } from "../Prototype/Prototype";

export namespace Mobile{

  /**
    *Description :
  */
  export class App extends UI.ElementUI{

    constructor(arg:Models.Mobile.App){

      super(new Models.Template({
        type : "app",
        prop : {
          // style : (new Style).Css({
          //   position : "fixed",
          //   height : "var(--thorium-default-height)",
          //   width : "var(--thorium-default-width)",
          //   left : 0,
          //   top : 0,
          //   display : "grid",
          //   "grid-template-columns" : "minmax(0,1fr)",
          //   "grid-template-rows" : "max-content minmax(0,1fr) max-content",
          //   overflow: "hidden",
          //   "z-index" : 5
          // }),
          // selfStyleSheet : (new Style).CssSheet({
          //   "app > leftwidget.WidgetContainer" : (new Style).Css({
          //     "transform": "translateX(-100%)",
          //     "z-index" : 10,
          //   }),
          //   "app > topwidget.WidgetContainer" : (new Style).Css({
          //     "transform": "translateY(-100%)",
          //     "z-index" : 15,
          //   }),
          //   "app > rightwidget.WidgetContainer" : (new Style).Css({
          //     "transform": "translateX(100%)",
          //     "z-index" : 20,
          //   }),
          //   "app > bottomwidget.WidgetContainer" : (new Style).Css({
          //     "transform": "translateY(100%)",
          //     "z-index" : 25,
          //   }),
          //   ".WidgetContainer" : (new Style).Css({
          //     "grid-column": 1,
          //     "grid-row": "1/4",
          //     transition: "1s",
          //     display : "grid"
          //   }),
          //   "widget" : (new Style).Css({
          //     "grid-column": 1,
          //     "grid-row": 1,
          //     transition: "1s",
          //     display : "grid",
          //     "padding-top" : "7vw"
          //   }),
          //   "widget.leftwidget.active" : (new Style).Css({
          //     transform: "translateX(100%)",
          //   }),
          //   "widget.topwidget.active" : (new Style).Css({
          //     transform: "translateY(100%)",
          //   }),
          //   "widget.rightwidget.active" : (new Style).Css({
          //     transform: "translateX(-100%)",
          //   }),
          //   "widget.bottomwidget.active" : (new Style).Css({
          //     transform: "translateY(-100%)",
          //   }),
          // })
        },
        childrens : (function(){

          const widgetsProto = {
            closeAll : function(){
              Array.from(this.children,function(element:any,i:number){
                if(element.isActive == true){
                  element.action();
                }
              })
            }
          }

          const template = [
            {
              type : "LeftWidget",
              prop : {class : "WidgetContainer"},
              childrens : (("widgets" in arg && "left" in arg.widgets) ? Array.from(arg.widgets.left,function(widget:any,i:number){
                return new widget();
              }) : []),
              proto : widgetsProto
            },
            {
              type : "TopWidget",
              prop : {class : "WidgetContainer"},
              childrens : (("widgets" in arg && "top" in arg.widgets) ? Array.from(arg.widgets.top,function(widget:any,i:number){
                return new widget();
              }) : []),
              proto : widgetsProto
            },
            {
              type : "RightWidget",
              prop : {class : "WidgetContainer"},
              childrens : (("widgets" in arg && "right" in arg.widgets) ? Array.from(arg.widgets.right,function(widget:any,i:number){
                return new widget();
              }) : []),
              proto : widgetsProto
            },
            {
              type : "BottomWidget",
              prop : {class : "WidgetContainer"},
              childrens : (("widgets" in arg && "bottom" in arg.widgets) ? Array.from(arg.widgets.bottom,function(widget:any,i:number){
                return new widget();
              }) : []),
              proto : widgetsProto
            },
            new arg.body()
          ];

          if("menu" in arg){
            let menu:any = arg.menu;
            template.push(new menu());
          }
          if("header" in arg){
            let header:any = arg.header;
            template.push(new header());
          }
          return template;
        })(),
        proto : Object.assign({
          home : function(){
            let body:any = document.querySelectorAll(`main#appBody`)[0];
            let leftWidget:any = document.querySelectorAll(`LeftWidget.WidgetContainer`)[0];
            let topWidget:any = document.querySelectorAll(`TopWidget.WidgetContainer`)[0];
            let rightWidget:any = document.querySelectorAll(`RightWidget.WidgetContainer`)[0];
            let bottomWidget:any = document.querySelectorAll(`BottomWidget.WidgetContainer`)[0];

            body.radioLike();
            leftWidget.closeAll();
            topWidget.closeAll();
            rightWidget.closeAll();
            bottomWidget.closeAll();
          }
        },('proto' in arg ? arg.proto : {}))
      }));
    }

  }

  /**
    *Description :
  */
  export class Body extends UI.ElementUI{
    constructor(arg:Models.Mobile.Body){
      super(new Models.Template({
        type : "main",
        prop : {
          id : "appBody",
          // style : (new Style).Css({
          //   "grid-column" : 1,
          //   "grid-row" : "1/3",
          //   "padding-top": "7vw",
          // })
        },
        childrens : ("childrens" in arg ? arg.childrens : []),
        proto : {
          buttons : ("buttons" in arg ? new Prototype.Variable(arg.buttons,{writable:true}) : new Prototype.Variable([],{writable:true})),
          header : ("header" in arg ? new Prototype.Variable(arg.header,{writable:true}) : new Prototype.Variable([],{writable:true})),
          mobileMenu : new Prototype.Variable(null,{writable:true}),
          mobileHeader : new Prototype.Variable(null,{writable:true}),
          AfterInitialise : async function(){
            this.mobileMenu.Value = document.querySelectorAll("mobilemenu#mobilemenu")[0];
            this.mobileHeader.Value = document.querySelectorAll("mobileheader#mobileheader")[0];
            this.turnActive();
          },
          onActive : function(){
            this.__add_btn();
            this.__add_header();
          },
          __add_btn : function(){
            const _this = this;
            _this.mobileMenu.Value.animateDump(this.buttons.Value);
          },
          __add_header : function(){
            const _this = this;
            _this.mobileHeader.Value.addHeader(this.header.Value);
          },
        }
      }))
    }
  }

  /**
    *Description :
  */
  export class Widget extends UI.ElementUI{
    constructor(arg:Models.Mobile.Widget){
      super(new Models.Template({
        type : "widget",
        prop : {
          class : `${arg.position}widget`
        },
        childrens : ('childrens' in arg ? arg.childrens : []),
        proto : {
          buttons : ("buttons" in arg ? new Prototype.Variable(arg.buttons,{writable:true}) : new Prototype.Variable([],{writable:true})),
          header : ("header" in arg ? new Prototype.Variable(arg.header,{writable:true}) : new Prototype.Variable([],{writable:true})),
          mobileMenu : new Prototype.Variable(null,{writable:true}),
          mobileHeader : new Prototype.Variable(null,{writable:true}),
          AfterInitialise : async function(){
            this.mobileMenu.Value = document.querySelectorAll("mobilemenu#mobilemenu")[0];
            this.mobileHeader.Value = document.querySelectorAll("mobileheader#mobileheader")[0];
          },
          action : function(){
            this.turnActive();
          },
          onActive : function(){
            this.__add_btn();
            this.__add_header();
            this.parentNode.radioLike();
          },
          onUnActive : function(){
            let main:any = document.querySelectorAll("main#appBody")[0];
            main.radioLike();
          },
          __add_btn : function(){
            const _this = this;
            _this.mobileMenu.Value.animateDump(this.buttons.Value);
          },
          __add_header : function(){
            const _this = this;
            _this.mobileHeader.Value.addHeader(this.header.Value);
          },
        }
      }));
      let prop:any = this.prop;
      let _this:any = this;
      prop.id = `${arg.position}widget-${_this.__proto__.constructor.name}`;
      prop.name = _this.__proto__.constructor.name;
    }
  }

  /**
    *Description :
  */
  export class TopWidget extends Widget{
    constructor(arg:Models.Mobile.Widget){
      arg.position = 'top';
      super(arg);
    }
  }

  /**
    *Description :
  */
  export class RightWidget extends Widget{
    constructor(arg:Models.Mobile.Widget){
      arg.position = 'right';
      super(arg);
    }
  }

  /**
    *Description :
  */
  export class BottomWidget extends Widget{
    constructor(arg:Models.Mobile.Widget){
      arg.position = 'bottom';
      super(arg);
    }
  }

  /**
    *Description :
  */
  export class LeftWidget extends Widget{
    constructor(arg:Models.Mobile.Widget){
      arg.position = 'left';
      super(arg);
    }
  }

  /**
    *Description :
  */
  export class Menu extends UI.ElementUI{
    constructor(arg:Models.Mobile.Menu){
      super(new Models.Template({
        type : "mobilemenu",
        prop : {
          id : "mobilemenu",
          // style : (new Style).Css({
          //   "grid-column" : 1,
          //   "grid-row" : 3,
          //   "height" : "10vw",
          //   display : "inline-flex",
          //   "border-top": "1px solid black",
          //   overflow : "hidden",
          //   "z-index" : 30,
          // }),
          // selfStyleSheet : (new Style).CssSheet({
          //   "mobilemenu > menuicon::after" : (new Style).Css({
          //     height : "10%",
          //     width : "10%",
          //     content : `" "`,
          //     "grid-column": 1,
          //     "grid-row": 1,
          //     margin: "auto",
          //     "background-color": "rgba(0,0,0,0.5)",
          //     "z-index": 0,
          //     "border-radius":"100%",
          //     transition : "0.8s",
          //     opacity : 0
          //   }),
          //   "mobilemenu > menuicon.active::after" : (new Style).Css({
          //     transform: "scale(12)",
          //     opacity : 0.8
          //   }),
          //   "mobilemenu > menuicon > svg" : (new Style).Css({
          //     height : "50%",
          //     width : "50%",
          //     margin : "auto",
          //     "grid-column": 1,
          //     "grid-row": 1,
          //     "z-index": 1,
          //     transition : "0.5s"
          //   }),
          //   "mobilemenu.active > menuicon > svg" : (new Style).Css({
          //     opacity : 0,
          //     transition : "0.5s"
          //   }),
          //   "mobilemenu > menuicon > svg > path" : (new Style).Css({
          //     fill: "black",
          //   })
          // })
        },
        childrens : [],
        proto : {
          buttons : new Prototype.Variable((function(){
            return (!arg.button || !Array.isArray(arg.button) ? {} : (function(buttonList:any){
              const y = {};
              for(const i of Array.from(buttonList , (button:any,i:number) => i)){
                y[buttonList[i].prototype.constructor.name] = {html : null , constructor : buttonList[i]};
              }
              return y;
            })(arg.button))
          })(),{writable:true}),
          AfterInitialise : function(){

          },
          animate : function(){
            this.turnActive();
          },
          onActive : function(){
            setTimeout(function(_this:any){
              _this.turnActive();
            },500,this);
          },
          add : async function(Icon:any){
            const _this:any = this;
            new UI.NodeUI(new Icon())
            .BuildIn(_this)
            .then(async function(result:any){
              _this.buttons.Value[Icon.prototype.constructor.name] = {html : result , constructor : Icon};
              result.Initialise();
            })
          },
          remove : function(Icon:any){
            if(`${Icon.prototype.constructor.name}` in this.buttons.Value){
              this.buttons.Value[Icon.prototype.constructor.name].html.remove();
              delete this.buttons.Value[Icon.prototype.constructor.name];
            }
          },
          clear : function(){
            const length = this.children.length - 1;
            for(const i of Array.from({length : length},(x:null,i:number)=>i)){
              if(this.children[length - i].tagName != "STYLE")this.children[length - i].remove();
            }
          },
          dump : function(){
            for(const key of Array.from(Object.keys(this.buttons.Value),(key:string,i:number)=>key)){
              this.remove(this.buttons.Value[key].constructor);
            }
            this.clear();
          },
          animateDump : function(buttonList:[any]){
            if(this.isActive == false)this.animate();
            setTimeout(function(_this){
              for(const key of Array.from(Object.keys(_this.buttons.Value),(key:string,i:number)=>key)){
                _this.remove(_this.buttons.Value[key].constructor);
              }
              _this.clear();
              Array.from(buttonList,async function(button:any,i:number){
                _this.add(button);
              })
            },1000,this)
          },
          update : function(){
            const _this = this;
            this.clear();
            Array.from(Object.keys(this.buttons.Value),function(x:string,i:number){
              _this.add(_this.buttons.Value[x].constructor);
            })
          }
        }
      }));
    }
  }

  /**
    *Description :
  */
  export class MenuIcon extends UI.ElementUI{
    constructor(arg:Models.Mobile.MenuIcon){
      super(new Models.Template({
        type : "menuicon",
        prop : {
          // style : (new Style).Css({
          //   display : "grid",
          //   height : "10vw",
          //   width : "10vw",
          //   margin : "auto"
          // }),
          text : arg.svg
        },
        proto : Object.assign({
          pressTime : 0,
          AfterInitialise : function(){
            let proto:any = arg.proto;
            proto.AfterInitialise(this);
          },
          onMouseDown : function(){
            // const _this:any = this;
            let proto:any = arg.proto;
            if(this.isActive == false){
              this.pressTime = Date.now();
              this.turnActive();
              setTimeout(function(_this){
                proto.onMouseDown(_this);
              },1000,this);
            }
          },
          onFrameUpdate : function(){
            if(this.isActive == true && Date.now() - this.pressTime > 1000)this.turnActive();
          },
        },('prop' in arg ? arg.prop : {})),
      }));
    }
  }

  /**
    *Description :
  */
  export class Header extends UI.ElementUI{
    constructor(arg:Models.Template){

      super(new Models.Template({
        type : "mobileheader",
        prop : {
          id : "mobileheader",
          // style : (new Style).Css({})
          // selfStyleSheet : (new Style).CssSheet({
          //   "mobileheader#mobileheader" : (new Style).Css({
          //     transition: "1s",
          //     "border-bottom": "1px solid black",
          //     "grid-column": 1,
          //     "grid-row": 1,
          //     height: 0,
          //     display: "inline-flex",
          //     "grid-template-rows": "minmax(0,1fr)",
          //     "z-index": 30,
          //     background: "whitesmoke",
          //     opacity: 0,
          //   }),
          //   "mobileheader#mobileheader.active" : (new Style).Css({
          //     opacity: 1,
          //     height : "7vw"
          //   })
          // })
        },
        childrens : ("childrens" in arg ? arg.childrens : []),
        proto : {
          clear : function(){
            const _this:HTMLElement = this;
            const l:number = this.children.length;
            return Array.from({length : l},function(x:unknown,iterator:number){
              try{
                return _this.children[(l - 1) - iterator].remove();
              }catch(e){
                return e;
              }
            }).filter((x,i)=>x);
          },
          addHeader : function(elements:any){
            const _this:any = this;
            this.clear();
            for(const i of Array.from(elements,(x,i)=>i)){
              new UI.NodeUI(new elements[i]())
              .BuildIn(this)
              .then(function(result:any){
                result.Initialise();
                if(i == elements.length - 1)_this.hide();
              })
            }
          },
          hide : function(){
            if(this.isEmpty())this.turnActive();
            else this.turnActive();
          },
          isEmpty : function(){
            return (this.children.length == 0 ? true : false);
          }
        }
      }));
    }
  }

  export class HeaderElement extends UI.ElementUI{

    constructor(arg:Models.Template){
      super(new Models.Template({
        type : "headerelement",
        prop : ("prop" in arg ? arg.prop : {}),
        childrens : ("childrens" in arg ? arg.childrens : []),
        proto : ("proto" in arg ? arg.proto : {})
      }));

    }

  }

}
