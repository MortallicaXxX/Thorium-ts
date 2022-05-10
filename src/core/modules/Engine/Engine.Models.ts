import { UI } from "./modules/UI/UI";
import { Handlers } from "./modules/Handlers/Handlers";
import { Cpu } from "./modules/Cpu/Cpu";
import * as Prototype from "./modules/Prototype/Prototype";
import * as Style from "./modules/Style/Style";
import { DataStorage } from "./modules/DataStorage/DataStorage";
import { EngineInterface } from "./Engine.Interfaces";
import { Thorium , ThoriumWindow , ThoriumInterface} from '../../Core';

export {
  EngineInterface
};

export const Engine = new class Engine implements EngineInterface{
  Vue:UI.GlobalUserInterface = new UI.GUI;
  isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/) ? true : false);
  Handlers:Handlers.EventInterface = new Handlers.Controls.Events(this);
  GlobalEvent:Handlers.GlobalEventInterface = new Handlers.GlobalEvent(this);
  DataStorage:DataStorage.DbInterface =  new DataStorage.DB(this);
  #Cpu:Cpu.CpuInterface = new Cpu.Cpu(this);
  CpuStats:Cpu.CpuInterface;
  Style:Style.StyleInterface = Style.Style;
  app:any;

  Var(value:any,options?:any):Prototype.Variable<any>{
    if(!options)options = {};
    if("writable" in options == false)options.writable = true;
    return new Prototype.Variable(value,options);
  }

  View(view:any):EngineInterface{
    const global:any = window;
    global.thorium.Engine.setGeneralUserInterface((new view).Main());
    return this;
  }

  Show():void{
    const thorium:ThoriumInterface = (window as ThoriumWindow).thorium;
    thorium.Engine.Vue.ui.BuildIn(document.body)
    .then(function(result:any){
      thorium.Engine.app = result;
      thorium.Engine.app.Initialise();
    })
  }

  setGeneralUserInterface(template:UI.TemplateInterface):void{
    this.Vue = new UI.GUI(template);
  }

  get component():typeof UI.ElementUI {return UI.ElementUI;}

}