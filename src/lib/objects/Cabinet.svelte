<script lang="ts">
    import Interactable from "$lib/Interactable.svelte";
    import {currentGameData, currentRoom} from "../../stores";
    import ObjectOverlay from "../ObjectOverlay.svelte";

    export let objectData: EscapeCabinet;
    let isOverlayVisible: boolean = false;
    let enteredPin: string = "";

    function checkPin(): void {
        if (enteredPin === objectData.pin) {
            objectData.unlocked = true;
            enteredPin = "";
        } else {
            enteredPin = "Wrong!";
            setTimeout(() => enteredPin = "", 500);

            let statName = "cabinet" + objectData.name + "CodeEnteredWrongCountRoom" + $currentRoom;
            let currentCount: number = $currentGameData.stats.get(statName) ?? 0;
            $currentGameData.stats.set(statName, currentCount + 1);
        }
    }

    function addToInventory(i: number): void {
        $currentGameData.inventory.push(objectData.contents[i]);
        objectData.contents.splice(i, 1);
        $currentGameData.inventory = $currentGameData.inventory;
        objectData.contents = objectData.contents;
    }
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
    {#if objectData.unlocked || (objectData.needsConnection && objectData.hasConnection)}
        <section>
            {#each objectData.contents as obj, i (i)}
                <div class="inventorySlot" on:click={() => addToInventory(i)}>
                    <Interactable posX={-1} posY={-1} objectData={obj}>
                        <img src={obj.img} alt={obj.name}/>
                    </Interactable>
                </div>
            {:else}
                {objectData.name} is empty!
            {/each}
        </section>
    {:else if objectData.needsConnection && !objectData.hasConnection}
        A network connection is needed to open this container.
    {:else}
        <input type="text" placeholder="Enter pin" bind:value={enteredPin} on:change={() => checkPin()}/>
        <button on:click={() => checkPin()}>Check</button>
    {/if}
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true}/>

<style>
    section {
        display: flex;
        gap: 0.5rem;
        overflow-x: scroll;
        margin: 0 0.5rem;
    }

    section div.inventorySlot {
        min-width: 10rem;
        max-width: 10rem;
        min-height: 10rem;
        max-height: 10rem;
        border: 1px solid black;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>