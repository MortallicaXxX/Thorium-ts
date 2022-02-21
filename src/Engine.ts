import { Models } from "./Models";
import { UI } from "./UI";
import { Handlers } from "./Handlers";
import { Cpu } from "./Cpu";
import { Prototype } from "./Prototype";
import { Style } from "./Style";
import { DataStorage } from "./DataStorage";

// TODO: Ajout des Components.Controlers
// TODO: Ajout des Components.Models
// TODO: Ajout des Components.Style
// NOTE: TEST

export class Engine{

  Vue:UI.GUI = new UI.GUI;
  isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/) ? true : false);
  Handlers:Handlers.Controls.Events = new Handlers.Controls.Events(this);
  GlobalEvent:Handlers.GlobalEvent = new Handlers.GlobalEvent(this);
  DataStorage:DataStorage.DB =  new DataStorage.DB(this);
  #Cpu:Cpu = new Cpu(this);
  CpuStats:Models.cpu;
  Style:Style = new Style();
  app:any;

  Var(value:any,options?:any):Prototype.Variable{
    if(!options)options = {};
    if("writable" in options == false)options.writable = true;
    return new Prototype.Variable(value,options);
  }

  View(view:any):Engine{
    const global:any = window;
    global.thorium.Engine.setGeneralUserInterface((new view).Main());
    return this;
  }

  Show():void{
    const global:any = window;
    global.thorium.Engine.Vue.ui.BuildIn(document.body)
    .then(function(result:any){
      global.thorium.Engine.app = result;
      global.thorium.Engine.app.th.Initialise();
      console.log(result);
    })
  }

  setGeneralUserInterface(template:Models.Template):void{
    this.Vue = new UI.GUI(template);
  }

  get component():typeof UI.ElementUI{return UI.ElementUI;}

}
