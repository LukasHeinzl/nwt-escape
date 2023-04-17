import {writable} from "svelte/store";

export const initialGameData: EscapeGame = {
    timeLeft: 10,
    state: "waiting",
    rooms: [],
    inventory: [],
    stats: new Map<string, any>(),
}

export const currentGameData = writable<EscapeGame>(JSON.parse(JSON.stringify(initialGameData)));
export const currentRoom = writable<number>(0);