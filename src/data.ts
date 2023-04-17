interface EscapeGame {
    timeLeft: number;
    state: "waiting" | "playing" | "paused" | "won" | "lost";
    rooms: EscapeRoom[];
    inventory: EscapeObject[];
    stats: Map<string, any>;
}

interface EscapeRoom {
    name: string;
    background: string;
    component: any;
}

interface EscapeObject {
    name: string;
    img: string;
    type: string;
    visible?: boolean;
    posX?: number;
    posY?: number;
}

interface EscapeCabinet extends EscapeObject {
    pin: string;
    contents: EscapeObject[];
    unlocked: boolean;
}

interface EscapeCodeDevice extends EscapeObject {
    code: string;
    isActive: boolean;
}

interface EscapeDoor extends EscapeObject {
    hasLock: boolean;
    lockCode: string;
    unlocked: boolean;
}

interface EscapeWallOutlet extends EscapeObject {
    connectedDeviceName: string;
    isActive: boolean;
}