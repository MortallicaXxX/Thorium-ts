import { StyleInterface } from "./Style.Interfaces";

export {StyleInterface};

export const Style = new class Style implements StyleInterface {

  Css(arg:object):string{
    const keys = Object.keys(arg);
    const values = Object.values(arg);
    return Array.from({length : Object.keys(arg).length} , function(x:null,i:number):string{
      return `${keys[i]} : ${values[i]};`;
    }).join("");
  }

  CssSheet(stylesheet:object):string{
    const keys = Object.keys(stylesheet)
    const values = Object.values(stylesheet)
    return Array.from({length : keys.length} , function(x:string,i:number){
      return `${keys[i]}{${values[i]}}`;
    }).join("");

  }

  Selector(arg:{selector:string,style:string}):string{
    return `${arg.selector}{${arg.style}}`
  }

}
