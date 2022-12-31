"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = void 0;
exports.Style = new class Style {
    Css(arg) {
        const keys = Object.keys(arg);
        const values = Object.values(arg);
        return Array.from({ length: Object.keys(arg).length }, function (x, i) {
            return `${keys[i]} : ${values[i]};`;
        }).join("");
    }
    CssSheet(stylesheet) {
        const keys = Object.keys(stylesheet);
        const values = Object.values(stylesheet);
        return Array.from({ length: keys.length }, function (x, i) {
            return `${keys[i]}{${values[i]}}`;
        }).join("");
    }
    Selector(arg) {
        return `${arg.selector}{${arg.style}}`;
    }
};
//# sourceMappingURL=Style.Models.js.map