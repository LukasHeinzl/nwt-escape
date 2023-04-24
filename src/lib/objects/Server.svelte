<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";

  export let objectData: EscapeObject;

  let isOverlayVisible: boolean = false;
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  <section>
    There are no input devices connected to this server.<br />
    There are no displays connected to this server.<br />
    The IP address of this server is 10.2.77.5.
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