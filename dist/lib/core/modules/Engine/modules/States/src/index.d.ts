export declare class State<T> {
    #private;
    get value(): T;
    constructor(value: any);
    get mutator(): [State<T>, ((value: T) => T)];
    addMutationListerner: (referenceElement: HTMLElement, callback: (value: T) => void) => string;
    removeMutationListener: (mutationListerId: string) => boolean;
}
export default function useState<T>(arg: T): [State<T>, (value: T) => T];
