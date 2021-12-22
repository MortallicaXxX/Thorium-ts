import { Engine } from "./Engine";
import { UI as ui } from "./UI";
import { Models as models } from './Models';
import { View } from "./Views";
import { Components as components} from "./Components";
import { Mobile as mobile } from "./Mobile";
import { Animations as animations } from "./Animations";

class Thorium{

  version:number = 2.22;
  UI:typeof ui = ui;
  Models:typeof models = models;
  Engine:Engine = new Engine();
  Components:typeof components = components;
  Mobile:typeof mobile = mobile;
  Animations:typeof animations = animations;

  get Vue():(view:any) => Engine{return this.Engine.View}
  get Show():()=>void{return this.Engine.Show}
  get component():typeof ui.ElementUI{return this.Engine.component}
  get app():HTMLElement{return this.Engine.app}
  get Var(){return this.Engine.Var}
  get Style(){return this.Engine.Style}
  get DataStorage(){return this.Engine.DataStorage}

}

const w:any = window;
w.thorium = new Thorium();
w.Var = function(value:any,options?:any){return w.thorium.Var(value,options)}
w.Style = w.thorium.Style;
w.DataStorage = w.thorium.DataStorage;
w.View = View;
