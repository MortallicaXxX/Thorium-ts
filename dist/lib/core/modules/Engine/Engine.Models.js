"use strict";
var _Engine_Cpu, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const UI = require("./modules/UI/UI");
const Handlers = require("./modules/Handlers/Handlers");
const Cpu = require("./modules/Cpu/Cpu");
const Prototype = require("./modules/Prototype/Prototype");
const Style = require("./modules/Style/Style");
const DataStorage = require("./modules/DataStorage/DataStorage");
exports.Engine = new (_a = class Engine {
        constructor() {
            this.Vue = new UI.GUI;
            this.isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/) ? true : false);
            this.Handlers = new Handlers.Controls.Events(this);
            this.GlobalEvent = new Handlers.GlobalEvent(this);
            this.DataStorage = new DataStorage.DB(this);
            _Engine_Cpu.set(this, new Cpu.Cpu(this));
            this.Style = Style.Style;
        }
        Var(value, options) {
            if (!options)
                options = {};
            if ("writable" in options == false)
                options.writable = true;
            return new Prototype.Variable(value, options);
        }
        View(view) {
            this.setGeneralUserInterface((new view()).Main());
            return this;
        }
        Show() {
            const thorium = window.thorium;
            console.log("Show");
            console.log(thorium.Engine.Vue.ui);
            thorium.Engine.Vue.ui.BuildIn(document.body)
                .then(function (node) {
                console.log(node);
                thorium.Engine.app = node.elements[0];
                console.log(thorium.Engine.app);
                node.Initialise();
            });
        }
        setGeneralUserInterface(template) {
            console.log("setGeneralUserInterface", template);
            this.Vue = new UI.GUI(template);
        }
        get component() { return UI.ElementUI; }
    },
    _Engine_Cpu = new WeakMap(),
    _a);
//# sourceMappingURL=Engine.Models.js.map