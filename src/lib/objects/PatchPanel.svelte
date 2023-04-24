<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";
  import { currentGameData, currentRoom } from "../../stores";

  export let objectData: EscapePatchPanel;

  let isOverlayVisible: boolean = false;
  let patchCablesInInventoryCount: number;

  $: patchCablesInInventoryCount = $currentGameData!.inventory.filter((obj: EscapeObject) => obj.type === "PatchCable").length;

  function patch(idx: number): void {
    if (idx === -1) return;

    let cableIdx: number = $currentGameData.inventory.findIndex((obj: EscapeObject) => obj.type === "PatchCable");
    $currentGameData.inventory.splice(cableIdx, 1);
    $currentGameData.inventory = $currentGameData.inventory;

    objectData.switch.connectedDevices.push(objectData.outlets[idx]);
    objectData = objectData;

    let currentPatchCount = $currentGameData.stats.get("patchesInPanel" + objectData.name + "Room" + $currentRoom) ?? 0;
    $currentGameData.stats.set("patchesInPanel" + objectData.name + "Room" + $currentRoom, currentPatchCount + 1);
  }

  function unpatch(idx: number): void {
    let cable: EscapeObject = {
      type: "PatchCable",
      name: "Patch Cable",
      img: "/objects/patch_cable.png"
    };

    $currentGameData.inventory.push(cable);
    $currentGameData.inventory = $currentGameData.inventory;

    objectData.switch.connectedDevices[idx].hasConnection = false;
    objectData.switch.connectedDevices.splice(idx, 1);
    objectData = objectData;

    let currentPatchCount = $currentGameData.stats.get("unpatchesInPanel" + objectData.name + "Room" + $currentRoom) ?? 0;
    $currentGameData.stats.set("unpatchesInPanel" + objectData.name + "Room" + $currentRoom, currentPatchCount + 1);
  }
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  <section>
    {#if !objectData.hasSwitch}
      There is no switch installed in the rack.
    {:else}
      <span>You currently have {patchCablesInInventoryCount} patch cables in your inventory.</span>
      <span>Use one cable to patch an outlet / rack mounted device to the switch:</span>
      <select on:change={(e) => patch(e.target.value)} disabled={patchCablesInInventoryCount === 0}>
        <option value={-1}>Select...</option>
        {#each objectData.outlets as outlet, i (i)}
          {#if !objectData.switch.connectedDevices.includes(outlet)}
            <option value={i}>{outlet.name}</option>
          {/if}
        {/each}
      </select>
    {/if}

    <span>The following outlets / rack mounted devices are currently patched:</span>
    <ul>
      {#each objectData.switch.connectedDevices as outlet, i (i)}
        <li>
          {outlet.name}
          <button on:click={() => unpatch(i)}>Unpatch</button>
        </li>
      {/each}
    </ul>
  </section>
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true} />

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>