export interface Template{
  type:string;
  prop:object;
  childrens:NodeUI;
  proto:object;
  Main(template:{type:string,prop?:object|null,childrens?:NodeUI|object[],proto?:object|null}):void;
}

export interface ElementUI{
  template:Template;
  type:string;
  prop:object;
  childrens:any;
  proto:object;
  Main(template:Template):void;
  CreateElement(parent?:any):HTMLElement|any;
}

export interface NodeUI{
  Node:ElementUI[];
  Parent:HTMLElement|null;
  Root:any|null;
  Main(template:Template|object[] , root?:any , parent?:HTMLElement):void;
  BuildIn(parent:any):Promise<void>;
  normalize(template:Template|object[]):Array<ElementUI>|[];
}

export interface GUI{
  ui:NodeUI;
  Main(template:Template):void;
}
