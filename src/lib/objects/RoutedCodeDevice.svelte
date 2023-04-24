<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";

  export let objectData: EscapeRoutedCodeDevice;

  let isOverlayVisible: boolean = false;
  let isActive: boolean;
  let codeDeviceIsActive: boolean;

  $: {
    isActive = objectData.hasConnection && objectData.router.isActive;
    codeDeviceIsActive = isActive && objectData.switch.connectedDevices.includes(objectData.codeDevice);
    objectData.codeDevice.hasConnection = codeDeviceIsActive;
  }
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  <section>
    This device currently {isActive ? "has" : "does not have"} a connection / IP address.<br />
    The connected code device is {codeDeviceIsActive ? "active" : "not active"}.
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