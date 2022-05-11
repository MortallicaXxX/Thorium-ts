import * as engine from "./modules/Engine/Engine";
import * as userinterface from "./modules/Engine/modules/UI/UI";
import * as view from "./modules/Engine/modules/View/Views";
import * as prototype from "./modules/Engine/modules/Prototype/Prototype";
import * as cpu from "./modules/Engine/modules/Cpu/Cpu";
import * as handlers from "./modules/Engine/modules/Handlers/Handlers";

import * as style from './modules/Engine/modules/Style/Style';
import { Components as components} from "./modules/Engine/modules/Components/Components";
import * as datastorage from "./modules/Engine/modules/DataStorage/DataStorage";

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

export interface ProtoGhost extends prototype.__th__Ghost {};

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
  export interface TemplateInterface extends userinterface.TemplateInterface {};
  export interface ElementInterface extends userinterface.ElementInterface {};
  export interface NodeInterface extends userinterface.NodeInterface {};
  export interface GlobalUserInterface extends userinterface.GlobalUserInterface {};
  /// Prototype
  export interface VariableInterface<T> extends prototype.VariableInterface<T> {};
  export interface ComponentInterface extends prototype.ComponentInterface {};
  export interface __th__ListenersInterface extends prototype.__th__ListenersInterface {};
  export interface __th__ extends prototype.__th__ {};
  export interface ProtoGhost extends prototype.__th__Ghost {};
  export interface HTMLthoriumElement extends prototype.HTMLthoriumElement {};
  /// View
  export interface ViewInterface extends view.ViewInterface {};
  /// Cpu
  export interface CpuInterface extends cpu.CpuInterface {};

  export const version:number = 2.22;
  export const UI:typeof userinterface = userinterface;
  export const Engine:engine.EngineInterface = engine.Engine;
  export const Components:typeof components = components;

  export const Vue = function(view:any){return Thorium.Engine.View(view)};
  export const Show = function(){return Thorium.Engine.Show};
  export const component:typeof userinterface.ElementUI = Thorium.Engine.component;
  export const app = function(){return Thorium.Engine.app};
  export const Var:() => (value: any, options?: any) => prototype.Variable<any> = function(){return Thorium.Engine.Var};
  export const Style:style.StyleInterface = Thorium.Engine.Style;

  (function(w:Thorium.ThoriumWindow):void{

    w.thorium = Thorium;
    w.Var = function(value:any,options?:any){return new prototype.Variable(value,options)}
    w.Style = style.Style;
    w.View = view.View;

  })(window as Thorium.ThoriumWindow);

}
