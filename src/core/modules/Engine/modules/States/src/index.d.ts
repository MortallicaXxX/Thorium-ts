export declare class State {
    #private;
    get value(): any;
    constructor(value: any);
    get mutator(): (this | ((value: any) => any))[];
}
export default function useState<T>(arg: T): [State, (value: T) => T];
