import * as Cpu from '../Cpu/Cpu';

import { Ghost } from './Prototype.Types';

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

export interface __th__Ghost extends Ghost{
  app?:any;
  element?:HTMLthoriumElement;
  isInitialised?:boolean;
  isActive?:boolean;
  isFocus?:boolean;
  isMouseDown?:boolean;
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
  /** Fire when click */
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

export interface __th__{
  app?:any;
  _e?:VariableInterface<HTMLthoriumElement>;
  element?:HTMLthoriumElement;
  _initilised?:VariableInterface<boolean>;
  isInitialised?:boolean;
  _active?:VariableInterface<boolean>;
  isActive?:boolean;
  _focus?:VariableInterface<boolean>;
  isFocus?:boolean;
  _clicked?:VariableInterface<boolean>;
  isMouseDown?:boolean;
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
