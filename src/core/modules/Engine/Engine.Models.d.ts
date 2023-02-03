import * as UI from "./modules/UI/UI";
import * as Handlers from "./modules/Handlers/Handlers";
import * as Cpu from "./modules/Cpu/Cpu";
import * as Prototype from "./modules/Prototype/Prototype";
import * as Style from "./modules/Style/Style";
import * as DataStorage from "./modules/DataStorage/DataStorage";
import { EngineInterface } from "./Engine.Interfaces";
export { EngineInterface };
export declare const Engine: {
    Vue: UI.GlobalUserInterface;
    isMobile: boolean;
    Handlers: Handlers.EventInterface;
    GlobalEvent: Handlers.GlobalEventInterface;
    DataStorage: DataStorage.DbInterface;
    "__#9@#Cpu": Cpu.CpuInterface;
    CpuStats: Cpu.CpuInterface;
    Style: Style.StyleInterface;
    app: any;
    Var(value: any, options?: any): Prototype.Variable<any>;
    View(view: any): any;
    Show: () => void;
    setGeneralUserInterface(template: UI.TemplateInterface<any>): void;
    readonly component: typeof UI.ElementUI;
};
