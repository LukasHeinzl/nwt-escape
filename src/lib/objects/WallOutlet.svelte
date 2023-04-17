<script lang="ts">
    import ObjectOverlay from "../ObjectOverlay.svelte";
    import {currentGameData} from "../../stores";

    function handleConnection(idx: number): void {
        if (idx !== -1) {
            connectedDeviceIdx = idx;
        }

        if (connectedDeviceIdx !== -1) {
            objectData.potentialDevices[connectedDeviceIdx].hasConnection = idx !== -1;
        }

        connectedDeviceIdx = idx;

        if (connectedDeviceIdx !== -1) {
            let cableIdx: number = $currentGameData.inventory.findIndex((obj: EscapeObject) => obj.type === "EthernetCable");
            $currentGameData.inventory.splice(cableIdx, 1);
        } else {
            let cable: EscapeObject = {
                name: "Ethernet cable",
                img: "/objects/ethernet_cable.png",
                type: "EthernetCable"
            };
            $currentGameData.inventory.push(cable);
        }

        $currentGameData.inventory = $currentGameData.inventory;
    }

    export let objectData: EscapeWallOutlet;
    let isOverlayVisible: boolean = false;
    let connectedDeviceIdx: number = -1;
    let ethernetCablesInInventoryCount: number;
    $: ethernetCablesInInventoryCount = $currentGameData.inventory.filter((obj: EscapeObject) => obj.type === "EthernetCable").length;
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
    <section>
        <span>This outlet {objectData.isActive ? "has" : "doesn't have"} a network connection.</span>
        <span>
            You currently have <b>{ethernetCablesInInventoryCount}</b>
            ethernet cable{ethernetCablesInInventoryCount !== 1 ? "s" : ""} in your inventory.
        </span>
        {#if connectedDeviceIdx !== -1}
            This wall outlet is currently connected to: <b>{objectData.potentialDevices[connectedDeviceIdx].name}</b>
            <button on:click={() => handleConnection(-1)}>Remove connection</button>
        {:else}
            Connect this outlet to a device (consumes one ethernet cable from the inventory!):<br/>
            <select disabled={!objectData.isActive || ethernetCablesInInventoryCount === 0}
                    on:change={(e) => handleConnection(e.target.value)}>
                <option value={-1}>Select...</option>
                {#each objectData.potentialDevices as device, i (i)}
                    {#if device.needsConnection && !device.hasConnection}
                        <option value={i}>{device.name}</option>
                    {/if}
                {/each}
            </select>
        {/if}
    </section>
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true}/>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
</style>