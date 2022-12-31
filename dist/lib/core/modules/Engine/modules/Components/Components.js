"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Components = void 0;
const UI = require("../UI/UI");
var Components;
(function (Components) {
    class App extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'app',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.App = App;
    class Main extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'main',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Main = Main;
    class Nav extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'nav',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Nav = Nav;
    class Article extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'article',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Article = Article;
    class Section extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'section',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Section = Section;
    class Aside extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'aside',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Aside = Aside;
    class Text extends UI.ElementUI {
        constructor(arg, position = "left") {
            if (typeof arg == 'object' && 'position' in arg)
                (function () {
                    position = arg.position;
                    delete arg.position;
                })();
            position = (position.split(' ').length == 1 ?
                (function (p1) {
                    if (p1 == 'top')
                        return 'margin : 0 auto auto auto';
                    if (p1 == 'right')
                        return 'margin : auto 0 auto auto';
                    if (p1 == 'bottom')
                        return 'margin : auto auto 0 auto';
                    if (p1 == 'left')
                        return 'margin : auto auto auto 0';
                    if (p1 == 'center')
                        return 'margin : auto auto auto auto';
                })(position)
                :
                    (position.split(' ')[0] == 'top' ?
                        (function (p2) {
                            if (p2 == 'left')
                                return 'margin : 0 auto auto 0';
                            if (p2 == 'center')
                                return 'margin : 0 auto auto auto';
                            if (p2 == 'right')
                                return 'margin : 0 0 auto auto';
                        })(position.split(' ')[1])
                        :
                            (position.split(' ')[0] == 'right' ?
                                (function (p2) {
                                    if (p2 == 'top')
                                        return 'margin : 0 0 auto 0';
                                    if (p2 == 'center')
                                        return 'margin : auto 0 auto auto';
                                    if (p2 == 'bottom')
                                        return 'margin : auto 0 0 auto';
                                })(position.split(' ')[1])
                                :
                                    (position.split(' ')[0] == 'bottom' ?
                                        (function (p2) {
                                            if (p2 == 'left')
                                                return 'margin : auto auto 0 0';
                                            if (p2 == 'center')
                                                return 'margin : auto auto 0 auto';
                                            if (p2 == 'right')
                                                return 'margin : auto 0 0 auto';
                                        })(position.split(' ')[1])
                                        :
                                            (position.split(' ')[0] == 'left' ?
                                                (function (p2) {
                                                    if (p2 == 'top')
                                                        return 'margin : 0 0 auto 0';
                                                    if (p2 == 'center')
                                                        return 'margin : auto 0 auto auto';
                                                    if (p2 == 'bottom')
                                                        return 'margin : auto 0 0 auto';
                                                })(position.split(' ')[1])
                                                :
                                                    (position.split(' ')[0] == 'center' ?
                                                        (function (p2) {
                                                            if (p2 == 'top')
                                                                return 'margin : 0 auto auto auto';
                                                            if (p2 == 'right')
                                                                return 'margin : auto 0 auto auto';
                                                            if (p2 == 'bottom')
                                                                return 'margin : auto auto 0 auto';
                                                            if (p2 == 'left')
                                                                return 'margin : auto auto auto 0';
                                                        })(position.split(' ')[1])
                                                        :
                                                            null))))));
            super(new UI.Template({
                type: 'p',
                prop: (typeof arg == 'object' ? (function (x) {
                    var obj = { style: position };
                    if ('text' in x)
                        (function (text) {
                            obj.text = text;
                            delete x.text;
                        })(x.text);
                    if ('id' in x)
                        (function (id) {
                            obj.id = id;
                            delete x.id;
                        })(x.id);
                    if ('class' in x)
                        (function (clas) {
                            obj.class = clas;
                            delete x.class;
                        })(x.class);
                    for (const key of Object.keys(arg)) {
                        if (key != "proto")
                            obj[key] = arg[key];
                    }
                    return obj;
                })(arg) :
                    {
                        text: arg,
                        style: position
                    }),
                proto: (arg.proto ? arg.proto : {})
            }));
        }
    }
    Components.Text = Text;
    class H1 extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'h1',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.H1 = H1;
    class Dialog extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'dialog',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Dialog = Dialog;
    class Div extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'div',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Div = Div;
    class Span extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'span',
                prop: (arg.prop ? arg.prop : {}),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Span = Span;
    class Container extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'container',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Container = Container;
    class Form extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'form',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Form = Form;
    class Fieldset extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'fieldset',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Fieldset = Fieldset;
    class Button extends UI.ElementUI {
        constructor(arg) {
            const template = arg;
            super(new UI.Template({
                type: 'button',
                prop: arg.prop,
                childrens: template.childrens,
                proto: arg.proto
            }));
        }
    }
    Components.Button = Button;
    class Input extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'input',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Input = Input;
    class DataList extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'DATALIST',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.DataList = DataList;
    class Output extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'output',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Output = Output;
    class Label extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'label',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Label = Label;
    class Textarea extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'textarea',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Textarea = Textarea;
    class Select extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'select',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Select = Select;
    class Option extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'option',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Option = Option;
    class OptionGroup extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'optgroup',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.OptionGroup = OptionGroup;
    class HTMLObject extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'object',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.HTMLObject = HTMLObject;
    class Iframe extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'iframe',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Iframe = Iframe;
    class Canvas extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'canvas',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Canvas = Canvas;
    class Svg extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'svg',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Svg = Svg;
    class Path extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'path',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Path = Path;
    class Link extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'a',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Link = Link;
    class Ul extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'ul',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Ul = Ul;
    class Li extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'li',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Li = Li;
    class Image extends UI.ElementUI {
        constructor(arg) {
            super(new UI.Template({
                type: 'img',
                prop: (arg.prop ? arg.prop : {}),
                childrens: (arg.childrens ? arg.childrens : []),
                proto: (arg.proto ? arg.proto : null)
            }));
        }
    }
    Components.Image = Image;
})(Components = exports.Components || (exports.Components = {}));
//# sourceMappingURL=Components.js.map