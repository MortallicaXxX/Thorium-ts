"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpu = void 0;
class Cpu {
    constructor(engine) {
        this.startTime = Date.now();
        this.lastTime = Date.now();
        this.lastmicroTime = window.performance.now();
        this.elapsedTime = 0;
        this.fps = 0;
        const _this = this;
        _this.engine = engine;
        _this.cpuInterval = window.requestAnimationFrame(function (timestamp) {
            console.log("ici");
            _this.callback(_this, timestamp);
        });
    }
    callback(cpu, timestamp) {
        cpu.elapsedTime += Date.now() - cpu.lastTime;
        const delay = performance.now() - cpu.lastmicroTime;
        cpu.fps = Math.round(1 / delay * 1000);
        cpu.lastmicroTime = performance.now();
        cpu.lastTime = Date.now();
        cpu.engine.GlobalEvent.FrameUpdate(cpu);
        cpu.cpuInterval = window.requestAnimationFrame(function (timestamp) {
            cpu.callback(cpu, timestamp);
        });
    }
}
exports.Cpu = Cpu;
//# sourceMappingURL=Cpu.Models.js.map