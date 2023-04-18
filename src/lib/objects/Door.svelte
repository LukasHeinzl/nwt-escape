<script lang="ts">
    import ObjectOverlay from "../ObjectOverlay.svelte";
    import {currentGameData, currentRoom} from "../../stores";

    function checkPin(): void {
        if (enteredPin === objectData.lockCode) {
            objectData.unlocked = true;
            enteredPin = "";
        } else {
            enteredPin = "Wrong!";
            setTimeout(() => enteredPin = "", 500);

            let statName: string = "doorCodeEnteredWrongCountRoom" + $currentRoom;
            let currentCount: number = $currentGameData.stats.get(statName) ?? 0;
            $currentGameData.stats.set(statName, currentCount + 1);
        }
    }

    function installDoorLock() {
        if (doorLocksInInventoryCount === 0) {
            return;
        }

        let idx: number = $currentGameData.inventory.findIndex((obj: EscapeObject) => obj.type === "DoorLock");
        $currentGameData.inventory.splice(idx, 1);
        $currentGameData.inventory = $currentGameData.inventory;
        objectData.hasLock = true;
    }

    function enterNextRoom(): void {
        $currentGameData.inventory.splice(0);
        $currentGameData.inventory = $currentGameData.inventory;
        $currentRoom++;
    }

    export let objectData: EscapeDoor;
    let isOverlayVisible: boolean = false;
    let enteredPin: string = "";
    let doorLocksInInventoryCount: number;

    $: doorLocksInInventoryCount = $currentGameData.inventory.filter((obj: EscapeObject) => obj.type === "DoorLock").length;
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
    {#if objectData.needsLock}
        {#if !objectData.hasLock}
            This door needs a door lock in order to be unlocked.<br/>
            You have {doorLocksInInventoryCount} door lock{doorLocksInInventoryCount !== 1 ? "s" : ""} in your
            inventory.<br/>
            <button on:click={() => installDoorLock()} disabled={doorLocksInInventoryCount === 0}>
                Install one door lock
            </button>
        {:else if !objectData.unlocked}
            <input type="text" placeholder="Enter code" bind:value={enteredPin} on:change={() => checkPin()}/>
            <button on:click={() => checkPin()}>Check</button>
        {:else}
            <button on:click={() => enterNextRoom()}>Enter next room</button>
        {/if}
    {:else if objectData.needsConnection}
        {#if !objectData.hasConnection}
            This door lock needs a network connection in order to be unlocked.
        {:else}
            <button on:click={() => enterNextRoom()}>Enter next room</button>
        {/if}
    {:else}
        <button on:click={() => enterNextRoom()}>Enter next room</button>
    {/if}
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true}/>