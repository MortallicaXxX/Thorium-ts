"use strict";
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
var _State_instances, _State__value, _State__update, _States__states, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
class State {
    constructor(value) {
        _State_instances.add(this);
        _State__value.set(this, void 0);
        __classPrivateFieldSet(this, _State__value, value, "f");
    }
    get value() { return __classPrivateFieldGet(this, _State__value, "f"); }
    get mutator() { return [this, (value) => { return __classPrivateFieldGet(this, _State_instances, "m", _State__update).call(this, value); }]; }
}
exports.State = State;
_State__value = new WeakMap(), _State_instances = new WeakSet(), _State__update = function _State__update(value) {
    __classPrivateFieldSet(this, _State__value, value, "f");
    return __classPrivateFieldGet(this, _State__value, "f");
};
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