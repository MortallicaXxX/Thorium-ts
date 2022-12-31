import * as Cpu from "../Cpu/Cpu";
import { VariableInterface, ComponentInterface, __th__ListenersInterface, __th__ as ThInterface, __th__Ghost, HTMLthoriumElement } from './Prototype.Interfaces';
export { VariableInterface, ComponentInterface, __th__ListenersInterface, ThInterface, __th__Ghost, HTMLthoriumElement };
export declare class Variable<T> implements VariableInterface<T> {
    #private;
    Value?: T;
    constructor(value: T, options?: any);
}
export declare const __th__Listeners: {
    Initialise(): Promise<void>;
    remove(): void;
    Update(message: any): void;
    Resize(): void;
    Reset(): void;
    FrameUpdate(cpuStats: Cpu.CpuInterface): void;
    turnActive(): void;
    radioLike(): void;
};
export declare class __th__ implements ThInterface {
    get app(): any;
    _e?: VariableInterface<HTMLthoriumElement>;
    get element(): HTMLthoriumElement;
    _initilised?: VariableInterface<boolean>;
    get isInitialised(): boolean;
    _active?: VariableInterface<boolean>;
    get isActive(): boolean;
    _focus?: VariableInterface<boolean>;
    get isFocus(): boolean;
    _clicked?: VariableInterface<boolean>;
    get isMouseDown(): boolean;
    context: (contextName?: string) => HTMLthoriumElement;
    constructor(element: any, proto: any);
}
export declare class Component implements ComponentInterface {
    define_th(element: any, proto: any, observables?: any): any;
}
