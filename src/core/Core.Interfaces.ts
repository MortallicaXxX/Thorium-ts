import { ThoriumGlobal } from "./Core.Types";
import { EngineInterface } from './modules/Engine/Engine';
import * as UserInterface from "./modules/Engine/modules/UI/UI";
import { Components } from "./modules/Engine/modules/Components/Components";
import { StyleInterface } from "./modules/Engine/modules/Style/Style";
import { Variable } from "./modules/Engine/modules/Prototype/Prototype";

import { Thorium } from './Core';

export {ThoriumGlobal};

export interface ThoriumWindow extends ThoriumGlobal{
  /** Description : */
  thorium:typeof Thorium;
  /** Description : */
  Var:(value:any,options?:any)=>Variable<any>;
  /** Description : */
  Style:StyleInterface;
  /** Description : */
  DataStorage:()=>any;
  /** Description : */
  View:any;
}

export interface ThoriumInterface{
  version:number;
  UI:typeof UserInterface;
  Engine:EngineInterface;
  Components:typeof Components;
  Vue:(view:any)=>EngineInterface;
  Show:()=>void;
  component:typeof UserInterface.ElementUI;
  app:HTMLElement;
  Style:StyleInterface;
  Var:(value: any, options?: any) => Variable<any>;
}
