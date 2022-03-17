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
          return x.thorium.app;
        },
        _e : new Variable(element,{writable:false}),
        get element(){return this._e.Value},
        _initilised : new Variable(false,{writable:true}),
        get isInitialised(){return this._initilised.Value},
        _active : new Variable(element.classList.contains('active'),{writable:true}),
        get isActive(){return this._active.Value},
        _focus : new Variable(false,{writable:true}),
        get isFocus(){return this._focus.Value},
        _clicked : new Variable(false,{writable:true}),
        get isMouseDown(){return this._clicked.Value},
        // _parent : new Variable(null,{writable:false}),
        // get parent(){return this._parent.Value},
        // get DOMparent(){return this.e.Value.parentNode},
        // _children : new Variable({},{writable:true}),
        // get children(){return this._children.Value},
        // get DOMchildren(){return this.element.children},
        async Initialise(){

          const _this:any = this;

          async function InitChildrens(element:any){
            for(const e of element.children){
              try{await e.Initialise()}catch(err){};
            }
          }

          async function AfterInitialise(element:any){
            if("AfterInitialise" in element)element.AfterInitialise()
          }

          if(this.getAttribute('name'))this.parentNode.__defineGetter__(this.getAttribute('name'),function(){return _this;})

          if("BeforeInitialise" in this && !this.isInitialised)await this.BeforeInitialise();
          await InitChildrens(_this);
          if("AfterInitialise" in this && !this.isInitialised)await this.AfterInitialise();
          this._initilised.Value = true;

        },
        remove(){
          if(this.getAttribute('name'))delete this.parentNode[this.getAttribute('name')];
          this.outerHTML = "";
        },
        Update(){
          if("onUpdate" in this)this.onUpdate();
          for(const element of this.children){
            if('Update' in element)element.Update();
          }
        },
        Resize(){
          if("onResize" in this)this.onResize();
          for(const element of this.children){
            if('Resize' in element)element.Resize();
          }
        },
        Reset(){
          if("onReset" in this)this.onReset();
          for(const element of this.children){
            if('Reset' in element)element.Reset();
          }
        },
        FrameUpdate(cpuStats:Models.cpu){
          if("onFrameUpdate" in this)this.onFrameUpdate(cpuStats);
          for(const element of this.children){
            if('FrameUpdate' in element)element.FrameUpdate();
          }
        },
        turnActive() {
          if(!this.isActive){
            this.classList.add('active');
            this._active.Value = true;
            if('onActive' in this)this.onActive();
          }
          else {
            this.classList.remove('active');
            this._active.Value = false;
            if('onUnActive' in this)this.onUnActive();
          }
        },
        radioLike(){
          this.turnActive();
          for(var e of this.parentNode.children){
            if(e.isActive && e != this)e.turnActive();
          }
        },
        ...(proto?proto:{})
      };

      for(const key of Object.keys(element.th)){
        element.__defineGetter__(key,function(){return element.th[key]});
        element.__defineSetter__(key,function(value){element.th[key] = value});
      }

      const handlers = {
        click : function(e){
          if("onClick" in element)element.onClick(e)
        },
        dblclick : function(e){
          if("onDblClick" in element)element.onDblClick(e)
        },
        mouseenter : function(e){
          if("onMouseEnter" in element)element.onMouseEnter(e)
        },
        mouseleave : function(e){
          if("onMouseLeave" in element)element.onMouseLeave(e)
        },
        mousemove : function(e){
          if("onMouseMove" in element)element.onMouseMove(e)
        },
        mouseout : function(e){
          if("onMouseOut" in element)element.onMouseOut(e)
        },
        mouseover : function(e){
          if("onMouseOver" in element)element.onMouseOver(e)
        },
        mouseup : function(e){
          this._clicked.Value = false;
          if("onMouseUp" in element)element.onMouseUp(e)
        },
        mousedown : function(e){
          this._clicked.Value = true;
          if("onMouseDown" in element)element.onMouseDown(e)
        },
        mousewheel : function(e){
          if("onMouseWheel" in element)element.onMouseWheel(e)
        },
        change : function(e){
          if("onChange" in element)element.onChange(e)
        },
        focus : function(e){
          if("onFocus" in element)element.onFocus(e)
        },
        focusout : function(e){
          if("onUnFocus" in element)element.onUnFocus(e)
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
