import { Models } from "./Models";

export class View{

  #Template:Models.Template;

  constructor(template:Models.Template){
    this.#Template = template;
  }

  Main():Models.Template{
    return this.#Template;
  }

}
