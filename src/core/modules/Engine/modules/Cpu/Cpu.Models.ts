import { EngineInterface } from "../../../Engine/Engine";
import { Cpu as CpuInterface } from "./Cpu.Interface";

export {CpuInterface};

export class Cpu implements CpuInterface {

  engine:EngineInterface;
  cpuInterval:number;
  startTime:number = Date.now();
  lastTime:number = Date.now();
  lastmicroTime:number = window.performance.now();
  elapsedTime:number = 0;
  fps:number = 0;

  constructor(engine:EngineInterface){
    const _this:Cpu = this;
    _this.engine = engine;
    _this.cpuInterval = window.requestAnimationFrame(function(timestamp:number){
      console.log("ici");
      _this.callback(_this,timestamp);
    })
  }

  callback(cpu:Cpu,timestamp:number){
    cpu.elapsedTime += Date.now() - cpu.lastTime;
    const delay = performance.now() - cpu.lastmicroTime;
    cpu.fps = Math.round(1/delay*1000);
    cpu.lastmicroTime = performance.now();
    cpu.lastTime = Date.now();
    cpu.engine.GlobalEvent.FrameUpdate(cpu);
    cpu.cpuInterval = window.requestAnimationFrame(function(timestamp){
        cpu.callback(cpu,timestamp)
    });
  }

}
