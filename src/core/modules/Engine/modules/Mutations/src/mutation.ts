class Mutant{

    id:string=crypto.randomUUID();
    observer:MutationObserver;
    node:Element;

    constructor(node:Element , options:MutationObserverInit , onObserve:(mutations?:MutationRecord[])=>void){
        this.observer = new MutationObserver(onObserve);
        this.observer.observe(node,options);
    }
}

const Mutations = new class Mutations{

    // get iswatching(){return (this.#_observer ? true : false)}

    #_observers:Map<string,Mutant> = new Map();
    get observers(){return this.#_observers.values()};
    get mutants(){return Array.from(this.observers , (x,i) => {
        return x.node;
    }).filter((x,i) => x)}

    Observe(node:Element , options:MutationObserverInit , onObserve:(mutations?:MutationRecord[])=>void){
        if(!Object.values(options).includes(true))return null;
        const mutant = new Mutant(node,{
            childList:false,
            attributes:false,
            characterData:false,
            subtree:false,
            attributeOldValue:false,
            characterDataOldValue:false,
            attributeFilter:[],
            ...options,
        },onObserve);
        this.#_observers.set(mutant.id,mutant);
        return mutant;
    }

}();

export default Mutations;

export function AttributesOberserver(node:Element , attributeFilter:string[] , callback:(mutations?:MutationRecord[])=>void){
    return Mutations.Observe(node,{attributes : true , attributeFilter : attributeFilter} , callback)
}