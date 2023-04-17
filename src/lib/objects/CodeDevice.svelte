<script lang="ts">
    import ObjectOverlay from "../ObjectOverlay.svelte";

    export let objectData: EscapeCodeDevice;
    let isOverlayVisible: boolean = false;
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
    {#if objectData.needsConnection && !objectData.hasConnection}
        This device needs a network connection to show a code.
    {:else}
        {#if objectData.isActive}
            The secret code is: {objectData.code}
        {:else}
            This device currently cannot show a code.
        {/if}
    {/if}
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true}/>