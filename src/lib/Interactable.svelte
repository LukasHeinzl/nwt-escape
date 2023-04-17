<script lang="ts">
    export let name: string;
    export let posX: number = -1;
    export let posY: number = -1;
    export let isCollectable: boolean = false;

    let isHovering: boolean = false;
    let hoverX: number = 0;
    let hoverY: number = 0;
    let position = posX === -1 && posY === -1 ? "initial" : "absolute";

    function handleMouseMove(e: MouseEvent): void {
        hoverX = e.clientX + 10;
        hoverY = e.clientY + 10;
    }
</script>

<div on:mousemove={(e) => handleMouseMove(e)} on:mouseleave={() => isHovering = false}
     on:mouseenter={() => isHovering = true} class:isHovering
     style="--posX: {posX}px; --posY: {posY}px; --pos: {position};">
    <slot/>
    <span id="hoverTitle" style="--hoverX: {hoverX}px; --hoverY: {hoverY}px" class:isHovering>
        {name}

        {#if isCollectable}
            <br/><b>Left-click</b> to put item into inventory!
        {/if}
    </span>
</div>

<style>
    div {
        position: var(--pos);
        left: var(--posX);
        top: var(--posY);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.isHovering {
        cursor: pointer;
    }

    span#hoverTitle {
        display: none;
        position: fixed;
        z-index: 9;
        left: var(--hoverX);
        top: var(--hoverY);
    }

    span#hoverTitle.isHovering {
        display: block;
    }
</style>