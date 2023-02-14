export class State<T>{
    #_mutation_callback_stack:Map<string,{
        target:HTMLElement;
        callback:(value:T) => void;
    }> = new Map();
    #_value:T;
    get value(){return this.#_value;}

    constructor(value){
        this.#_value = value;
    }

    #_update = (value) => {
        this.#_value = value;
        return this.#_value;
    }

    get mutator(){return [this,(value)=>{
        this.#_mutationCallback(value);
        return this.#_update(value);
    }]}

    #_mutationCallback = (value:T) => {
        Array.from( [...this.#_mutation_callback_stack.keys()] , async (key) => {
            const option = this.#_mutation_callback_stack.get(key);
            if(option.target.ownerDocument && option.target.ownerDocument.contains(option.target))option.callback(value);
            else this.#_mutation_callback_stack.delete(key);
        } )
    } 

    addMutationListerner = (referenceElement:HTMLElement , callback:(value:T) => void):string => {
        if(typeof callback != 'function')return null;
        const mutationListerId = crypto.randomUUID();
        this.#_mutation_callback_stack.set(mutationListerId , {
            get target(){return referenceElement},
            callback
        });
        return mutationListerId;
    }

    removeMutationListener = (mutationListerId:string) => {
        return ( this.#_mutation_callback_stack.has(mutationListerId) ? this.#_mutation_callback_stack.delete(mutationListerId) : null )
    }
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