"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _State__mutation_callback_stack, _State__value, _State__update, _State__mutationCallback, _States__states, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
class State {
    constructor(value) {
        _State__mutation_callback_stack.set(this, new Map());
        _State__value.set(this, void 0);
        _State__update.set(this, (value) => {
            __classPrivateFieldSet(this, _State__value, value, "f");
            return __classPrivateFieldGet(this, _State__value, "f");
        });
        _State__mutationCallback.set(this, (value) => {
            Array.from([...__classPrivateFieldGet(this, _State__mutation_callback_stack, "f").keys()], (key) => __awaiter(this, void 0, void 0, function* () {
                const option = __classPrivateFieldGet(this, _State__mutation_callback_stack, "f").get(key);
                if (option.target.ownerDocument && option.target.ownerDocument.contains(option.target))
                    option.callback(value);
                else
                    __classPrivateFieldGet(this, _State__mutation_callback_stack, "f").delete(key);
            }));
        });
        this.addMutationListerner = (referenceElement, callback) => {
            if (typeof callback != 'function')
                return null;
            const mutationListerId = crypto.randomUUID();
            __classPrivateFieldGet(this, _State__mutation_callback_stack, "f").set(mutationListerId, {
                get target() { return referenceElement; },
                callback
            });
            return mutationListerId;
        };
        this.removeMutationListener = (mutationListerId) => {
            return (__classPrivateFieldGet(this, _State__mutation_callback_stack, "f").has(mutationListerId) ? __classPrivateFieldGet(this, _State__mutation_callback_stack, "f").delete(mutationListerId) : null);
        };
        __classPrivateFieldSet(this, _State__value, value, "f");
    }
    get value() { return __classPrivateFieldGet(this, _State__value, "f"); }
    get mutator() {
        return [this, (value) => {
                __classPrivateFieldGet(this, _State__mutationCallback, "f").call(this, value);
                return __classPrivateFieldGet(this, _State__update, "f").call(this, value);
            }];
    }
}
exports.State = State;
_State__mutation_callback_stack = new WeakMap(), _State__value = new WeakMap(), _State__update = new WeakMap(), _State__mutationCallback = new WeakMap();
const states = new (_a = class States {
        constructor() {
            _States__states.set(this, new Map());
        }
        set(value) {
            __classPrivateFieldGet(this, _States__states, "f").set(__classPrivateFieldGet(this, _States__states, "f").size, new State(value));
            return __classPrivateFieldGet(this, _States__states, "f").get(__classPrivateFieldGet(this, _States__states, "f").size - 1).mutator;
        }
        get get() { return __classPrivateFieldGet(this, _States__states, "f").get; }
    },
    _States__states = new WeakMap(),
    _a)();
function useState(arg) {
    return states.set(arg);
}
exports.default = useState;
//# sourceMappingURL=index.js.map