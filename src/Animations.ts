import { Models } from "./Models";

export namespace Animations{

  export class PushRelease{
    delay:number;
    element:HTMLElement;
    isPush:boolean = false;
    pushTime:number = 0;
    constructor(delay:number){
      this.delay = delay;
    }
    setAnimation(arg:Models.Animations.Push){
      this.isPush = true;
      this.element = arg.element;
      this.pushTime = arg.pushTime;
      this.#start();
    }
    Animate(timeStamp:number){
      if(timeStamp - this.pushTime > this.delay)this.#stop();
    }
    #start = function(){
      this.element.classList.add('pushRelease');
    }
    #stop = function(){
      this.element.classList.remove('pushRelease');
      this.isPush = false;
      this.pushTime = null;
    }
  }

  export class Push{
    delay:number;
    element:HTMLElement;
    isPush:boolean = false;
    pushTime:number = 0;
    constructor(delay:number){
      this.delay = delay;
    }
    setAnimation(arg:Models.Animations.Push){
      this.isPush = true;
      this.element = arg.element;
      this.pushTime = arg.pushTime;
      this.#start();
    }
    Animate(timeStamp:number){
      if(timeStamp - this.pushTime > this.delay)this.#stop();
    }
    #start = function(){
      this.element.classList.add('push');
    }
    #stop = function(){
      this.element.classList.remove('push');
      this.isPush = false;
      this.pushTime = null;
    }
  }

}
