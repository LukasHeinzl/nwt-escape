<script lang="ts">
    import CrimpingTool from "./objects/CrimpingTool.svelte";
    import CodeDevice from "./objects/CodeDevice.svelte";

    export let objectData: EscapeObject;

    const objectComponents = {
        CodeDevice,
        CrimpingTool,
    };
</script>

{#if objectComponents.hasOwnProperty(objectData.type)}
    <svelte:component this={objectComponents[objectData.type]} {objectData}/>
{:else}
    <img src={objectData.img} alt={objectData.name}/>
{/if}