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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ElementUI_template, _NodeUI_node, _NodeUI_Elements, _NodeUI_parent, _NodeUI_root, _GUI_ui;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUI = exports.NodeUI = exports.ElementUI = exports.Template = void 0;
const Prototype = require("../Prototype/Prototype");
class Template {
    constructor(template) {
        this.type = "";
        this.prop = {};
        this.childrens = new NodeUI;
        if (template)
            this.Main(template);
    }
    Main(template) {
        if (template.type)
            this.type = template.type;
        if (template.prop)
            this.prop = template.prop;
        if (template.childrens)
            this.childrens = (Array.isArray(template.childrens) ? new NodeUI(template.childrens) : template.childrens);
        if (template.proto)
            this.proto = template.proto;
    }
}
exports.Template = Template;
class ElementUI {
    constructor(template) {
        _ElementUI_template.set(this, new Template);
        if (template)
            this.Main(template);
    }
    get template() { return __classPrivateFieldGet(this, _ElementUI_template, "f"); }
    get type() { return __classPrivateFieldGet(this, _ElementUI_template, "f").type; }
    get prop() { return __classPrivateFieldGet(this, _ElementUI_template, "f").prop; }
    get childrens() { return __classPrivateFieldGet(this, _ElementUI_template, "f").childrens; }
    get proto() { return __classPrivateFieldGet(this, _ElementUI_template, "f").proto; }
    Main(template) {
        __classPrivateFieldSet(this, _ElementUI_template, new Template(template), "f");
    }
    CreateElement(parent) {
        const children = document.createElement(this.type);
        const observableAttributes = [];
        if (this.prop)
            for (const attributeKey of Object.keys(this.prop)) {
                const attribute = String(this.prop[attributeKey]);
                const isObservable = attributeKey.includes(':') ? true : false;
                const decodeAttributeObservable = function (attribute) { return attribute.split(':').filter((x, i) => x).join(''); };
                if (isObservable)
                    observableAttributes.push(decodeAttributeObservable(attributeKey));
                if (attributeKey == "text") {
                    children.innerHTML = attribute;
                }
                else if (attributeKey == "parentStyleSheet") {
                    var stylesheet = document.createElement('style');
                    stylesheet.type = 'text/css';
                    stylesheet.innerHTML = attribute;
                    if (parent)
                        parent.appendChild(stylesheet);
                    else
                        children.appendChild(stylesheet);
                }
                else if (attributeKey == "selfStyleSheet") {
                    var stylesheet = document.createElement('style');
                    stylesheet.type = 'text/css';
                    stylesheet.innerHTML = attribute;
                    children.appendChild(stylesheet);
                }
                else {
                    children.setAttribute((isObservable ? decodeAttributeObservable(attributeKey) : attributeKey), attribute);
                }
            }
        ;
        const component = (new Prototype.Component).define_th(children, this.proto, (observableAttributes.length > 0 ? observableAttributes : null));
        return component;
    }
}
exports.ElementUI = ElementUI;
_ElementUI_template = new WeakMap();
class NodeUI {
    constructor(template, root, parent) {
        _NodeUI_node.set(this, []);
        _NodeUI_Elements.set(this, []);
        _NodeUI_parent.set(this, null);
        _NodeUI_root.set(this, null);
        this.normalize = function (template) {
            if (template && typeof template == 'object' && !Array.isArray(template))
                template = [template];
            if (template && Array.isArray(template))
                return Array.from(template, function (x, i) {
                    if (x.__proto__.constructor.name == "Object")
                        return new ElementUI(x);
                    else
                        return x;
                });
            else
                return [];
        };
        if (template)
            this.Main(template, root, parent);
    }
    get elements() { return __classPrivateFieldGet(this, _NodeUI_Elements, "f"); }
    ;
    get Node() { return __classPrivateFieldGet(this, _NodeUI_node, "f"); }
    get Parent() { return __classPrivateFieldGet(this, _NodeUI_parent, "f"); }
    get Root() { return __classPrivateFieldGet(this, _NodeUI_root, "f"); }
    Main(template, root, parent) {
        if (root)
            __classPrivateFieldSet(this, _NodeUI_root, root, "f");
        if (parent)
            __classPrivateFieldSet(this, _NodeUI_parent, parent, "f");
        __classPrivateFieldSet(this, _NodeUI_node, this.normalize(template), "f");
    }
    BuildIn(parent) {
        const _this = this;
        function generate(i = 0) {
            return new Promise(function (next) {
                var _a;
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (_this.Node.length == 0)
                            throw { code: 1, message: "Pas d'enfants" };
                        const children = _this.Node[i].CreateElement(parent);
                        parent.appendChild(children);
                        if (_this.Node[i].childrens != null) {
                            (_a = _this.Node[i].childrens) === null || _a === void 0 ? void 0 : _a.BuildIn(children).then(function () {
                                return __awaiter(this, void 0, void 0, function* () {
                                    if (i == _this.Node.length - 1)
                                        next(children);
                                    else
                                        next(yield generate(i + 1));
                                });
                            });
                        }
                        else {
                            if (i == _this.Node.length - 1)
                                next(children);
                            else
                                next(yield generate(i + 1));
                        }
                    }
                    catch (err) {
                        if (err.code == 1)
                            next(parent);
                    }
                });
            });
        }
        return new Promise((buildResolve) => {
            Promise.all(Array.from(this.Node, (node, iterator) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
                    const element = node.CreateElement(parent);
                    __classPrivateFieldGet(this, _NodeUI_Elements, "f").push(element);
                    parent.appendChild(element);
                    if (node.childrens)
                        yield node.childrens.BuildIn(element);
                    next(element);
                }));
            }))).then(() => {
                buildResolve(this);
            });
        });
    }
    Initialise() {
        for (const e of __classPrivateFieldGet(this, _NodeUI_Elements, "f")) {
            e.Initialise();
        }
    }
}
exports.NodeUI = NodeUI;
_NodeUI_node = new WeakMap(), _NodeUI_Elements = new WeakMap(), _NodeUI_parent = new WeakMap(), _NodeUI_root = new WeakMap();
class GUI {
    constructor(template) {
        _GUI_ui.set(this, new NodeUI());
        if (template)
            this.Main(template);
    }
    get ui() { return __classPrivateFieldGet(this, _GUI_ui, "f"); }
    Main(template) {
        __classPrivateFieldSet(this, _GUI_ui, new NodeUI([template]), "f");
    }
}
exports.GUI = GUI;
_GUI_ui = new WeakMap();
//# sourceMappingURL=UI.Models.js.map