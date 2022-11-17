export class State<T>{
    #_value:T;
    get value(){return this.#_value;}

    constructor(value){
        this.#_value = value;
    }

    #_update(value){
        this.#_value =value;
        return this.#_value;
    }
    get mutator(){return [this,(value)=>{return this.#_update(value)}]}
}

const states = new class States{

    #_states:Map<number,State<any>> = new Map();
    set<T>(value){
        this.#_states.set(this.#_states.size , new State<T>(value));
        return this.#_states.get(this.#_states.size - 1).mutator;
    }
    get get(){return this.#_states.get}

}()

export default function useState<T>(arg:T):[State<T>,(value:T)=>T]{
    return states.set(arg);
}