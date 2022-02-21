import { Models } from "./Models";

export namespace Prototype{

  export class Variable{

    constructor(value:any,options?:any){
      const _this:any = this;

      _this.#setFreeze();
      _this.#setType();
      _this.#setGetter();
      _this.#setSetter();
      _this.#defineProperty(value,options);

    }

    #setFreeze():void{
      const _this:any = this;
      _this.__proto__.freeze = function(){
        return Object.freeze(_this);
      }
    }

    #setType():void{
      const _this:any = this;
      _this.__proto__.Type = function(v){
        if(v == null)return null;
        if(typeof v == 'object'){ // si value est un "object"
          if(Array.isArray(v) == true){ // si value est un Array
            return "array";
          }
          else{ // si value est un Object
            if(v.__proto__.constructor.name != "")return v.__proto__.constructor.name;
            else return typeof v;
          }
        }
        else if(!isNaN(Number(v))){ // si value est un nombre
          if(typeof v == 'boolean') return typeof v; // si il est aussi égal à un bool c'est uqe c'est un bool true = 1 , false = 0
          else return typeof Number(0); // sinon c'est un nombre
        }
        else if (typeof v == 'boolean'){ // si value est un boolean
          return typeof v;
        }
        else return typeof String("");  // sinon c'est un string
      }
    }

    #setGetter():void{
      const _this:any = this;
      _this.__defineGetter__('Value',function(){
        return this[`#_value`];
      });

    }

    #setSetter():void{
      const _this:any = this;
      _this.__defineSetter__('Value', function(x){
        let define = (_this.Value ? true : false); // A t-il déjà été définis ?
        // si jamais définis mais writable false permission une seule assignation
        if(!define && _this[`#_writable`] == false)_this[`#_value`] = x;
        // si il est writable permission d'écriture
        else if (_this[`#_writable`]){
          // vérification du type
          if(_this.Type(x) == _this[`#_dataType`])_this[`#_value`] = x;
          else if (!define){
            _this[`#_value`] = x;
            Object.defineProperty(_this, '#_dataType', {
              value: _this.Type(x),
              writable: false
            });
          }
          else console.error(`Data type does not match. Value is '${_this.Type(x)}' , '${_this[`#_dataType`]}' is expected.`);
        }
        // sinon erreur d'assignement
        else console.error("Can't set readonly value.");

      })
    }

    #defineProperty(value:any,options:any):void{
      const _this:any = this;
      // définission de la valeur en privée
      Object.defineProperty(_this, '#_value', {
        value: value,
        writable: (value ? options.writable : true)
      });

      // définission du type de la valeur en privée
      Object.defineProperty(_this, '#_dataType', {
        value: _this.Type(value),
        writable: (!_this.Type(value) ? true : false)
      });

      // définssion des options de la valeur en privée
      Array.from({length : Object.keys(options).length} , function(x,i){
          Object.defineProperty(_this, `#_${Object.keys(options)[i]}`, {
            value: Object.values(options)[i],
            writable: false
          });
      })
    }

  }

  export class Component{
    define_th(element:any,proto:any){

      element.th = {
        get app(){
          const x:any = window;
          return x.thorium.app.th;
        },
        e : new Variable(element,{writable:false}),
        get element(){return this.e.Value},
        active : new Variable(false,{writable:true}),
        get isActive(){return this.active.Value},
        focus : new Variable(false,{writable:true}),
        get isFocus(){return this.focus.Value},
        _parent : new Variable(null,{writable:false}),
        get parent(){return this._parent.Value},
        get DOMparent(){return this.e.Value.parentNode},
        _children : new Variable({},{writable:true}),
        get children(){return this._children.Value},
        get DOMchildren(){return this.element.children},
        Initialise : async function(){
          this._parent.Value = this.e.Value.parentNode.th;
          if("onInitialise" in this)await this.onInitialise();
          for(const element of this.e.Value.children){
            if(element.getAttribute("name"))this._children.Value[element.getAttribute("name")] = element.th;
            try{element.th.Initialise()}catch(err){};
          }
        },
        Update : function(){
          if("onUpdate" in this)this.onUpdate();
          for(const element of this.e.Value.children){
            try{element.th.Update()}catch(err){}
          }
        },
        Resize : function(){
          if("onResize" in this)this.onResize();
          for(const element of this.e.Value.children){
            try{element.th.Resize()}catch(err){}
          }
        },
        Reset : function(){
          if("onReset" in this)this.onReset();
          for(const element of this.e.Value.children){
            try{element.th.Reset()}catch(err){}
          }
        },
        FrameUpdate : function(cpuStats:Models.cpu){
          if("onFrameUpdate" in this)this.onFrameUpdate(cpuStats);
          for(const element of this.e.Value.children){
            try{element.th.FrameUpdate(cpuStats)}catch(err){}
          }
        },
        turnActive : function() {
          var element = this.e.Value;
          if(this.active.Value == false){
            element.classList.add('active');
            this.active.Value = true;
            // appel de la fonction onActive si présente
            if('onActive' in this)this.onActive();
          }
          else {
            element.classList.remove('active');
            this.active.Value = false;
            if('onUnActive' in this)this.onUnActive();
          }
        },
        radioLike : function(){
          this.turnActive();
          for(var e of this.e.Value.parentNode.children){
            try{
              var active = e.th.active.Value;
              if(active == true && e != this.e.Value)e.th.turnActive();
            }
            catch(err){}
          }
        },
        querySelector : function(arg:string):HTMLElement[]{
          return this.e.Value.querySelectorAll(arg);
        }
      };

      for(const key of Object.keys(proto)){
        element.th[key] = proto[key];
      }

      const handlers = {
        click : function(){
          if("onClick" in element.th)element.th.onClick()
        },
        dblclick : function(){
          if("onDblClick" in element.th)element.th.onDblClick()
        },
        mouseenter : function(){
          if("onMouseEnter" in element.th)element.th.onMouseEnter()
        },
        mouseleave : function(){
          if("onMouseLeave" in element.th)element.th.onMouseLeave()
        },
        mousemove : function(){
          if("onMouseMove" in element.th)element.th.onMouseMove()
        },
        mouseout : function(){
          if("onMouseOut" in element.th)element.th.onMouseOut()
        },
        mouseover : function(){
          if("onMouseOver" in element.th)element.th.onMouseOver()
        },
        mouseup : function(){
          if("onMouseUp" in element.th)element.th.onMouseUp()
        },
        mousedown : function(){
          if("onMouseDown" in element.th)element.th.onMouseDown()
        },
        mousewheel : function(){
          if("onMouseWheel" in element.th)element.th.onMouseWheel()
        },
        change : function(){
          if("onChange" in element.th)element.th.onChange()
        },
        focus : function(e){
          if("onFocus" in element.th)element.th.onFocus(e)
        },
        focusout : function(e){
          if("onUnFocus" in element.th)element.th.onUnFocus(e)
        }
      }

      for(const key of Object.keys(handlers)){
        element.addEventListener(key,handlers[key])
      }

      return element;

    }
  }

  export class Models{

  }

  export class Controler{
    constructor(proto:any){
      Object.assign(this,proto);
    }
  }

  export class Style{

  }

}
