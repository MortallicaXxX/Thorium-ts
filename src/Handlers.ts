import { Engine } from "./Engine";
import { Models } from "./Models";
import { Cpu } from "./Cpu";

export namespace Handlers{

  export class GlobalEvent{

    engine:Engine;

    constructor(engine:Engine){
      this.engine = engine;
    }

    Initialise(){
      this.engine.app.th.Initialise();
    }
    Update(){
      this.engine.app.th.Update();
    }
    Resize(){
      this.engine.app.th.Resize();
    }
    FrameUpdate(cpuStats:Cpu){
      this.engine.CpuStats = cpuStats;
      try{
        this.engine.app.th.FrameUpdate(cpuStats);
      }
      catch(err){

      }
    }

  }

  export namespace Controls{

    class Screen{

      dimensions:Models.ScreenDimensions = {width:window.innerWidth , height:window.innerHeight};

      UpdateDimensions(engine:Engine){
        if(!engine.isMobile){
          this.dimensions = {width:window.innerWidth , height:window.innerHeight};
          document.body.style.setProperty('--thorium-default-height',window.innerHeight+'px');
          document.body.style.setProperty('--thorium-default-width',window.innerWidth+'px');
        }
      }

    }

    class Mouse{

      position:Models.MousePosition;
      Buttons:[boolean,boolean] = [false,false];
      isClicked:boolean = false;
      get Right():boolean{return this.Buttons[0]}
      get Left():boolean{return this.Buttons[1]}

      UpdatePosition(event:MouseEvent){
        this.position = {x:event.x , y:event.y};
      }

      UpdateClick(isClicked:boolean,event:MouseEvent){
        this.isClicked = isClicked;
        this.Buttons[event.button - 1] = isClicked;
      }

    }

    class Keyboard{

      keys:any = {};

      UpdateKey(isPressed:boolean,event:KeyboardEvent){

        if(event.key.toUpperCase() in this.keys == false)this.keys[event.key.toUpperCase()] = {
          code : event.keyCode,
          key : event.key,
          KEY : event.key.toUpperCase(),
          isPressed : isPressed
        }
        if(this.keys[event.key.toUpperCase()].isPressed != isPressed)this.keys[event.key.toUpperCase()].isPressed = isPressed;

      }

    }

    export class Events{

      Mouse:Mouse = new Mouse();
      Screen:Screen = new Screen();
      Keyboard:Keyboard = new Keyboard();
      Engine:Engine;

      constructor(engine:Engine){
        this.Engine = engine;
        const _this:Events = this;

        document.body.style.setProperty('--thorium-default-height',window.innerHeight+'px');
        document.body.style.setProperty('--thorium-default-width',window.innerWidth+'px');

        window.addEventListener("resize",function(event:Event){
          _this.Screen.UpdateDimensions(engine);
        })

        window.addEventListener("keydown",function(event:KeyboardEvent){
          _this.Keyboard.UpdateKey(true,event);
        })

        window.addEventListener("keyup",function(event:KeyboardEvent){
          _this.Keyboard.UpdateKey(false,event);
        })

        window.addEventListener("mousemove",function(event:MouseEvent){
          _this.Mouse.UpdatePosition(event);
        })

        window.addEventListener("mousedown",function(event:MouseEvent){
          _this.Mouse.UpdateClick(true,event);
        })

        window.addEventListener("mouseup",function(event:MouseEvent){
          _this.Mouse.UpdateClick(false,event);
        })

      }

    }

  }

}
