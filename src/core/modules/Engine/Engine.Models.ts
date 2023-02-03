import * as UI from "./modules/UI/UI";
import * as Handlers from "./modules/Handlers/Handlers";
import * as Cpu from "./modules/Cpu/Cpu";
import * as Prototype from "./modules/Prototype/Prototype";
import * as Style from "./modules/Style/Style";
import * as DataStorage from "./modules/DataStorage/DataStorage";
import {
  EngineInterface
} from "./Engine.Interfaces";

import {
  Thorium
} from '../../Core';

export {EngineInterface};

export const Engine = new class Engine implements EngineInterface{
  Vue:UI.GlobalUserInterface = new UI.GUI;
  isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/) ? true : false);
  Handlers:Handlers.EventInterface = new Handlers.Controls.Events(this);
  GlobalEvent:Handlers.GlobalEventInterface = new Handlers.GlobalEvent(this);
  DataStorage:DataStorage.DbInterface =  new DataStorage.DB(this);
  #Cpu:Cpu.CpuInterface = new Cpu.Cpu(this);
  CpuStats:Cpu.CpuInterface;
  Style:Style.StyleInterface = Style.Style;
  app:any = null;

  Var(value:any,options?:any):Prototype.Variable<any>{
    if(!options)options = {};
    if("writable" in options == false)options.writable = true;
    return new Prototype.Variable(value,options);
  }

  View(view:any):Engine{
    this.setGeneralUserInterface((new view()).Main());
    return this;
  }

  Show = ():void => {
    // const thorium:typeof Thorium = (window as Thorium.ThoriumWindow).thorium;
    console.log("Show");
    console.log(this.Vue.ui);
    this.Vue.ui.BuildIn(document.body)
    .then( (node) => {
      console.log(node);
      // thorium.Engine.app = node.elements[0];
      this.app = node.elements[0];
      console.log(this.app);
      node.Initialise();
    })
  }

  setGeneralUserInterface(template:UI.TemplateInterface<any>):void{
    console.log("setGeneralUserInterface",template);
    this.Vue = new UI.GUI(template);
  }

  get component():typeof UI.ElementUI {return UI.ElementUI;}

}
