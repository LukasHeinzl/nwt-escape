import { writable } from "svelte/store";
import Room1 from "./lib/rooms/Room1.svelte";
import Room2 from "./lib/rooms/Room2.svelte";
import Room3 from "./lib/rooms/Room3.svelte";
import Room4 from "./lib/rooms/Room4.svelte";

export const initialGameData: EscapeGame = {
  timeLeft: 180,
  state: "waiting",
  rooms: [
    { name: "Physical Layer", component: Room1 },
    { name: "Data Link Layer", component: Room2 },
    { name: "Network Layer", component: Room3 },
    { name: "Application Layer", component: Room4 }
  ],
  inventory: [],
  stats: new Map<string, any>()
};

export const currentGameData = writable<EscapeGame>(Object.assign({}, initialGameData));
export const currentRoom = writable<number>(3);