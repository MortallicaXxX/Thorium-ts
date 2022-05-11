import { Engine , EngineInterface} from "../../../Engine/Engine";
import * as Cpu from "../Cpu/Cpu";
import {
  GlobalEventInterface,
  MousePositionInterface,
  MouseButtonsInterface,
  MouseInterface,
  ScreenDimensionsInterface,
  ScreenInterface,
  KeyboardInterface,
  EventInterface
} from "./Handlers.Interfaces";

export {
  GlobalEventInterface,
  MousePositionInterface,
  MouseButtonsInterface,
  MouseInterface,
  ScreenDimensionsInterface,
  ScreenInterface,
  KeyboardInterface,
  EventInterface
}

export class GlobalEvent implements GlobalEventInterface{

  engine:EngineInterface;

  constructor(engine:EngineInterface){
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
  FrameUpdate(cpuStats:Cpu.CpuInterface){
    this.engine.CpuStats = cpuStats;
    try{
      this.engine.app.FrameUpdate(cpuStats);
    }
    catch(err){

    }
  }

}

export namespace Controls{

  export class Screen implements ScreenInterface{

    dimensions:ScreenDimensionsInterface = {width:window.innerWidth , height:window.innerHeight};

    UpdateDimensions(engine:EngineInterface){
      if(!engine.isMobile){
        this.dimensions = {width:window.innerWidth , height:window.innerHeight};
        document.body.style.setProperty('--thorium-default-height',window.innerHeight+'px');
        document.body.style.setProperty('--thorium-default-width',window.innerWidth+'px');
      }
    }

  }

  export class Mouse implements MouseInterface{

    position:MousePositionInterface;
    Buttons:MouseButtonsInterface = {left:false,center:false,right:false};
    isClicked:boolean = false;
    get Right():boolean{return this.Buttons.right}
    get Center():boolean{return this.Buttons.center}
    get Left():boolean{return this.Buttons.left}

    UpdatePosition(event:MouseEvent){
      this.position = {x:event.x , y:event.y};
    }

    UpdateClick(isClicked:boolean,event:MouseEvent){
      this.isClicked = isClicked;
      this.Buttons[Object.keys(this.Buttons)[event.button]] = isClicked;
      // console.log({...this});
    }

  }

  export class Keyboard implements KeyboardInterface{

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

  export class Events implements EventInterface{

    Mouse:Mouse = new Mouse();
    Screen:Screen = new Screen();
    Keyboard:Keyboard = new Keyboard();
    Engine:EngineInterface;

    constructor(engine:EngineInterface){
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
