import * as UI from "../UI/UI";
import { ViewInterface } from "./View.Interfaces";
export { ViewInterface };
export declare class View implements ViewInterface {
    #private;
    constructor(template: UI.TemplateInterface<any>);
    Main(): UI.TemplateInterface<any>;
}
