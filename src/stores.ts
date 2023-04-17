import {writable} from "svelte/store";
import Room1 from "./lib/rooms/Room1.svelte";
import Room2 from "./lib/rooms/Room2.svelte";
import Room3 from "./lib/rooms/Room3.svelte";
import Room4 from "./lib/rooms/Room4.svelte";

export const initialGameData: EscapeGame = {
    timeLeft: 10,
    state: "waiting",
    rooms: [
        {name: "Physical Layer", background: "/room1.png", component: Room1},
        {name: "Data Link Layer", background: "/room2.png", component: Room2},
        {name: "Network Layer", background: "/room3.png", component: Room3},
        {name: "Application Layer", background: "/room4.png", component: Room4},
    ],
    inventory: [],
    stats: new Map<string, any>(),
}

export const currentGameData = writable<EscapeGame>(JSON.parse(JSON.stringify(initialGameData)));
export const currentRoom = writable<number>(0);