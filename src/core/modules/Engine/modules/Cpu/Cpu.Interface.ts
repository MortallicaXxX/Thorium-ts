import { EngineInterface } from "../../../Engine/Engine";

export interface Cpu{

  engine:EngineInterface;
  cpuInterval:number;
  startTime:number;
  lastTime:number;
  lastmicroTime:number;
  elapsedTime:number;
  fps:number;
  callback(cpu:Cpu,timestamp:number):void

}
