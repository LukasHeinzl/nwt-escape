<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";
  import { currentGameData, currentRoom } from "../../stores";

  function handleConnection(idx: number): void {
    if (idx !== -1) {
      objectData.connectedDeviceIdx = idx;
    }

    if (objectData.connectedDeviceIdx !== -1) {
      objectData.potentialDevices[objectData.connectedDeviceIdx].hasConnection = idx !== -1 && objectData.hasConnection;
      objectData = objectData;
    }

    objectData.connectedDeviceIdx = idx;

    if (objectData.connectedDeviceIdx !== -1) {
      let cableIdx: number = $currentGameData.inventory.findIndex((obj: EscapeObject) => obj.type === "EthernetCable");
      $currentGameData.inventory.splice(cableIdx, 1);

      let count = $currentGameData.stats.get("wallOutlet" + objectData.name + "Room" + $currentRoom + "Connected") ?? 0;
      $currentGameData.stats.set("wallOutlet" + objectData.name + "Room" + $currentRoom + "Connected", count + 1);
    } else {
      let cable: EscapeObject = {
        name: "Ethernet cable",
        img: "/objects/ethernet_cable.png",
        type: "EthernetCable"
      };
      $currentGameData.inventory.push(cable);

      let count = $currentGameData.stats.get("wallOutlet" + objectData.name + "Room" + $currentRoom + "Disconnected") ?? 0;
      $currentGameData.stats.set("wallOutlet" + objectData.name + "Room" + $currentRoom + "Disconnected", count + 1);
    }

    $currentGameData.inventory = $currentGameData.inventory;
  }

  function forwardConnection(hasConnection: boolean): void {
    if (objectData.connectedDeviceIdx !== -1) {
      objectData.potentialDevices[objectData.connectedDeviceIdx].hasConnection = hasConnection;
    }
  }

  export let objectData: EscapeWallOutlet;
  let isOverlayVisible: boolean = false;
  let ethernetCablesInInventoryCount: number;
  $: ethernetCablesInInventoryCount = $currentGameData.inventory.filter((obj: EscapeObject) => obj.type === "EthernetCable").length;
  $: forwardConnection(objectData.hasConnection);
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  <section>
    <span>This outlet {objectData.hasConnection ? "has" : "doesn't have"} a network connection.</span>
    {#if objectData.connectedDeviceIdx !== -1}
      This wall outlet is currently connected to:
      <b>{objectData.potentialDevices[objectData.connectedDeviceIdx].name}</b>
      <button on:click={() => handleConnection(-1)}>Remove connection</button>
    {:else}
      {#if ethernetCablesInInventoryCount === 0}
        <span>You need at least one ethernet cable in your inventory to connect this outlet to a device.</span>
      {:else}
        Connect this outlet to a device (consumes one ethernet cable from the inventory!):<br />
        <select on:change={(e) => handleConnection(e.target.value)}>
          <option value={-1}>Select...</option>
          {#each objectData.potentialDevices as device, i (i)}
            {#if device.needsConnection && !device.hasConnection && device.visible}
              <option value={i}>{device.name}</option>
            {/if}
          {/each}
        </select>
      {/if}
    {/if}
  </section>
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true} />

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
</style>