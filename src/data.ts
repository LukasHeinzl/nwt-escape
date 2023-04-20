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

interface EscapeNetworkDevice extends EscapeObject {
  needsConnection: boolean;
  hasConnection: boolean;
  macAddress: string;
}

interface EscapeCabinet extends EscapeNetworkDevice {
  pin: string;
  contents: EscapeObject[];
  unlocked: boolean;
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

interface EscapeWallOutlet extends EscapeNetworkDevice {
  potentialDevices: EscapeNetworkDevice[];
  connectedDeviceIdx: number;
}

interface EscapePlacementAnchor extends EscapeObject {
  potentialDevices: EscapeObject[];
}

interface EscapeAccessPoint extends EscapeNetworkDevice {
  connectedDevices: EscapeNetworkDevice[];
}

interface EscapeSwitch extends EscapeNetworkDevice {
  connectedDevices: EscapeNetworkDevice[];
  needsPOE: boolean;
  hasPOE: boolean;
  securityPassword: string;
  securityActive: boolean;
  blockedMACs: string[];
}

interface EscapePatchPanel extends EscapeObject {
  hasSwitch: boolean;
  switch: EscapeSwitch;
  outlets: EscapeWallOutlet[];
}