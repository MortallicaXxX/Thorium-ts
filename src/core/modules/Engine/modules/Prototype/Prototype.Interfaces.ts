import { Cpu } from '../Cpu/Cpu';

export interface VariableInterface<T>{
  Value?: T;
}

export interface ComponentInterface{
  define_th(element:any,proto:any):void;
}

export interface __th__ListenersInterface{
  Initialise():void;
  Update():void;
  Resize():void;
  Reset():void;
  FrameUpdate(cpuStats:Cpu.CpuInterface):void;
  turnActive():void;
  radioLike():void;
  remove():void;
}

export interface __th__{
  get app():any;
  _e:VariableInterface<HTMLthoriumElement>;
  get element():HTMLthoriumElement;
  _initilised:VariableInterface<boolean>;
  get isInitialised():boolean;
  _active:VariableInterface<boolean>;
  get isActive():boolean;
  _focus:VariableInterface<boolean>;
  get isFocus():boolean;
  _clicked:VariableInterface<boolean>;
  get isMouseDown():boolean;
  BeforeInitialise?():void|Promise<void>;
  AfterInitialise?():void|Promise<void>;
  onClick?():void;
  onDblClick?():void;
  onMouseEnter?():void;
  onMouseLeave?():void;
  onMouseMove?():void;
  onMouseOut?():void;
  onMouseOver?():void;
  onMouseUp?():void;
  onMouseDown?():void;
  onMouseWheel?():void;
  onChange?():void;
  onFocus?():void;
  onUnFocus?():void;
  onUpdate?():void;
  onResize?():void;
  onReset?():void;
  onFrameUpdate?(cpuStats:Cpu.CpuInterface):void;
  onActive?():void;
  onUnActive?():void;
}

export interface HTMLthoriumElement extends HTMLElement , __th__ , __th__ListenersInterface {
  __th__:__th__;
}
