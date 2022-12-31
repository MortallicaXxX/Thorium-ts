export interface StyleInterface {
    Css(arg: object): string;
    CssSheet(stylesheet: object): string;
    Selector(arg: {
        selector: string;
        style: string;
    }): string;
}
