"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controls = exports.GlobalEvent = void 0;
class GlobalEvent {
    constructor(engine) {
        this.engine = engine;
    }
    Initialise() {
        this.engine.app.Initialise();
    }
    Update() {
        this.engine.app.Update();
    }
    Resize(event) {
        this.engine.app.Resize(event);
    }
    FrameUpdate(cpuStats) {
        this.engine.CpuStats = cpuStats;
        try {
            this.engine.app.FrameUpdate(cpuStats);
        }
        catch (err) {
        }
    }
}
exports.GlobalEvent = GlobalEvent;
var Controls;
(function (Controls) {
    class Screen {
        constructor() {
            this.dimensions = { width: window.innerWidth, height: window.innerHeight };
        }
        UpdateDimensions(engine) {
            if (!engine.isMobile) {
                this.dimensions = { width: window.innerWidth, height: window.innerHeight };
                document.body.style.setProperty('--thorium-default-height', window.innerHeight + 'px');
                document.body.style.setProperty('--thorium-default-width', window.innerWidth + 'px');
            }
        }
    }
    Controls.Screen = Screen;
    class Mouse {
        constructor() {
            this.Buttons = { left: false, center: false, right: false };
            this.isClicked = false;
        }
        get Right() { return this.Buttons.right; }
        get Center() { return this.Buttons.center; }
        get Left() { return this.Buttons.left; }
        UpdatePosition(event) {
            this.position = { x: event.x, y: event.y };
        }
        UpdateClick(isClicked, event) {
            this.isClicked = isClicked;
            this.Buttons[Object.keys(this.Buttons)[event.button]] = isClicked;
        }
    }
    Controls.Mouse = Mouse;
    class Keyboard {
        constructor() {
            this.keys = {};
        }
        UpdateKey(isPressed, event) {
            if (event.key.toUpperCase() in this.keys == false)
                this.keys[event.key.toUpperCase()] = {
                    code: event.keyCode,
                    key: event.key,
                    KEY: event.key.toUpperCase(),
                    isPressed: isPressed
                };
            if (this.keys[event.key.toUpperCase()].isPressed != isPressed)
                this.keys[event.key.toUpperCase()].isPressed = isPressed;
        }
    }
    Controls.Keyboard = Keyboard;
    class Events {
        constructor(engine) {
            this.Mouse = new Mouse();
            this.Screen = new Screen();
            this.Keyboard = new Keyboard();
            this.Listeners = {};
            this.Engine = engine;
            document.body.style.setProperty('--thorium-default-height', window.innerHeight + 'px');
            document.body.style.setProperty('--thorium-default-width', window.innerWidth + 'px');
            window.addEventListener("resize", (event) => {
                var _a;
                this.Screen.UpdateDimensions(engine);
                this.Engine.GlobalEvent.Resize();
                if (this.Listeners.resize)
                    Array.from((_a = this.Listeners.resize) === null || _a === void 0 ? void 0 : _a.values(), (callback) => { return callback(event); });
            });
            window.addEventListener("keydown", (event) => {
                var _a;
                this.Keyboard.UpdateKey(true, event);
                if (this.Listeners.keydown)
                    Array.from((_a = this.Listeners.keydown) === null || _a === void 0 ? void 0 : _a.values(), (callback) => { return callback(event); });
            });
            window.addEventListener("keyup", (event) => {
                var _a;
                this.Keyboard.UpdateKey(false, event);
                if (this.Listeners.keyup)
                    Array.from((_a = this.Listeners.keyup) === null || _a === void 0 ? void 0 : _a.values(), (callback) => { return callback(event); });
            });
            window.addEventListener("mousemove", (event) => {
                var _a;
                this.Mouse.UpdatePosition(event);
                if (this.Listeners.mousemove)
                    Array.from((_a = this.Listeners.mousemove) === null || _a === void 0 ? void 0 : _a.values(), (callback) => { return callback(event); });
            });
            window.addEventListener("mousedown", (event) => {
                var _a;
                this.Mouse.UpdateClick(true, event);
                if (this.Listeners.mousedown)
                    Array.from((_a = this.Listeners.mousedown) === null || _a === void 0 ? void 0 : _a.values(), (callback) => { return callback(event); });
            });
            window.addEventListener("mouseup", (event) => {
                var _a;
                this.Mouse.UpdateClick(false, event);
                if (this.Listeners.mouseup)
                    Array.from((_a = this.Listeners.mouseup) === null || _a === void 0 ? void 0 : _a.values(), (callback) => { return callback(event); });
            });
        }
        Add(eventLabel, callback) {
            const eventId = crypto.randomUUID();
            if (!this.Listeners[eventLabel])
                this.Listeners[eventLabel] = new Map();
            this.Listeners[eventLabel].set(eventId, callback);
            return eventId;
        }
        Remove(eventId) {
            Array.from(Object.keys(this.Listeners), (key) => {
                if (this.Listeners[key].has(eventId))
                    this.Listeners[key].delete(eventId);
            });
        }
    }
    Controls.Events = Events;
})(Controls = exports.Controls || (exports.Controls = {}));
//# sourceMappingURL=Handlers.Models.js.map