declare class Mutant {
    id: string;
    observer: MutationObserver;
    node: Element;
    constructor(node: Element, options: MutationObserverInit, onObserve: (mutations?: MutationRecord[]) => void);
}
declare const Mutations: {
    "__#1@#_observers": Map<string, Mutant>;
    readonly observers: IterableIterator<Mutant>;
    readonly mutants: Element[];
    Observe(node: Element, options: MutationObserverInit, onObserve: (mutations?: MutationRecord[]) => void): Mutant;
};
export default Mutations;
export declare function AttributesOberserver(node: Element, attributeFilter: string[], callback: (mutations?: MutationRecord[]) => void): Mutant;
