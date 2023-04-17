<script lang="ts">
    import {getContext} from "svelte";

    export let title: string;
    export let isOverlayVisible: boolean = false;

    function closeOverlay(e: MouseEvent): void {
        if (e.target instanceof Element) {
            if (e.target.id === "object-overlay") {
                isOverlayVisible = false;
            }
        }
    }

    function toggleHover(showHover: boolean) {
        getContext("setAllowHover")(showHover);
    }

    $: toggleHover(!isOverlayVisible);
</script>

<div id="object-overlay" class:isOverlayVisible on:click={(e) => closeOverlay(e)}>
    <div>
        <header>
            {title}
            <button on:click={() => isOverlayVisible = false}>X</button>
        </header>

        <main>
            <slot/>
        </main>
    </div>
</div>

<style>
    div#object-overlay {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: none;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
    }

    div#object-overlay.isOverlayVisible {
        display: flex;
    }

    div#object-overlay > div {
        width: 40rem;
        height: 20rem;
        border: 1px solid black;
        background: white;
        display: flex;
        flex-direction: column;
    }

    header {
        display: flex;
        justify-content: space-between;
    }

    main {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
</style>