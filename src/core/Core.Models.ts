import { Engine , EngineInterface } from "./modules/Engine/Engine";
import { UI as UserInterface } from "./modules/Engine/modules/UI/UI";
import { Components as components} from "./modules/Engine/modules/Components/Components";
import { StyleInterface } from "./modules/Engine/modules/Style/Style";
import {
  ThoriumGlobal,
  ThoriumWindow,
  ThoriumInterface
} from './Core.Interfaces';

export {
  ThoriumGlobal,
  ThoriumWindow,
  ThoriumInterface
} from './Core.Interfaces';

export const Thorium = new class Thorium implements ThoriumInterface{

  version:number = 2.22;
  UI:typeof UserInterface = UserInterface;
  Engine:EngineInterface = Engine;
  Components:typeof components = components;
  // Themes:typeof components.Themes = components.Themes;
  // Mobile:typeof mobile = mobile;
  // Animations:typeof animations = animations;

  get Vue():(view:any) => EngineInterface{return this.Engine.View}
  get Show():()=>void{return this.Engine.Show}
  get component():typeof UserInterface.ElementUI{return this.Engine.component}
  get app():HTMLElement{return this.Engine.app}
  get Var(){return this.Engine.Var}
  get Style():StyleInterface{return this.Engine.Style}
  // get DataStorage(){return this.Engine.DataStorage}

}
