import * as Cpu from "../Cpu/Cpu";
import Mutations , { AttributesOberserver } from '../Mutations/src/mutation';
import {
  VariableInterface,
  ComponentInterface,
  __th__ListenersInterface,
  __th__ as ThInterface, __th__Ghost ,
  HTMLthoriumElement
} from './Prototype.Interfaces';

export {
  VariableInterface,
  ComponentInterface,
  __th__ListenersInterface,
  ThInterface, __th__Ghost,
  HTMLthoriumElement
}

export class Variable<T> implements VariableInterface<T>{

  Value?:T;

  constructor(value:T,options?:any){
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

export const __th__Listeners = new class __th__Listeners implements __th__ListenersInterface{

  async Initialise(){

    const t:any = this;
    const _this:HTMLthoriumElement = t;

    async function InitChildrens(element:any){
      for(const e of element.children){
        try{await e.Initialise()}catch(err){};
      }
    }

    async function AfterInitialise(element:any){
      if("AfterInitialise" in element)element.AfterInitialise()
    }

    if(_this.getAttribute('name'))(_this.parentNode as any).__defineGetter__(_this.getAttribute('name'),function(){return _this;})

    if("BeforeInitialise" in _this && !_this.isInitialised)await _this.BeforeInitialise();
    await InitChildrens(_this);
    if("AfterInitialise" in _this && !_this.isInitialised)await _this.AfterInitialise();
    _this._initilised.Value = true;

  };
  remove(){
    const _this:any = this;
    const t:HTMLthoriumElement = _this;
    if(t.getAttribute('name'))delete t.parentNode[t.getAttribute('name')];
    t.outerHTML = "";
  };
  Update(message:any){
    const _this:any = this;
    const t:HTMLthoriumElement = _this;
    if("onUpdate" in t)t.onUpdate(message);
    for(const element of t.children){
      const e = (element as HTMLthoriumElement);
      if('update' in e)(e as any).update(message);
    }
  };
  Resize(){
    const _this:any = this;
    const t:HTMLthoriumElement = _this;
    if("onResize" in t)t.onResize();
    for(const element of t.children){
      const e = (element as HTMLthoriumElement);
      if('Resize' in e)e.Resize();
    }
  };
  Reset(){
    const _this:any = this;
    const t:HTMLthoriumElement = _this;
    if("onReset" in t)t.onReset();
    for(const element of t.children){
      const e = (element as HTMLthoriumElement);
      if('Reset' in e)e.Reset();
    }
  };
  FrameUpdate(cpuStats:Cpu.CpuInterface){
    const _this:any = this;
    const t:HTMLthoriumElement = _this;
    if("onFrameUpdate" in t)t.onFrameUpdate(cpuStats);
    for(const element of t.children){
      const e = (element as HTMLthoriumElement);
      if('FrameUpdate' in e)e.FrameUpdate(cpuStats);
    }
  };
  turnActive() {
    const _this:any = this;
    if(!_this.th.isActive){
      _this.classList.add('active');
      _this._active.Value = true;
      if('onActive' in _this)_this.onActive();
    }
    else {
      _this.classList.remove('active');
      _this._active.Value = false;
      if('onUnActive' in _this)_this.onUnActive();
    }
  };
  radioLike(){
    const _this:any = this;
    const t:HTMLthoriumElement = _this;
    t.turnActive();
    for(const element of t.parentNode.children){
      const e = (element as any);
      if(e.th.isActive && e != t)e.turnActive();
    }
  }

}

// export class __th__Ghost implements ThInterface{
//
// }

export class __th__ implements ThInterface{

  get app(){
    const x:any = window;
    return x.thorium.app;
  }
  _e?:VariableInterface<HTMLthoriumElement>;
  get element():HTMLthoriumElement{return this._e.Value};
  _initilised?:VariableInterface<boolean>;
  get isInitialised():boolean{return this._initilised.Value};
  _active?:VariableInterface<boolean>;
  get isActive():boolean{return this._active?.Value}
  _focus?:VariableInterface<boolean>;
  get isFocus():boolean{return this._focus?.Value}
  _clicked?:VariableInterface<boolean>;
  get isMouseDown():boolean{return this._clicked?.Value}
  // get context():any{
  //   if(this.element.classList.contains('context'))return this.element;
  //   else if(((this.element.parentNode as any).tagName == 'BODY'))return this.element;
  //   else return (this.element.parentNode as any).th.context;
  // }
  context:(contextName?:string)=>HTMLthoriumElement = function(contextName?:string){

    const findContext = (element:HTMLElement|ParentNode) => {
      if((element.parentNode as Element).classList.contains('context')){
        if(contextName && (element.parentNode as Element).getAttribute('name') == contextName)return element.parentNode;
        if(contextName && (element.parentNode as Element).getAttribute('name') != contextName)return findContext(element.parentNode);
        else return element.parentNode;
      }
      else if(((element.parentNode as Element).tagName == 'APP'))return element;
      else return findContext(element.parentNode);
    }

    return findContext(this);

  }

  constructor(element:any,proto:any){

    this._e = new Variable(element,{writable:false});
    this._initilised = new Variable(false,{writable:true});
    this._active = new Variable(this.element.classList.contains('active'),{writable:true});
    this._focus = new Variable(false,{writable:true});
    this._clicked = new Variable(false,{writable:true});

    // if(proto.observedAttributes){element.__defineGetter__('observedAttributes',proto.observedAttributes);}

    Object.assign(this , proto);
    Object.assign(element , {
      Initialise : __th__Listeners.Initialise,
      remove : __th__Listeners.remove,
      update: __th__Listeners.Update,
      Resize:__th__Listeners.Resize,
      Reset:__th__Listeners.Reset,
      FrameUpdate:__th__Listeners.FrameUpdate,
      turnActive:__th__Listeners.turnActive,
      radioLike:__th__Listeners.radioLike
    });

  }

}

export class Component implements ComponentInterface{
  define_th(element:any,proto:any,observables?:any){

    element.th = new __th__(element,proto);

    for(const key of Object.keys(element.th)){
      element.__defineGetter__(key,function(){return element.th[key]});
      element.__defineSetter__(key,function(value){element.th[key] = value});
    }

    if(observables)element.th.observable = AttributesOberserver(element , observables , function(event:MutationRecord[]){
      if('onMutation' in element)for(const e of event){element.onMutation(e)}
    })

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
      },
      dragstart : function(e){
        if("onDragStart" in element)element.onDragStart(e)
      },
      dragend : function(e){
        if("onDragEnd" in element)element.onDragEnd(e)
      },
      dragover : function(e){
        if("onDragOver" in element)element.onDragOver(e)
      },
      dragenter : function(e){
        if("onDragEnter" in element)element.onDragEnter(e)
      }, 
      dragleave : function(e){
        if("onDragLeave" in element)element.onDragLeave(e)
      },
      drop : function(e){
        if("onDrop" in element)element.onDrop(e)
      },
      submit : function(e){
        if('onSubmit' in element)element.onSubmit(e);
      },
      contextmenu : function(e){
        if('onContextMenu' in element)element.onContextMenu(e);
      }
    }

    for(const key of Object.keys(handlers)){
      element.addEventListener(key,handlers[key])
    }

    return element;

  }
}
