import * as UI from "../UI/UI";
import { ViewInterface } from "./View.Interfaces";

export {
  ViewInterface
}

export class View implements ViewInterface{

  #Template:UI.TemplateInterface<any>;

  constructor(template:UI.TemplateInterface<any>){
    this.#Template = template;
  }

  Main():UI.TemplateInterface<any>{
    return this.#Template;
  }

}
