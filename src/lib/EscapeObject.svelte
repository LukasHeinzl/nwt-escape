<script lang="ts">
    import Cabinet from "./objects/Cabinet.svelte";

    export let objectData: EscapeObject;

    const objectComponents = {
        Cabinet,
        /*CodeDevice,
        CrimpingTool,
        Door,
        WallOutlet*/
    };
</script>

{#if objectComponents.hasOwnProperty(objectData.type)}
    <svelte:component this={objectComponents[objectData.type]} {objectData}/>
{:else}
    <img src={objectData.img} alt={objectData.name}/>
{/if}