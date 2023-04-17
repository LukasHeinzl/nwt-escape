<script lang="ts">
    import Cabinet from "./objects/Cabinet.svelte";
    import CrimpingTool from "./objects/CrimpingTool.svelte";
    import CodeDevice from "./objects/CodeDevice.svelte";

    export let objectData: EscapeObject;

    const objectComponents = {
        Cabinet,
        CodeDevice,
        CrimpingTool,
        /*Door,
        WallOutlet*/
    };
</script>

{#if objectComponents.hasOwnProperty(objectData.type)}
    <svelte:component this={objectComponents[objectData.type]} {objectData}/>
{:else}
    <img src={objectData.img} alt={objectData.name}/>
{/if}