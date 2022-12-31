"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mutations__observers, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributesOberserver = void 0;
class Mutant {
    constructor(node, options, onObserve) {
        this.id = crypto.randomUUID();
        this.observer = new MutationObserver(onObserve);
        this.observer.observe(node, options);
    }
}
const Mutations = new (_a = class Mutations {
        constructor() {
            _Mutations__observers.set(this, new Map());
        }
        get observers() { return __classPrivateFieldGet(this, _Mutations__observers, "f").values(); }
        ;
        get mutants() {
            return Array.from(this.observers, (x, i) => {
                return x.node;
            }).filter((x, i) => x);
        }
        Observe(node, options, onObserve) {
            if (!Object.values(options).includes(true))
                return null;
            const mutant = new Mutant(node, Object.assign({ childList: false, attributes: false, characterData: false, subtree: false, attributeOldValue: false, characterDataOldValue: false, attributeFilter: [] }, options), onObserve);
            __classPrivateFieldGet(this, _Mutations__observers, "f").set(mutant.id, mutant);
            return mutant;
        }
    },
    _Mutations__observers = new WeakMap(),
    _a)();
exports.default = Mutations;
function AttributesOberserver(node, attributeFilter, callback) {
    return Mutations.Observe(node, { attributes: true, attributeFilter: attributeFilter }, callback);
}
exports.AttributesOberserver = AttributesOberserver;
//# sourceMappingURL=mutation.js.map