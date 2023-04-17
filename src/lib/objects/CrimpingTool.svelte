<script lang="ts">
    import ObjectOverlay from "../ObjectOverlay.svelte";
    import {currentGameData, currentRoom} from "../../stores";
    import {onMount} from "svelte";

    export let objectData: EscapeObject;
    let isOverlayVisible: boolean = false;
    let plugsInInventoryCount: number;
    let rawCablesInInventoryCount: number;

    $: plugsInInventoryCount = $currentGameData!.inventory.filter((obj: EscapeObject) => obj.type === "CablePlug").length;
    $: rawCablesInInventoryCount = $currentGameData!.inventory.filter((obj: EscapeObject) => obj.type === "RawEthernetCable").length;

    let crimpOptions = [
        "Green/White",
        "Green",
        "Orange/White",
        "Blue",
        "Blue/White",
        "Orange",
        "Brown/White",
        "Brown"
    ];

    let crimpDropDownOptions = [...crimpOptions].sort((a, b) => a.localeCompare(b));

    // each number is an index into the crimpOptions arrays above
    let crimpData = {
        cable1: [0, 0, 0, 0, 0, 0, 0, 0],
        cable2: [0, 0, 0, 0, 0, 0, 0, 0]
    }

    let buttonText: string = "Check and complete crimp";

    function checkAndCompleteCrimp(): void {
        if (!arePlugsCorrect()) {
            buttonText = "Pin layout incorrect, try again!";
            setTimeout(() => buttonText = "Check and complete crimp", 1000);

            let statName: string = "failedCrimpAttemptsRoom" + $currentRoom;
            let currentCount: number = $currentGameData.stats.get(statName) ?? 0;
            $currentGameData.stats.set(statName, currentCount + 1);

            return;
        }

        let idx: number = $currentGameData.inventory.findIndex((obj: EscapeObject) => obj.type === "CablePlug");
        $currentGameData.inventory.splice(idx, 1);

        idx = $currentGameData.inventory.findIndex((obj: EscapeObject) => obj.type === "CablePlug");
        $currentGameData.inventory.splice(idx, 1);

        idx = $currentGameData.inventory.findIndex((obj: EscapeObject) => obj.type === "RawEthernetCable");
        $currentGameData.inventory.splice(idx, 1);

        idx = $currentGameData.inventory.findIndex((obj: EscapeObject) => obj.type === "CrimpingTool");
        $currentGameData.inventory.splice(idx, 1);

        let finishedCable: EscapeObject = {
            name: "Ethernet cable",
            img: "/objects/ethernet_cable.png",
            type: "EthernetCable"
        };
        $currentGameData.inventory.push(finishedCable);

        $currentGameData.inventory = $currentGameData.inventory;
        isOverlayVisible = false;
    }

    function arePlugsCorrect(): boolean {
        for (let i = 0; i < crimpData.cable1.length; i++) {
            if (crimpData.cable1[i] !== i || crimpData.cable2[i] !== i) {
                return false;
            }
        }

        return true;
    }

    onMount(() => {
        for (let i = 0; i < crimpData.cable1.length; i++) {
            crimpData.cable1[i] = Math.floor(Math.random() * crimpOptions.length);
            crimpData.cable2[i] = Math.floor(Math.random() * crimpOptions.length);
        }
    });
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
    {#if plugsInInventoryCount < 2 || rawCablesInInventoryCount < 1}
        You need 2 cable plugs in your inventory, you have: {plugsInInventoryCount}.<br/>
        You need 1 raw ethernet cable in your inventory, you have: {rawCablesInInventoryCount}.
    {:else}
        <main>
            <section>
                <div>
                    <b>Plug 1</b>
                    {#each crimpData.cable1 as _, i (i)}
                        <select bind:value={crimpData.cable1[i]}>
                            {#each crimpDropDownOptions as option, j (j)}
                                <option value={crimpOptions.indexOf(option)}>{option}</option>
                            {/each}
                        </select>
                    {/each}
                </div>
                <span></span>
                <div>
                    <b>Plug 2</b>
                    {#each crimpData.cable2 as _, i (i)}
                        <select bind:value={crimpData.cable2[i]}>
                            {#each crimpDropDownOptions as option, j (j)}
                                <option value={crimpOptions.indexOf(option)}>{option}</option>
                            {/each}
                        </select>
                    {/each}
                </div>
            </section>
            <button on:click={() => checkAndCompleteCrimp()}>{buttonText}</button>
        </main>
    {/if}
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true}/>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }

    section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    section > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    section > span {
        background: black;
        width: 1px;
        height: 13rem;
    }
</style>