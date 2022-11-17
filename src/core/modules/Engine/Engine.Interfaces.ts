import * as UI from "./modules/UI/UI";
import * as Handlers from "./modules/Handlers/Handlers";
import * as Cpu from "./modules/Cpu/Cpu";
import * as Prototype from "./modules/Prototype/Prototype";
import { Style , StyleInterface} from "./modules/Style/Style";
import * as DataStorage from "./modules/DataStorage/DataStorage";

export interface EngineInterface {

  Vue:UI.GlobalUserInterface;
  isMobile:boolean;
  Handlers:Handlers.EventInterface;
  GlobalEvent:Handlers.GlobalEventInterface;
  DataStorage:DataStorage.DbInterface;
  CpuStats:Cpu.CpuInterface;
  Style:StyleInterface;
  app:any;
  component:typeof UI.ElementUI;

  Var(value:any,options?:any):Prototype.Variable<any>;
  View(view:any):EngineInterface;
  Show():void;
  setGeneralUserInterface(template:UI.TemplateInterface<any>):void;

}
