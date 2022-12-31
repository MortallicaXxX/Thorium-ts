import { GhostController } from "../../../../Core";

export interface Template<T>{
  type?:string;
  prop?:Record<string,string|boolean|number>;
  childrens?:NodeUI|object[];
  proto?:T;
  Main?(template:{type:string,prop?:Record<string,string|boolean|number>|null,childrens?:NodeUI|object[],proto?:T}):void;
}

export interface ElementUI<T>{
  template?:Template<T>;
  type?:string;
  prop?:Record<string,string|boolean|number>;
  childrens?:any;
  proto?:T;
  Main?(template:Template<T>):void;
  CreateElement?(parent?:any):HTMLElement|any;
}

export interface NodeUI{
  Node:ElementUI<any>[];
  Parent:HTMLElement|null;
  Root:any|null;
  elements:GhostController[];
  Main(template:Template<any>|object[] , root?:any , parent?:HTMLElement):void;
  BuildIn(parent:any):Promise<NodeUI>;
  Initialise:()=>void;
  normalize(template:Template<any>|object[]):Array<ElementUI<any>>|[];
}

export interface GUI{
  ui:NodeUI;
  Main(template:Template<any>):void;
}
