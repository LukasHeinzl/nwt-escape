<script lang="ts">
    import ObjectOverlay from "../ObjectOverlay.svelte";

    export let objectData: EscapeCodeDevice;
    let isOverlayVisible: boolean = false;
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
    {#if objectData.needsConnection && !objectData.hasConnection}
        This device needs a network connection to show secret information.
    {:else}
        {#if objectData.isActive}
            {objectData.info}
        {:else}
            This device currently cannot show secret information.
        {/if}
    {/if}
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true}/>