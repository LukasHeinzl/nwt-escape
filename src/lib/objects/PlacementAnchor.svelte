<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";
  import { currentGameData } from "../../stores";

  export let objectData: EscapePlacementAnchor;
  let isOverlayVisible: boolean = false;
  let placedDeviceIdx: number = -1;

  function handlePlacement(idx: number): void {
    if (idx !== -1) {
      $currentGameData.inventory.splice($currentGameData.inventory.indexOf(objectData.potentialDevices[idx]), 1);
      $currentGameData.inventory = $currentGameData.inventory;
      placedDeviceIdx = idx;
      objectData.potentialDevices[placedDeviceIdx].visible = true;
      objectData.visible = false;
    }
  }
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  {#if placedDeviceIdx === -1}
    Place a device here:<br />
    <select on:change={(e) => handlePlacement(e.target.value)}>
      <option value={-1}>Select...</option>
      {#each objectData.potentialDevices as device, i (i)}
        {#if $currentGameData.inventory.includes(device)}
          <option value={i}>{device.name}</option>
        {/if}
      {/each}
    </select>
  {/if}
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true} />