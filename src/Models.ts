import { UI } from "./UI";
import { Mobile as mobile } from "./Mobile";
import { Engine } from "./Engine";

/**
* @Title ThoriumJS.Template
* @Desc Représente le template d'un élément DOM
*/

export namespace Models{

  export interface cpu{
    engine:Engine;
    cpuInterval:number;
    startTime:number;
    lastTime:number;
    lastmicroTime:number;
    elapsedTime:number;
    fps:number;
  }
  export interface MousePosition{
    x:number,
    y:number
  }
  export interface ScreenDimensions{
    height:number,
    width:number
  }

  export namespace Mobile{
    export interface App{
      header?:mobile.Header;
      menu?:mobile.Menu;
      body?:ObjectConstructor;
      widgets?:{top?:[],right?:[],bottom?:[],left?:[]};
      proto?:object,
      installation?:boolean
    }
    export interface Menu{
      button?:[];
    }
    export interface MenuIcon{
      svg:string;
      prop?:object;
      proto?:object;
    }
    export interface Body{
      childrens:object[];
      buttons:ClassDecorator[];
    }
    export interface Widget extends Body{
      position?:string;
    }
  }

  export namespace Animations{

    export interface Push{
      element:HTMLElement;
      pushTime:number;
      delay:number;
    }

  }

  export interface Props{
    id?:string;
    class?:string;
    text?:string;
    value?:string;
  }

  export interface Proto{
    onInitialise:()=>void;
    onMouseDown:()=>void;
  }

  /**
  * @Title ThoriumJS.Template
  * @Desc Représente le template d'un élément DOM
  */
  export class Template{

    type:string = "";
    prop:object = {};
    childrens:UI.NodeUI = new UI.NodeUI;
    proto:object = {};

    constructor(template?:{type:string,prop?:object|null,childrens?:UI.NodeUI|object[],proto?:object|null}){
      if(template)this.Main(template);
    }

    Main(template:{type:string,prop?:object|null,childrens?:UI.NodeUI|object[],proto?:object|null}){
      this.type = template.type;
      if(template.prop)this.prop = template.prop;
      if(template.childrens)this.childrens = (Array.isArray(template.childrens)? new UI.NodeUI(template.childrens) : template.childrens)
      if(template.proto)this.proto = template.proto;
    }

  }

  export namespace HTML{

    // /**
    // * @{Title} Models.HTML.Default
    // * @{Desc} ElementHtml de base ThoriumJS
    // * @{Doc} https://developer.mozilla.org/fr/docs/Web/API
    // */
    // export namespace Default{
    //
    //   /**
    //   * @{Title} Models.HTML.Default.ThoriumElement
    //   * @{Desc} Component de base ThoriumJS
    //   */
    //   export class ThoriumElement extends HTMLElement{
    //
    //     constructor(){
    //       super();
    //     }
    //
    //     th:object = {};
    //   }
    //
    //   /**
    //   * @{Title} Models.HTML.Default.ThoriumElement
    //   * @{Desc} Element permetant de rester dynamique en fonctionde son contenu
    //   */
    //   export class ThoriumAnchor extends HTMLAnchorElement{
    //     constructor(){super()}
    //   }
    //
    //   class * extends HTMLAreaElement{
    //
    //   }
    //
    //   class * extends HTMLAudioElement{
    //
    //   }
    //
    //   class * extends HTMLBaseElement{
    //
    //   }
    //
    //   class * extends HTMLBodyElement{
    //
    //   }
    //
    //   class * extends HTMLBRElement{
    //
    //   }
    //
    //   class * extends HTMLButtonElement{
    //
    //   }
    //
    //   class * extends HTMLCanvasElement{
    //
    //   }
    //
    //   class * extends HTMLCollection{
    //
    //   }
    //
    //   class * extends HTMLDataElement{
    //
    //   }
    //
    //   class * extends HTMLDataListElement{
    //
    //   }
    //
    //   class * extends HTMLDetailsElement{
    //
    //   }
    //
    //   class * extends HTMLDialogElement{
    //
    //   }
    //
    //   class * extends HTMLDivElement{
    //
    //   }
    //
    //   class * extends HTMLDListElement{
    //
    //   }
    //
    //   class * extends HTMLDocument{
    //
    //   }
    //
    //   class * extends HTMLEmbedElement{
    //
    //   }
    //
    //   class * extends HTMLFieldSetElement{
    //
    //   }
    //
    //   class * extends HTMLFormControlsCollection{
    //
    //   }
    //
    //   class * extends HTMLFormElement{
    //
    //   }
    //
    //   class * extends HTMLHeadElement{
    //
    //   }
    //
    //   class * extends HTMLHeadingElement{
    //
    //   }
    //
    //   class * extends HTMLHRElement{
    //
    //   }
    //
    //   class * extends HTMLHtmlElement{
    //
    //   }
    //
    //   class * extends HTMLIFrameElement{
    //
    //   }
    //
    //   class * extends HTMLImageElement{
    //
    //   }
    //
    //   class * extends HTMLInputElement{
    //
    //   }
    //
    //   class * extends HTMLLabelElement{
    //
    //   }
    //
    //   class * extends HTMLLegendElement{
    //
    //   }
    //
    //   class * extends HTMLLIElement{
    //
    //   }
    //
    //   class * extends HTMLLinkElement{
    //
    //   }
    //
    //   class * extends HTMLMapElement{
    //
    //   }
    //
    //   class * extends HTMLMediaElement{
    //
    //   }
    //
    //   class * extends HTMLMenuElement{
    //
    //   }
    //
    //   class * extends HTMLMetaElement{
    //
    //   }
    //
    //   class * extends HTMLMeterElement{
    //
    //   }
    //
    //   class * extends HTMLModElement{
    //
    //   }
    //
    //   class * extends HTMLObjectElement{
    //
    //   }
    //
    //   class * extends HTMLOListElement{
    //
    //   }
    //
    //   class * extends HTMLOptGroupElement{
    //
    //   }
    //
    //   class * extends HTMLOptionElement{
    //
    //   }
    //
    //   class * extends HTMLOptionsCollection{
    //
    //   }
    //
    //   class * extends HTMLOutputElement{
    //
    //   }
    //
    //   class * extends HTMLParagraphElement{
    //
    //   }
    //
    //   class * extends HTMLParamElement{
    //
    //   }
    //
    //   class * extends HTMLPictureElement{
    //
    //   }
    //
    //   class * extends HTMLPreElement{
    //
    //   }
    //
    //   class * extends HTMLProgressElement{
    //
    //   }
    //
    //   class * extends HTMLQuoteElement{
    //
    //   }
    //
    //   class * extends HTMLScriptElement{
    //
    //   }
    //
    //   class * extends HTMLSelectElement{
    //
    //   }
    //
    //   class * extends HTMLSlotElement{
    //
    //   }
    //
    //   class * extends HTMLSourceElement{
    //
    //   }
    //
    //   class * extends HTMLSpanElement{
    //
    //   }
    //
    //   class * extends HTMLStyleElement{
    //
    //   }
    //
    //   class * extends HTMLTableCaptionElement{
    //
    //   }
    //
    //   class * extends HTMLTableCellElement{
    //
    //   }
    //
    //   class * extends HTMLTableColElement{
    //
    //   }
    //
    //   class * extends HTMLTableElement{
    //
    //   }
    //
    //   class * extends HTMLTableRowElement{
    //
    //   }
    //
    //   class * extends HTMLTableSectionElement{
    //
    //   }
    //
    //   class * extends HTMLTemplateElement{
    //
    //   }
    //
    //   class * extends HTMLTextAreaElement{
    //
    //   }
    //
    //   class * extends HTMLTimeElement{
    //
    //   }
    //
    //   class * extends HTMLTitleElement{
    //
    //   }
    //
    //   class * extends HTMLTrackElement{
    //
    //   }
    //
    //   class * extends HTMLUListElement{
    //
    //   }
    //
    //   class * extends HTMLVideoElement{
    //
    //   }
    //
    // }
    //
    // export namespace Thorium{
    //
    //   interface Text extends Default.ThoriumElement{
    //
    //   }
    //
    //   interface Felx extends Default.ThoriumAnchor{
    //
    //   }
    //
    // }

  }

}
