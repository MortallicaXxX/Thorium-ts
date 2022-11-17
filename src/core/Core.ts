import * as engine from "./modules/Engine/Engine";
import * as userinterface from "./modules/Engine/modules/UI/UI";
import * as view from "./modules/Engine/modules/View/Views";
import * as prototype from "./modules/Engine/modules/Prototype/Prototype";
import * as cpu from "./modules/Engine/modules/Cpu/Cpu";
import * as handlers from "./modules/Engine/modules/Handlers/Handlers";

import * as style from './modules/Engine/modules/Style/Style';
import { Components as components} from "./modules/Engine/modules/Components/Components";
import * as datastorage from "./modules/Engine/modules/DataStorage/DataStorage";

import useState , { State } from './modules/Engine/modules/States/src/';
export {useState , State};
const UseState = useState;

import {
  ThoriumGlobal as _ThoriumGlobal , ThoriumWindow as _ThoriumWindow,
  ThoriumInterface as _ThoriumInterface
} from './Core.Models';

export {
  engine as Engine,
  handlers as Handlers,
  userinterface as UserInterface,
  prototype as Prototype,
  view as View,
  cpu as Cpu,
  components as Components,
  style as Style,
  datastorage as DataStorage,
}

export const Events = engine.Engine.Handlers;
export const Mouse = engine.Engine.Handlers.Mouse;
export const Screen = engine.Engine.Handlers.Screen;
export const Keyboard = engine.Engine.Handlers.Keyboard;

export interface GhostController extends prototype.__th__Ghost {};


/**
  # Thorium
  - Description : Thorium is a client side framework who help to generate HTMLelement
  - Sample :
  ```typescript
    import Thorium , { Components , Controller , View } from 'Thorium';
    class App extends Components<Controller>{
      constructor(){
        super({
          prop : {
            id : 'myApp',
            class : 'my-app',
            name : 'app',
            text : 'Welcome on your first app'
          },
          childrens:[],
          proto:{}
        })
      }
    }
    class main extends View.View{
      constructor(){
        super(App as Thorium.TemplateInterface<any>)
      }
    }
    Thorium.Vue(main).Show();
  ```
*/
export namespace Thorium{

  /// Thorium
  export type ThoriumGlobal = _ThoriumGlobal;
  export interface ThoriumWindow extends _ThoriumWindow{};
  export interface ThoriumInterface extends _ThoriumInterface{};
  /// Engine
  export interface EngineInterface extends engine.EngineInterface{};
  /// Handlers
  export interface GlobalEventInterface extends handlers.GlobalEventInterface{}
  export interface MousePositionInterface extends handlers.MousePositionInterface{}
  export interface MouseButtonsInterface extends handlers.MouseButtonsInterface{}
  export interface MouseInterface extends handlers.MouseInterface{}
  export interface ScreenDimensionsInterface extends handlers.ScreenDimensionsInterface{}
  export interface ScreenInterface extends handlers.ScreenInterface{}
  export interface KeyboardInterface extends handlers.KeyboardInterface{}
  export interface EventInterface extends handlers.EventInterface{}
  /// UserInterface
  export interface TemplateInterface<T> extends userinterface.TemplateInterface<T> {};
  export interface ElementInterface<T> extends userinterface.ElementInterface<T> {};
  export interface NodeInterface extends userinterface.NodeInterface {};
  export interface GlobalUserInterface extends userinterface.GlobalUserInterface {};
  /// Prototype
  export interface VariableInterface<T> extends prototype.VariableInterface<T> {};
  export interface ComponentInterface extends prototype.ComponentInterface {};
  export interface __th__ListenersInterface extends prototype.__th__ListenersInterface {};
  export interface __th__ extends prototype.__th__ {};
  export interface Controller extends prototype.__th__Ghost {};
  export interface HTMLthoriumElement extends prototype.HTMLthoriumElement {};
  /// View
  export interface ViewInterface extends view.ViewInterface {};
  /// Cpu
  export interface CpuInterface extends cpu.CpuInterface {};

  export const useState = UseState;
  export const version:number = 2.22;
  export const UI:typeof userinterface = userinterface;
  export const Engine:engine.EngineInterface = engine.Engine;
  export const Components:typeof components = components;

  export const Vue = function(view:any){return Thorium.Engine.View(view)};
  export const View = view;
  export const Show = function(){return Thorium.Engine.Show};
  export const component:typeof userinterface.ElementUI = Thorium.Engine.component;
  export const app = function(){return Thorium.Engine.app};
  export const Var:(value: any, options?: any) => prototype.Variable<any> = Thorium.Engine.Var;
  export const Style:style.StyleInterface = Thorium.Engine.Style;

  (function(w:Thorium.ThoriumWindow):void{

    w.thorium = Thorium;
    w.Var = function(value:any,options?:any){return new prototype.Variable(value,options)}
    w.Style = style.Style;
    w.View = view.View;

  })(window as Thorium.ThoriumWindow);

}
