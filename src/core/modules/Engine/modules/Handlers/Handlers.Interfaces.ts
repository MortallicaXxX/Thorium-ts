import { EngineInterface } from '../../Engine';
import * as Cpu from '../Cpu/Cpu';

export interface GlobalEventInterface {
  engine:EngineInterface;
  Initialise():void;
  Update():void;
  Resize():void;
  FrameUpdate(cpuStats:Cpu.CpuInterface):void;
}

export interface MousePositionInterface{
  x:number,
  y:number
}

export interface MouseButtonsInterface{
  left:boolean;
  center:boolean;
  right:boolean;
}

export interface MouseInterface{
  position:MousePositionInterface;
  Buttons:MouseButtonsInterface;
  isClicked:boolean;
  Right:boolean;
  Center:boolean;
  Left:boolean;
  UpdatePosition(event:MouseEvent):void;
  UpdateClick(isClicked:boolean,event:MouseEvent):void;
}

export interface ScreenDimensionsInterface{
  height:number,
  width:number
}

export interface ScreenInterface{
  dimensions:ScreenDimensionsInterface;
  UpdateDimensions(engine:EngineInterface):void;
}

export interface KeyboardInterface{
  keys:any;
  UpdateKey(isPressed:boolean,event:KeyboardEvent):void;
}

export interface EventInterface{
  Mouse:MouseInterface;
  Screen:ScreenInterface;
  Keyboard:KeyboardInterface;
  Engine:EngineInterface;
}
