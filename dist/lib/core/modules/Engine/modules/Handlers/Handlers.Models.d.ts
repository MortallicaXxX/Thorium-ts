import { EngineInterface } from "../../../Engine/Engine";
import * as Cpu from "../Cpu/Cpu";
import { GlobalEventInterface, MousePositionInterface, MouseButtonsInterface, MouseInterface, ScreenDimensionsInterface, ScreenInterface, KeyboardInterface, EventInterface } from "./Handlers.Interfaces";
export { GlobalEventInterface, MousePositionInterface, MouseButtonsInterface, MouseInterface, ScreenDimensionsInterface, ScreenInterface, KeyboardInterface, EventInterface };
export declare class GlobalEvent implements GlobalEventInterface {
    engine: EngineInterface;
    constructor(engine: EngineInterface);
    Initialise(): void;
    Update(): void;
    Resize(event?: Event): void;
    FrameUpdate(cpuStats: Cpu.CpuInterface): void;
}
export declare namespace Controls {
    class Screen implements ScreenInterface {
        dimensions: ScreenDimensionsInterface;
        UpdateDimensions(engine: EngineInterface): void;
    }
    class Mouse implements MouseInterface {
        position: MousePositionInterface;
        Buttons: MouseButtonsInterface;
        isClicked: boolean;
        get Right(): boolean;
        get Center(): boolean;
        get Left(): boolean;
        UpdatePosition(event: MouseEvent): void;
        UpdateClick(isClicked: boolean, event: MouseEvent): void;
    }
    class Keyboard implements KeyboardInterface {
        keys: any;
        UpdateKey(isPressed: boolean, event: KeyboardEvent): void;
    }
    class Events implements EventInterface {
        Mouse: Mouse;
        Screen: Screen;
        Keyboard: Keyboard;
        Engine: EngineInterface;
        Listeners: Record<string, Map<string, (event?: Event) => void>>;
        constructor(engine: EngineInterface);
        Add(eventLabel: string, callback: (event: Event | KeyboardEvent | MouseEvent) => void): string;
        Remove(eventId: string): void;
    }
}
