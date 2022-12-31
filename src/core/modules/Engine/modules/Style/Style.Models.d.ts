import { StyleInterface } from "./Style.Interfaces";
export { StyleInterface };
export declare const Style: {
    Css(arg: object): string;
    CssSheet(stylesheet: object): string;
    Selector(arg: {
        selector: string;
        style: string;
    }): string;
};
