import * as UI from "../UI/UI";
import { ViewInterface } from "./View.Interfaces";

export {
  ViewInterface
}

export class View implements ViewInterface{

  #Template:UI.TemplateInterface;

  constructor(template:UI.TemplateInterface){
    this.#Template = template;
  }

  Main():UI.TemplateInterface{
    return this.#Template;
  }

}
