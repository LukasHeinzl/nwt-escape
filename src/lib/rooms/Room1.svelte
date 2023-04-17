<script lang="ts">
    import Interactable from "$lib/Interactable.svelte";
    import ObjectOverlay from "$lib/ObjectOverlay.svelte";

    let isOverlayVisible = false;
</script>

<main>
    <Interactable posX="100" posY="400" name="Test object">
        <ObjectOverlay bind:isOverlayVisible title="Test object">test</ObjectOverlay>
        <img src="/favicon.png" alt="test" on:click={() => isOverlayVisible = true}/>
    </Interactable>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        background: url("/rooms/room1.png");
        background-size: cover;
    }
</style>