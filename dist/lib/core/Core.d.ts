import * as engine from "./modules/Engine/Engine";
import * as userinterface from "./modules/Engine/modules/UI/UI";
import * as view from "./modules/Engine/modules/View/Views";
import * as prototype from "./modules/Engine/modules/Prototype/Prototype";
import * as cpu from "./modules/Engine/modules/Cpu/Cpu";
import * as handlers from "./modules/Engine/modules/Handlers/Handlers";
import * as style from './modules/Engine/modules/Style/Style';
import { Components as components } from "./modules/Engine/modules/Components/Components";
import * as datastorage from "./modules/Engine/modules/DataStorage/DataStorage";
import useState, { State } from './modules/Engine/modules/States/src/';
export { useState, State };
import { ThoriumGlobal as _ThoriumGlobal, ThoriumWindow as _ThoriumWindow, ThoriumInterface as _ThoriumInterface } from './Core.Models';
export { engine as Engine, handlers as Handlers, userinterface as UserInterface, prototype as Prototype, view as View, cpu as Cpu, components as Components, style as Style, datastorage as DataStorage, };
export declare const Events: handlers.EventInterface;
export declare const Mouse: handlers.MouseInterface;
export declare const Screen: handlers.ScreenInterface;
export declare const Keyboard: handlers.KeyboardInterface;
export interface GhostController extends prototype.__th__Ghost {
}
export declare namespace Thorium {
    type ThoriumGlobal = _ThoriumGlobal;
    interface ThoriumWindow extends _ThoriumWindow {
    }
    interface ThoriumInterface extends _ThoriumInterface {
    }
    interface EngineInterface extends engine.EngineInterface {
    }
    interface GlobalEventInterface extends handlers.GlobalEventInterface {
    }
    interface MousePositionInterface extends handlers.MousePositionInterface {
    }
    interface MouseButtonsInterface extends handlers.MouseButtonsInterface {
    }
    interface MouseInterface extends handlers.MouseInterface {
    }
    interface ScreenDimensionsInterface extends handlers.ScreenDimensionsInterface {
    }
    interface ScreenInterface extends handlers.ScreenInterface {
    }
    interface KeyboardInterface extends handlers.KeyboardInterface {
    }
    interface EventInterface extends handlers.EventInterface {
    }
    interface TemplateInterface<T> extends userinterface.TemplateInterface<T> {
    }
    interface ElementInterface<T> extends userinterface.ElementInterface<T> {
    }
    interface NodeInterface extends userinterface.NodeInterface {
    }
    interface GlobalUserInterface extends userinterface.GlobalUserInterface {
    }
    interface VariableInterface<T> extends prototype.VariableInterface<T> {
    }
    interface ComponentInterface extends prototype.ComponentInterface {
    }
    interface __th__ListenersInterface extends prototype.__th__ListenersInterface {
    }
    interface __th__ extends prototype.__th__ {
    }
    interface Controller extends prototype.__th__Ghost {
    }
    interface HTMLthoriumElement extends prototype.HTMLthoriumElement {
    }
    interface ViewInterface extends view.ViewInterface {
    }
    interface CpuInterface extends cpu.CpuInterface {
    }
    const useState: typeof import("./modules/Engine/modules/States/src/").default;
    const version: number;
    const UI: typeof userinterface;
    const Engine: engine.EngineInterface;
    const Components: typeof components;
    const Vue: (view: any) => engine.EngineInterface;
    const View: typeof view;
    const Show: () => () => void;
    const component: typeof userinterface.ElementUI;
    const app: () => any;
    const Var: (value: any, options?: any) => prototype.Variable<any>;
    const Style: style.StyleInterface;
}
