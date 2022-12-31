"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = exports.State = exports.useState = exports.DataStorage = exports.Style = exports.Components = exports.Cpu = exports.View = exports.Prototype = exports.UserInterface = exports.Keyboard = exports.Screen = exports.Mouse = exports.Events = exports.Handlers = exports.Engine = void 0;
var Core_1 = require("./core/Core");
Object.defineProperty(exports, "Engine", { enumerable: true, get: function () { return Core_1.Engine; } });
Object.defineProperty(exports, "Handlers", { enumerable: true, get: function () { return Core_1.Handlers; } });
Object.defineProperty(exports, "Events", { enumerable: true, get: function () { return Core_1.Events; } });
Object.defineProperty(exports, "Mouse", { enumerable: true, get: function () { return Core_1.Mouse; } });
Object.defineProperty(exports, "Screen", { enumerable: true, get: function () { return Core_1.Screen; } });
Object.defineProperty(exports, "Keyboard", { enumerable: true, get: function () { return Core_1.Keyboard; } });
Object.defineProperty(exports, "UserInterface", { enumerable: true, get: function () { return Core_1.UserInterface; } });
Object.defineProperty(exports, "Prototype", { enumerable: true, get: function () { return Core_1.Prototype; } });
Object.defineProperty(exports, "View", { enumerable: true, get: function () { return Core_1.View; } });
Object.defineProperty(exports, "Cpu", { enumerable: true, get: function () { return Core_1.Cpu; } });
Object.defineProperty(exports, "Components", { enumerable: true, get: function () { return Core_1.Components; } });
Object.defineProperty(exports, "Style", { enumerable: true, get: function () { return Core_1.Style; } });
Object.defineProperty(exports, "DataStorage", { enumerable: true, get: function () { return Core_1.DataStorage; } });
Object.defineProperty(exports, "useState", { enumerable: true, get: function () { return Core_1.useState; } });
Object.defineProperty(exports, "State", { enumerable: true, get: function () { return Core_1.State; } });
const Core_2 = require("./core/Core");
exports.Variable = Core_2.Thorium.Var;
exports.default = Core_2.Thorium;
//# sourceMappingURL=index.js.map