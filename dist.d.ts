declare module "core/modules/Engine/modules/Cpu/Cpu.Interface" {
    import { EngineInterface } from "core/modules/Engine/Engine";
    export interface Cpu {
        engine: EngineInterface;
        cpuInterval: number;
        startTime: number;
        lastTime: number;
        lastmicroTime: number;
        elapsedTime: number;
        fps: number;
        callback(cpu: Cpu, timestamp: number): void;
    }
}
declare module "core/modules/Engine/modules/Cpu/Cpu.Models" {
    import { EngineInterface } from "core/modules/Engine/Engine";
    import { Cpu as CpuInterface } from "core/modules/Engine/modules/Cpu/Cpu.Interface";
    export { CpuInterface };
    export class Cpu implements CpuInterface {
        engine: EngineInterface;
        cpuInterval: number;
        startTime: number;
        lastTime: number;
        lastmicroTime: number;
        elapsedTime: number;
        fps: number;
        constructor(engine: EngineInterface);
        callback(cpu: Cpu, timestamp: number): void;
    }
}
declare module "core/modules/Engine/modules/Cpu/Cpu" {
    import * as Cpu from "core/modules/Engine/modules/Cpu/Cpu.Models";
    export { Cpu };
}
declare module "core/modules/Engine/modules/Prototype/Prototype.Interfaces" {
    import { Cpu } from "core/modules/Engine/modules/Cpu/Cpu";
    export interface VariableInterface<T> {
        Value?: T;
    }
    export interface ComponentInterface {
        define_th(element: any, proto: any): void;
    }
    export interface __th__ {
        get app(): any;
        _e: VariableInterface<HTMLthoriumElement>;
        get element(): HTMLthoriumElement;
        _initilised: VariableInterface<boolean>;
        get isInitialised(): boolean;
        _active: VariableInterface<boolean>;
        get isActive(): boolean;
        _focus: VariableInterface<boolean>;
        get isFocus(): boolean;
        _clicked: VariableInterface<boolean>;
        get isMouseDown(): boolean;
        Initialise(): void;
        Update(): void;
        Resize(): void;
        Reset(): void;
        FrameUpdate(cpuStats: Cpu.CpuInterface): void;
        turnActive(): void;
        radioLike(): void;
        remove(): void;
    }
    export interface HTMLthoriumElement extends HTMLElement, __th__ {
        __th__: __th__;
        BeforeInitialise?(): void | Promise<void>;
        AfterInitialise?(): void | Promise<void>;
        onClick?(): void;
        onDblClick?(): void;
        onMouseEnter?(): void;
        onMouseLeave?(): void;
        onMouseMove?(): void;
        onMouseOut?(): void;
        onMouseOver?(): void;
        onMouseUp?(): void;
        onMouseDown?(): void;
        onMouseWheel?(): void;
        onChange?(): void;
        onFocus?(): void;
        onUnFocus?(): void;
        onUpdate?(): void;
        onResize?(): void;
        onReset?(): void;
        onFrameUpdate?(cpuStats: Cpu.CpuInterface): void;
        onActive?(): void;
        onUnActive?(): void;
    }
}
declare module "core/modules/Engine/modules/Prototype/Prototype.Models" {
    import { Cpu } from "core/modules/Engine/modules/Cpu/Cpu";
    import { VariableInterface, ComponentInterface, __th__ as ThInterface, HTMLthoriumElement } from "core/modules/Engine/modules/Prototype/Prototype.Interfaces";
    export { VariableInterface, ComponentInterface };
    export class Variable<T> implements VariableInterface<T> {
        #private;
        Value?: T;
        constructor(value: T, options?: any);
    }
    export class __th__ implements ThInterface {
        get app(): any;
        _e: VariableInterface<HTMLthoriumElement>;
        get element(): HTMLthoriumElement;
        _initilised: VariableInterface<boolean>;
        get isInitialised(): boolean;
        _active: VariableInterface<boolean>;
        get isActive(): boolean;
        _focus: VariableInterface<boolean>;
        get isFocus(): boolean;
        _clicked: VariableInterface<boolean>;
        get isMouseDown(): boolean;
        Initialise(): Promise<void>;
        remove(): void;
        Update(): void;
        Resize(): void;
        Reset(): void;
        FrameUpdate(cpuStats: Cpu.CpuInterface): void;
        turnActive(): void;
        radioLike(): void;
        constructor(element: any, proto: any);
    }
    export class Component implements ComponentInterface {
        define_th(element: any, proto: any): any;
    }
}
declare module "core/modules/Engine/modules/Prototype/Prototype" {
    import * as Prototype from "core/modules/Engine/modules/Prototype/Prototype.Models";
    export { Prototype };
}
declare module "core/modules/Engine/modules/UI/UI.Interfaces" {
    export interface Template {
        type: string;
        prop: object;
        childrens: NodeUI;
        proto: object;
        Main(template: {
            type: string;
            prop?: object | null;
            childrens?: NodeUI | object[];
            proto?: object | null;
        }): void;
    }
    export interface ElementUI {
        template: Template;
        type: string;
        prop: object;
        childrens: any;
        proto: object;
        Main(template: Template): void;
        CreateElement(parent?: any): HTMLElement | any;
    }
    export interface NodeUI {
        Node: ElementUI[];
        Parent: HTMLElement | null;
        Root: any | null;
        Main(template: Template | object[], root?: any, parent?: HTMLElement): void;
        BuildIn(parent: any): Promise<void>;
        normalize(template: Template | object[]): Array<ElementUI> | [];
    }
    export interface GUI {
        ui: NodeUI;
        Main(template: Template): void;
    }
}
declare module "core/modules/Engine/modules/UI/UI.Models" {
    import { Template as TemplateInterface, ElementUI as ElementInterface, NodeUI as NodeInterface, GUI as GlobalUserInterface } from "core/modules/Engine/modules/UI/UI.Interfaces";
    export { TemplateInterface, ElementInterface, NodeInterface, GlobalUserInterface };
    export class Template implements TemplateInterface {
        type: string;
        prop: object;
        childrens: NodeInterface;
        proto: object;
        constructor(template?: {
            type: string;
            prop?: object | null;
            childrens?: NodeInterface | object[];
            proto?: object | null;
        });
        Main(template: {
            type: string;
            prop?: object | null;
            childrens?: NodeInterface | object[];
            proto?: object | null;
        }): void;
    }
    export class ElementUI implements ElementInterface {
        #private;
        get template(): TemplateInterface;
        get type(): string;
        get prop(): object;
        get childrens(): NodeInterface;
        get proto(): object;
        constructor(template?: TemplateInterface);
        Main(template: TemplateInterface): void;
        CreateElement(parent?: any): HTMLElement | any;
    }
    export class NodeUI implements NodeInterface {
        #private;
        get Node(): ElementInterface[];
        get Parent(): HTMLElement | null;
        get Root(): any | null;
        constructor(template?: TemplateInterface[] | object[], root?: any, parent?: any);
        Main(template: TemplateInterface | object[], root?: any, parent?: HTMLElement): void;
        BuildIn(parent: any): Promise<void>;
        normalize: (template: TemplateInterface | object[]) => Array<ElementInterface> | [];
    }
    export class GUI implements GlobalUserInterface {
        #private;
        get ui(): NodeInterface;
        constructor(template?: TemplateInterface);
        Main(template: TemplateInterface): void;
    }
}
declare module "core/modules/Engine/modules/UI/UI" {
    import * as UI from "core/modules/Engine/modules/UI/UI.Models";
    export { UI };
}
declare module "core/modules/Engine/modules/Handlers/Handlers.Interfaces" {
    import { EngineInterface } from "core/modules/Engine/Engine";
    import { Cpu } from "core/modules/Engine/modules/Cpu/Cpu";
    export interface GlobalEventInterface {
        engine: EngineInterface;
        Initialise(): void;
        Update(): void;
        Resize(): void;
        FrameUpdate(cpuStats: Cpu.CpuInterface): void;
    }
    export interface MousePositionInterface {
        x: number;
        y: number;
    }
    export interface MouseButtonsInterface {
        left: boolean;
        center: boolean;
        right: boolean;
    }
    export interface MouseInterface {
        position: MousePositionInterface;
        Buttons: MouseButtonsInterface;
        isClicked: boolean;
        Right: boolean;
        Center: boolean;
        Left: boolean;
        UpdatePosition(event: MouseEvent): void;
        UpdateClick(isClicked: boolean, event: MouseEvent): void;
    }
    export interface ScreenDimensionsInterface {
        height: number;
        width: number;
    }
    export interface ScreenInterface {
        dimensions: ScreenDimensionsInterface;
        UpdateDimensions(engine: EngineInterface): void;
    }
    export interface KeyboardInterface {
        keys: any;
        UpdateKey(isPressed: boolean, event: KeyboardEvent): void;
    }
    export interface EventInterface {
        Mouse: MouseInterface;
        Screen: ScreenInterface;
        Keyboard: KeyboardInterface;
        Engine: EngineInterface;
    }
}
declare module "core/modules/Engine/modules/Handlers/Handlers.Models" {
    import { EngineInterface } from "core/modules/Engine/Engine";
    import { Cpu } from "core/modules/Engine/modules/Cpu/Cpu";
    import { GlobalEventInterface, MousePositionInterface, MouseButtonsInterface, MouseInterface, ScreenDimensionsInterface, ScreenInterface, KeyboardInterface, EventInterface } from "core/modules/Engine/modules/Handlers/Handlers.Interfaces";
    export { GlobalEventInterface, MousePositionInterface, MouseButtonsInterface, MouseInterface, ScreenDimensionsInterface, ScreenInterface, KeyboardInterface, EventInterface };
    export class GlobalEvent implements GlobalEventInterface {
        engine: EngineInterface;
        constructor(engine: EngineInterface);
        Initialise(): void;
        Update(): void;
        Resize(): void;
        FrameUpdate(cpuStats: Cpu.CpuInterface): void;
    }
    export namespace Controls {
        class Screen implements ScreenInterface {
            dimensions: ScreenDimensionsInterface;
            UpdateDimensions(engine: EngineInterface): void;
        }
        class Mouse implements MouseInterface {
            position: MousePositionInterface;
            Buttons: MouseButtonsInterface;
            isClicked: boolean;
            get Right(): boolean;
            get Center(): boolean;
            get Left(): boolean;
            UpdatePosition(event: MouseEvent): void;
            UpdateClick(isClicked: boolean, event: MouseEvent): void;
        }
        class Keyboard implements KeyboardInterface {
            keys: any;
            UpdateKey(isPressed: boolean, event: KeyboardEvent): void;
        }
        class Events implements EventInterface {
            Mouse: Mouse;
            Screen: Screen;
            Keyboard: Keyboard;
            Engine: EngineInterface;
            constructor(engine: EngineInterface);
        }
    }
}
declare module "core/modules/Engine/modules/Handlers/Handlers" {
    import * as Handlers from "core/modules/Engine/modules/Handlers/Handlers.Models";
    export { Handlers };
}
declare module "core/modules/Engine/modules/Style/Style.Interfaces" {
    export interface StyleInterface {
        Css(arg: object): string;
        CssSheet(stylesheet: object): string;
        Selector(arg: {
            selector: string;
            style: string;
        }): string;
    }
}
declare module "core/modules/Engine/modules/Style/Style.Models" {
    import { StyleInterface } from "core/modules/Engine/modules/Style/Style.Interfaces";
    export { StyleInterface };
    export const Style: {
        Css(arg: object): string;
        CssSheet(stylesheet: object): string;
        Selector(arg: {
            selector: string;
            style: string;
        }): string;
    };
}
declare module "core/modules/Engine/modules/Style/Style" {
    import * as Style from "core/modules/Engine/modules/Style/Style.Models";
    export { Style };
}
declare module "core/modules/Engine/modules/DataStorage/DataStorage.Interfaces" {
    import { EngineInterface } from "core/modules/Engine/Engine";
    export interface DBError {
        code: number;
        message: string;
    }
    export interface KeyGenInterface {
        Load(storage: any): void;
        Hash32(str: string): string;
        Hash53(str: string, seed: number): string;
        guid(): string;
    }
    export interface CollectionInterface {
        collectionName: string;
        Insert(object: object, callback?: (error: DBError | null, result: object | null) => void): Promise<void>;
        Find(filter: any, callback?: (results: any) => void): Promise<any[]>;
        Update(filter: any, newDocument: any, callback?: (result: any) => void): Promise<unknown>;
        Delete(filter: any, callback?: (result: any) => void): Promise<unknown>;
        Dump(): void;
    }
    export interface DbInterface {
        engine: EngineInterface;
        Collection(collection: string): CollectionInterface;
        CollectionList(): string[];
    }
}
declare module "core/modules/Engine/modules/DataStorage/DataStorage.Models" {
    import { EngineInterface } from "core/modules/Engine/Engine";
    import { DBError, KeyGenInterface, CollectionInterface, DbInterface } from "core/modules/Engine/modules/DataStorage/DataStorage.Interfaces";
    export { DBError, KeyGenInterface, CollectionInterface, DbInterface };
    export class KeyGen implements KeyGenInterface {
        #private;
        Load(storage: any): void;
        Hash32(str: string): string;
        Hash53(str: string, seed?: number): string;
        guid(): string;
    }
    export class Collection implements CollectionInterface {
        #private;
        collectionName: string;
        constructor(storage: any, collection: any);
        Insert(object: object, callback?: (error: DBError | null, result: object | null) => void): Promise<void>;
        Find(filter: any, callback?: (results: any) => void): Promise<any[]>;
        Update(filter: any, newDocument: any, callback?: (result: any) => void): Promise<unknown>;
        Delete(filter: any, callback?: (result: any) => void): Promise<unknown>;
        Dump(): void;
    }
    export class DB implements DbInterface {
        #private;
        engine: EngineInterface;
        constructor(engine: EngineInterface);
        Collection(collection: string): Collection;
        CollectionList(): string[];
    }
}
declare module "core/modules/Engine/modules/DataStorage/DataStorage" {
    import * as DataStorage from "core/modules/Engine/modules/DataStorage/DataStorage.Models";
    export { DataStorage };
}
declare module "core/modules/Engine/Engine.Interfaces" {
    import { UI } from "core/modules/Engine/modules/UI/UI";
    import { Handlers } from "core/modules/Engine/modules/Handlers/Handlers";
    import { Cpu } from "core/modules/Engine/modules/Cpu/Cpu";
    import { Prototype } from "core/modules/Engine/modules/Prototype/Prototype";
    import { Style } from "core/modules/Engine/modules/Style/Style";
    import { DataStorage } from "core/modules/Engine/modules/DataStorage/DataStorage";
    export interface EngineInterface {
        Vue: UI.GlobalUserInterface;
        isMobile: boolean;
        Handlers: Handlers.EventInterface;
        GlobalEvent: Handlers.GlobalEventInterface;
        DataStorage: DataStorage.DbInterface;
        CpuStats: Cpu.CpuInterface;
        Style: Style.StyleInterface;
        app: any;
        component: typeof UI.ElementUI;
        Var(value: any, options?: any): Prototype.Variable<any>;
        View(view: any): EngineInterface;
        Show(): void;
        setGeneralUserInterface(template: UI.TemplateInterface): void;
    }
}
declare module "core/modules/Engine/Engine.Models" {
    import { UI } from "core/modules/Engine/modules/UI/UI";
    import { Handlers } from "core/modules/Engine/modules/Handlers/Handlers";
    import { Cpu } from "core/modules/Engine/modules/Cpu/Cpu";
    import { Prototype } from "core/modules/Engine/modules/Prototype/Prototype";
    import { Style } from "core/modules/Engine/modules/Style/Style";
    import { DataStorage } from "core/modules/Engine/modules/DataStorage/DataStorage";
    import { EngineInterface } from "core/modules/Engine/Engine.Interfaces";
    export { EngineInterface };
    export const Engine: {
        Vue: UI.GlobalUserInterface;
        isMobile: boolean;
        Handlers: Handlers.EventInterface;
        GlobalEvent: Handlers.GlobalEventInterface;
        DataStorage: DataStorage.DbInterface;
        "__#8258@#Cpu": Cpu.CpuInterface;
        CpuStats: Cpu.CpuInterface;
        Style: Style.StyleInterface;
        app: any;
        Var(value: any, options?: any): Prototype.Variable<any>;
        View(view: any): EngineInterface;
        Show(): void;
        setGeneralUserInterface(template: UI.TemplateInterface): void;
        readonly component: typeof UI.ElementUI;
    };
}
declare module "core/modules/Engine/Engine" {
    export { Engine, EngineInterface } from "core/modules/Engine/Engine.Models";
}
declare module "core/modules/Engine/modules/View/View.Interfaces" {
    import { UI } from "core/modules/Engine/modules/UI/UI";
    export interface ViewInterface {
        Main(): UI.TemplateInterface;
    }
}
declare module "core/modules/Engine/modules/View/View.Models" {
    import { UI } from "core/modules/Engine/modules/UI/UI";
    import { ViewInterface } from "core/modules/Engine/modules/View/View.Interfaces";
    export { ViewInterface };
    export class View implements ViewInterface {
        #private;
        constructor(template: UI.TemplateInterface);
        Main(): UI.TemplateInterface;
    }
}
declare module "core/modules/Engine/modules/View/Views" {
    import * as View from "core/modules/Engine/modules/View/View.Models";
    export { View };
}
declare module "core/modules/Engine/modules/Components/Components" {
    import { UI } from "core/modules/Engine/modules/UI/UI";
    export namespace Components {
        class App extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Main extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Nav extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Article extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Section extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Aside extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Text extends UI.ElementUI {
            constructor(arg: any, position?: string);
        }
        class H1 extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Dialog extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Div extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Container extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Form extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Button extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Input extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Textarea extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Select extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Option extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class OptionGroup extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
        class Canvas extends UI.ElementUI {
            constructor(arg: UI.TemplateInterface);
        }
    }
}
declare module "core/Core.Types" {
    export type ThoriumGlobal = Window & typeof globalThis & {
        NaN: never;
        Infinity: never;
    };
}
declare module "core/Core.Interfaces" {
    import { ThoriumGlobal } from "core/Core.Types";
    import { EngineInterface } from "core/modules/Engine/Engine";
    import { UI as UserInterface } from "core/modules/Engine/modules/UI/UI";
    import { Components } from "core/modules/Engine/modules/Components/Components";
    export { ThoriumGlobal };
    export interface ThoriumWindow extends ThoriumGlobal {
        thorium: any;
        Var: (value: any, options?: any) => any;
        Style: () => any;
        DataStorage: () => any;
        View: any;
    }
    export interface ThoriumInterface {
        version: number;
        UI: typeof UserInterface;
        Engine: EngineInterface;
        Components: typeof Components;
        Vue: (view: any) => EngineInterface;
        Show: () => void;
        component: typeof UserInterface.ElementUI;
        app: HTMLElement;
    }
}
declare module "core/Core.Models" {
    import { EngineInterface } from "core/modules/Engine/Engine";
    import { UI as UserInterface } from "core/modules/Engine/modules/UI/UI";
    import { Components as components } from "core/modules/Engine/modules/Components/Components";
    export { ThoriumGlobal, ThoriumWindow, ThoriumInterface } from "core/Core.Interfaces";
    export const Thorium: {
        version: number;
        UI: typeof UserInterface;
        Engine: EngineInterface;
        Components: typeof components;
        readonly Vue: (view: any) => EngineInterface;
        readonly Show: () => void;
        readonly component: typeof UserInterface.ElementUI;
        readonly app: HTMLElement;
    };
}
declare module "core/Core" {
    export { Engine, EngineInterface } from "core/modules/Engine/Engine";
    export { UI as UserInterface } from "core/modules/Engine/modules/UI/UI";
    export * as View from "core/modules/Engine/modules/View/Views";
    export { Components as components } from "core/modules/Engine/modules/Components/Components";
    export { Prototype } from "core/modules/Engine/modules/Prototype/Prototype";
    export { ThoriumGlobal, ThoriumWindow, ThoriumInterface, Thorium } from "core/Core.Models";
}
declare module "index" { }
