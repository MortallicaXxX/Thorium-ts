import { Template as TemplateInterface, ElementUI as ElementInterface, NodeUI as NodeInterface, GUI as GlobalUserInterface } from "./UI.Interfaces";
export { TemplateInterface, ElementInterface, NodeInterface, GlobalUserInterface };
import { GhostController } from "../../../../Core";
export declare class Template<T> implements TemplateInterface<T> {
    type: string;
    prop: Record<string, string | boolean | number>;
    childrens: NodeInterface | [];
    proto: T;
    constructor(template?: TemplateInterface<T>);
    Main(template: TemplateInterface<T>): void;
}
export declare class ElementUI<T> implements ElementInterface<T> {
    #private;
    get template(): TemplateInterface<T>;
    get type(): string;
    get prop(): Record<string, string | number | boolean>;
    get childrens(): object[] | NodeInterface;
    get proto(): T;
    constructor(template?: TemplateInterface<T>);
    Main(template: TemplateInterface<T>): void;
    CreateElement(parent?: any): HTMLElement | any;
}
export declare class NodeUI implements NodeInterface {
    #private;
    get elements(): GhostController[];
    get Node(): ElementInterface<any>[];
    get Parent(): HTMLElement | null;
    get Root(): any | null;
    constructor(template?: TemplateInterface<any>[] | object[], root?: any, parent?: any);
    Main(template: TemplateInterface<any> | object[], root?: any, parent?: HTMLElement): void;
    BuildIn(parent: any): Promise<NodeUI>;
    Initialise(): void;
    normalize: (template: TemplateInterface<any> | object[]) => Array<ElementInterface<any>> | [
    ];
}
export declare class GUI implements GlobalUserInterface {
    #private;
    get ui(): NodeInterface;
    constructor(template?: TemplateInterface<any>);
    Main(template: TemplateInterface<any>): void;
}
