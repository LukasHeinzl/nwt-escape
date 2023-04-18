interface EscapeGame {
    timeLeft: number;
    state: "waiting" | "playing" | "paused" | "won" | "lost";
    rooms: EscapeRoom[];
    inventory: EscapeObject[];
    stats: Map<string, any>;
}

interface EscapeRoom {
    name: string;
    component: any;
}

interface EscapeObject {
    name: string;
    img: string;
    type: string;
    visible?: boolean;
}

interface EscapeCabinet extends EscapeObject {
    pin: string;
    contents: EscapeObject[];
    unlocked: boolean;
}

interface EscapeNetworkDevice extends EscapeObject {
    needsConnection: boolean;
    hasConnection: boolean;
}

interface EscapeCodeDevice extends EscapeNetworkDevice {
    code: string;
    isActive: boolean;
}

interface EscapeDoor extends EscapeNetworkDevice {
    needsLock: boolean;
    hasLock: boolean;
    lockCode: string;
    unlocked: boolean;
}

interface EscapeWallOutlet extends EscapeObject {
    potentialDevices: EscapeNetworkDevice[];
    connectedDeviceIdx: number;
    isActive: boolean;
}

interface EscapePlacementAnchor extends EscapeObject {
    potentialDevices: EscapeObject[];
}

interface EscapeAccessPoint extends EscapeNetworkDevice {
    connectedDevices: EscapeNetworkDevice[];
}