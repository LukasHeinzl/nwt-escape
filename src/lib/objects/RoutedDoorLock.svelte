<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";

  export let objectData: EscapeRoutedDoorLock;

  let isOverlayVisible: boolean = false;

  function checkNetwork(data) {
    if (data.router.isActive) {
      if (data.router.dhcpNetId === "10.6.0.0" && data.router.dhcpNetMask.startsWith("255.255.")) {
        objectData.door.hasConnection = true;
      }
    } else objectData.door.hasConnection = data.router.staticRoutes.get("10.6.0.1") === "127.0.0.1";
  }

  $: checkNetwork(objectData);
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  <section>
    This device currently {objectData.door.hasConnection ? "has" : "does not have"} a connection / IP address.<br />
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