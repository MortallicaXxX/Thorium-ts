import { EngineInterface } from "../../../Engine/Engine";
import { Cpu as CpuInterface } from "./Cpu.Interface";
export { CpuInterface };
export declare class Cpu implements CpuInterface {
    engine: EngineInterface;
    cpuInterval: number;
    startTime: number;
    lastTime: number;
    lastmicroTime: number;
    elapsedTime: number;
    fps: number;
    constructor(engine: EngineInterface);
    callback(cpu: Cpu, timestamp: number): void;
}
