import * as Cpu from '../Cpu/Cpu';
import { Ghost } from './Prototype.Types';
export interface VariableInterface<T> {
    Value?: T;
}
export interface ComponentInterface {
    define_th(element: any, proto: any): void;
}
export interface __th__ListenersInterface {
    Initialise(): void;
    Update(message: any): void;
    Resize(): void;
    Reset(): void;
    FrameUpdate(cpuStats: Cpu.CpuInterface): void;
    turnActive(): void;
    radioLike(): void;
    remove(): void;
}
export interface __th__Ghost extends Ghost {
    observable?: any;
    app?: any;
    element?: HTMLthoriumElement;
    isInitialised?: boolean;
    isActive?: boolean;
    isFocus?: boolean;
    isMouseDown?: boolean;
    context?: (contextName?: string) => HTMLthoriumElement;
    onContextMenu?(e: any): void;
    BeforeInitialise?(): void | Promise<void>;
    AfterInitialise?(): void | Promise<void>;
    onMutation?(mutations: MutationRecord): void;
    onClick?(e: any): void;
    onDblClick?(e: any): void;
    onMouseEnter?(e: any): void;
    onMouseLeave?(e: any): void;
    onMouseMove?(e: any): void;
    onMouseOut?(e: any): void;
    onMouseOver?(e: any): void;
    onMouseUp?(event: any): void;
    onMouseDown?(event: any): void;
    onMouseWheel?(): void;
    onChange?(): void;
    onFocus?(): void;
    onUnFocus?(): void;
    onUpdate?(message: any): void;
    onResize?(): void;
    onReset?(): void;
    onDragStart?(e: any): void;
    onDragStop?(e: any): void;
    onDragOver?(e: any): void;
    onDragEnter?(e: any): void;
    onDragLeave?(e: any): void;
    onDrop?(e: any): void;
    onFrameUpdate?(cpuStats: Cpu.CpuInterface): void;
    onActive?(): void;
    onUnActive?(): void;
}
export interface __th__ {
    observable?: any;
    app?: any;
    _e?: VariableInterface<HTMLthoriumElement>;
    element?: HTMLthoriumElement;
    _initilised?: VariableInterface<boolean>;
    isInitialised?: boolean;
    _active?: VariableInterface<boolean>;
    isActive?: boolean;
    _focus?: VariableInterface<boolean>;
    isFocus?: boolean;
    _clicked?: VariableInterface<boolean>;
    isMouseDown?: boolean;
    context?: (contextName?: string) => HTMLthoriumElement;
    onContextMenu?(e: any): void;
    BeforeInitialise?(): void | Promise<void>;
    AfterInitialise?(): void | Promise<void>;
    onClick?(e: any): void;
    onDblClick?(e: any): void;
    onMouseEnter?(e: any): void;
    onMouseLeave?(e: any): void;
    onMouseMove?(e: any): void;
    onMouseOut?(e: any): void;
    onMouseOver?(e: any): void;
    onMouseUp?(event: any): void;
    onMouseDown?(event: any): void;
    onMouseWheel?(): void;
    onChange?(): void;
    onFocus?(): void;
    onUnFocus?(): void;
    onUpdate?(message: any): void;
    onResize?(): void;
    onReset?(): void;
    onDragStart?(e: any): void;
    onDragStop?(e: any): void;
    onDragOver?(e: any): void;
    onDragEnter?(e: any): void;
    onDragLeave?(e: any): void;
    onDrop?(e: any): void;
    onFrameUpdate?(cpuStats: Cpu.CpuInterface): void;
    onActive?(): void;
    onUnActive?(): void;
}
export interface HTMLthoriumElement extends HTMLElement, __th__, __th__ListenersInterface {
    __th__: __th__;
}
