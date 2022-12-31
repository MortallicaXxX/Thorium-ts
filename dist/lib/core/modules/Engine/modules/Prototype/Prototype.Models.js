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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Variable_instances, _Variable_setFreeze, _Variable_setType, _Variable_setGetter, _Variable_setSetter, _Variable_defineProperty;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.__th__ = exports.__th__Listeners = exports.Variable = void 0;
const mutation_1 = require("../Mutations/src/mutation");
class Variable {
    constructor(value, options) {
        _Variable_instances.add(this);
        const _this = this;
        __classPrivateFieldGet(_this, _Variable_instances, "m", _Variable_setFreeze).call(_this);
        __classPrivateFieldGet(_this, _Variable_instances, "m", _Variable_setType).call(_this);
        __classPrivateFieldGet(_this, _Variable_instances, "m", _Variable_setGetter).call(_this);
        __classPrivateFieldGet(_this, _Variable_instances, "m", _Variable_setSetter).call(_this);
        __classPrivateFieldGet(_this, _Variable_instances, "m", _Variable_defineProperty).call(_this, value, options);
    }
}
exports.Variable = Variable;
_Variable_instances = new WeakSet(), _Variable_setFreeze = function _Variable_setFreeze() {
    const _this = this;
    _this.__proto__.freeze = function () {
        return Object.freeze(_this);
    };
}, _Variable_setType = function _Variable_setType() {
    const _this = this;
    _this.__proto__.Type = function (v) {
        if (v == null)
            return null;
        if (typeof v == 'object') {
            if (Array.isArray(v) == true) {
                return "array";
            }
            else {
                if (v.__proto__.constructor.name != "")
                    return v.__proto__.constructor.name;
                else
                    return typeof v;
            }
        }
        else if (!isNaN(Number(v))) {
            if (typeof v == 'boolean')
                return typeof v;
            else
                return typeof Number(0);
        }
        else if (typeof v == 'boolean') {
            return typeof v;
        }
        else
            return typeof String("");
    };
}, _Variable_setGetter = function _Variable_setGetter() {
    const _this = this;
    _this.__defineGetter__('Value', function () {
        return this[`#_value`];
    });
}, _Variable_setSetter = function _Variable_setSetter() {
    const _this = this;
    _this.__defineSetter__('Value', function (x) {
        let define = (_this.Value ? true : false);
        if (!define && _this[`#_writable`] == false)
            _this[`#_value`] = x;
        else if (_this[`#_writable`]) {
            if (_this.Type(x) == _this[`#_dataType`])
                _this[`#_value`] = x;
            else if (!define) {
                _this[`#_value`] = x;
                Object.defineProperty(_this, '#_dataType', {
                    value: _this.Type(x),
                    writable: false
                });
            }
            else
                console.error(`Data type does not match. Value is '${_this.Type(x)}' , '${_this[`#_dataType`]}' is expected.`);
        }
        else
            console.error("Can't set readonly value.");
    });
}, _Variable_defineProperty = function _Variable_defineProperty(value, options) {
    const _this = this;
    Object.defineProperty(_this, '#_value', {
        value: value,
        writable: (value ? options.writable : true)
    });
    Object.defineProperty(_this, '#_dataType', {
        value: _this.Type(value),
        writable: (!_this.Type(value) ? true : false)
    });
    Array.from({ length: Object.keys(options).length }, function (x, i) {
        Object.defineProperty(_this, `#_${Object.keys(options)[i]}`, {
            value: Object.values(options)[i],
            writable: false
        });
    });
};
exports.__th__Listeners = new class __th__Listeners {
    Initialise() {
        return __awaiter(this, void 0, void 0, function* () {
            const t = this;
            const _this = t;
            function InitChildrens(element) {
                return __awaiter(this, void 0, void 0, function* () {
                    for (const e of element.children) {
                        try {
                            yield e.Initialise();
                        }
                        catch (err) { }
                        ;
                    }
                });
            }
            function AfterInitialise(element) {
                return __awaiter(this, void 0, void 0, function* () {
                    if ("AfterInitialise" in element)
                        element.AfterInitialise();
                });
            }
            if (_this.getAttribute('name'))
                _this.parentNode.__defineGetter__(_this.getAttribute('name'), function () { return _this; });
            if ("BeforeInitialise" in _this && !_this.isInitialised)
                yield _this.BeforeInitialise();
            yield InitChildrens(_this);
            if ("AfterInitialise" in _this && !_this.isInitialised)
                yield _this.AfterInitialise();
            _this._initilised.Value = true;
        });
    }
    ;
    remove() {
        const _this = this;
        const t = _this;
        if (t.getAttribute('name'))
            delete t.parentNode[t.getAttribute('name')];
        t.outerHTML = "";
    }
    ;
    Update(message) {
        const _this = this;
        const t = _this;
        if ("onUpdate" in t)
            t.onUpdate(message);
        for (const element of t.children) {
            const e = element;
            if ('update' in e)
                e.update(message);
        }
    }
    ;
    Resize() {
        const _this = this;
        const t = _this;
        if ("onResize" in t)
            t.onResize();
        for (const element of t.children) {
            const e = element;
            if ('Resize' in e)
                e.Resize();
        }
    }
    ;
    Reset() {
        const _this = this;
        const t = _this;
        if ("onReset" in t)
            t.onReset();
        for (const element of t.children) {
            const e = element;
            if ('Reset' in e)
                e.Reset();
        }
    }
    ;
    FrameUpdate(cpuStats) {
        const _this = this;
        const t = _this;
        if ("onFrameUpdate" in t)
            t.onFrameUpdate(cpuStats);
        for (const element of t.children) {
            const e = element;
            if ('FrameUpdate' in e)
                e.FrameUpdate(cpuStats);
        }
    }
    ;
    turnActive() {
        const _this = this;
        if (!_this.th.isActive) {
            _this.classList.add('active');
            _this._active.Value = true;
            if ('onActive' in _this)
                _this.onActive();
        }
        else {
            _this.classList.remove('active');
            _this._active.Value = false;
            if ('onUnActive' in _this)
                _this.onUnActive();
        }
    }
    ;
    radioLike() {
        const _this = this;
        const t = _this;
        t.turnActive();
        for (const element of t.parentNode.children) {
            const e = element;
            if (e.th.isActive && e != t)
                e.turnActive();
        }
    }
};
class __th__ {
    constructor(element, proto) {
        this.context = function (contextName) {
            const findContext = (element) => {
                if (element.parentNode.classList.contains('context')) {
                    if (contextName && element.parentNode.getAttribute('name') == contextName)
                        return element.parentNode;
                    if (contextName && element.parentNode.getAttribute('name') != contextName)
                        return findContext(element.parentNode);
                    else
                        return element.parentNode;
                }
                else if ((element.parentNode.tagName == 'APP'))
                    return element;
                else
                    return findContext(element.parentNode);
            };
            return findContext(this);
        };
        this._e = new Variable(element, { writable: false });
        this._initilised = new Variable(false, { writable: true });
        this._active = new Variable(this.element.classList.contains('active'), { writable: true });
        this._focus = new Variable(false, { writable: true });
        this._clicked = new Variable(false, { writable: true });
        Object.assign(this, proto);
        Object.assign(element, {
            Initialise: exports.__th__Listeners.Initialise,
            remove: exports.__th__Listeners.remove,
            update: exports.__th__Listeners.Update,
            Resize: exports.__th__Listeners.Resize,
            Reset: exports.__th__Listeners.Reset,
            FrameUpdate: exports.__th__Listeners.FrameUpdate,
            turnActive: exports.__th__Listeners.turnActive,
            radioLike: exports.__th__Listeners.radioLike
        });
    }
    get app() {
        const x = window;
        return x.thorium.app;
    }
    get element() { return this._e.Value; }
    ;
    get isInitialised() { return this._initilised.Value; }
    ;
    get isActive() { var _a; return (_a = this._active) === null || _a === void 0 ? void 0 : _a.Value; }
    get isFocus() { var _a; return (_a = this._focus) === null || _a === void 0 ? void 0 : _a.Value; }
    get isMouseDown() { var _a; return (_a = this._clicked) === null || _a === void 0 ? void 0 : _a.Value; }
}
exports.__th__ = __th__;
class Component {
    define_th(element, proto, observables) {
        element.th = new __th__(element, proto);
        for (const key of Object.keys(element.th)) {
            element.__defineGetter__(key, function () { return element.th[key]; });
            element.__defineSetter__(key, function (value) { element.th[key] = value; });
        }
        if (observables)
            element.th.observable = (0, mutation_1.AttributesOberserver)(element, observables, function (event) {
                if ('onMutation' in element)
                    for (const e of event) {
                        element.onMutation(e);
                    }
            });
        const handlers = {
            click: function (e) {
                if ("onClick" in element)
                    element.onClick(e);
            },
            dblclick: function (e) {
                if ("onDblClick" in element)
                    element.onDblClick(e);
            },
            mouseenter: function (e) {
                if ("onMouseEnter" in element)
                    element.onMouseEnter(e);
            },
            mouseleave: function (e) {
                if ("onMouseLeave" in element)
                    element.onMouseLeave(e);
            },
            mousemove: function (e) {
                if ("onMouseMove" in element)
                    element.onMouseMove(e);
            },
            mouseout: function (e) {
                if ("onMouseOut" in element)
                    element.onMouseOut(e);
            },
            mouseover: function (e) {
                if ("onMouseOver" in element)
                    element.onMouseOver(e);
            },
            mouseup: function (e) {
                this._clicked.Value = false;
                if ("onMouseUp" in element)
                    element.onMouseUp(e);
            },
            mousedown: function (e) {
                this._clicked.Value = true;
                if ("onMouseDown" in element)
                    element.onMouseDown(e);
            },
            mousewheel: function (e) {
                if ("onMouseWheel" in element)
                    element.onMouseWheel(e);
            },
            change: function (e) {
                if ("onChange" in element)
                    element.onChange(e);
            },
            focus: function (e) {
                if ("onFocus" in element)
                    element.onFocus(e);
            },
            focusout: function (e) {
                if ("onUnFocus" in element)
                    element.onUnFocus(e);
            },
            dragstart: function (e) {
                if ("onDragStart" in element)
                    element.onDragStart(e);
            },
            dragend: function (e) {
                if ("onDragEnd" in element)
                    element.onDragEnd(e);
            },
            dragover: function (e) {
                if ("onDragOver" in element)
                    element.onDragOver(e);
            },
            dragenter: function (e) {
                if ("onDragEnter" in element)
                    element.onDragEnter(e);
            },
            dragleave: function (e) {
                if ("onDragLeave" in element)
                    element.onDragLeave(e);
            },
            drop: function (e) {
                if ("onDrop" in element)
                    element.onDrop(e);
            },
            submit: function (e) {
                if ('onSubmit' in element)
                    element.onSubmit(e);
            },
            contextmenu: function (e) {
                if ('onContextMenu' in element)
                    element.onContextMenu(e);
            }
        };
        for (const key of Object.keys(handlers)) {
            element.addEventListener(key, handlers[key]);
        }
        return element;
    }
}
exports.Component = Component;
//# sourceMappingURL=Prototype.Models.js.map