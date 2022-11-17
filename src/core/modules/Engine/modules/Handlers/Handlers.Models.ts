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
    this.engine.app.Initialise();
  }
  Update(){
    this.engine.app.Update();
  }
  Resize(event?:Event){
    this.engine.app.Resize(event);
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
    Listeners:Record<string,Map<string,(event?:Event) => void>> = {};

    constructor(engine:EngineInterface){
      this.Engine = engine;

      document.body.style.setProperty('--thorium-default-height',window.innerHeight+'px');
      document.body.style.setProperty('--thorium-default-width',window.innerWidth+'px');

      window.addEventListener("resize",(event:Event) => {
        this.Screen.UpdateDimensions(engine);
        this.Engine.GlobalEvent.Resize();
        if(this.Listeners.resize)Array.from(this.Listeners.resize?.values() , (callback) => {return callback(event)})
      })

      window.addEventListener("keydown",(event:KeyboardEvent) => {
        this.Keyboard.UpdateKey(true,event);
        if(this.Listeners.keydown)Array.from(this.Listeners.keydown?.values() , (callback) => {return callback(event)})
      })

      window.addEventListener("keyup",(event:KeyboardEvent) => {
        this.Keyboard.UpdateKey(false,event);
        if(this.Listeners.keyup)Array.from(this.Listeners.keyup?.values() , (callback) => {return callback(event)})
      })

      window.addEventListener("mousemove",(event:MouseEvent) => {
        this.Mouse.UpdatePosition(event);
        if(this.Listeners.mousemove)Array.from(this.Listeners.mousemove?.values() , (callback) => {return callback(event)})
      })

      window.addEventListener("mousedown",(event:MouseEvent) => {
        this.Mouse.UpdateClick(true,event);
        if(this.Listeners.mousedown)Array.from(this.Listeners.mousedown?.values() , (callback) => {return callback(event)})
      })

      window.addEventListener("mouseup",(event:MouseEvent) => {
        this.Mouse.UpdateClick(false,event);
        if(this.Listeners.mouseup)Array.from(this.Listeners.mouseup?.values() , (callback) => {return callback(event)})
      })

    }

    Add(eventLabel:string , callback:(event:Event|KeyboardEvent|MouseEvent)=>void):string{
      const eventId = crypto.randomUUID();
      if(!this.Listeners[eventLabel])this.Listeners[eventLabel] = new Map();
      this.Listeners[eventLabel].set(eventId,callback);
      return eventId;
    }

    Remove(eventId:string){
      Array.from(Object.keys(this.Listeners) , (key) => {
        if(this.Listeners[key].has(eventId))this.Listeners[key].delete(eventId);
      })
    }

  }

}
