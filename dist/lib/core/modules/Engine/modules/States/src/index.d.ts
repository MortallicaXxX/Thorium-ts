export declare class State<T> {
    #private;
    get value(): T;
    constructor(value: any);
    get mutator(): (this | ((value: any) => T))[];
}
export default function useState<T>(arg: T): [State<T>, (value: T) => T];
