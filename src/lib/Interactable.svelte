<script lang="ts">
    import {currentGameData} from "../stores";
    import {setContext} from "svelte";

    export let objectData: EscapeObject;
    export let posX: number = -1;
    export let posY: number = -1;
    export let isCollectable: boolean = false;

    let isHovering: boolean = false;
    let hoverX: number = 0;
    let hoverY: number = 0;
    let position = posX === -1 && posY === -1 ? "initial" : "absolute";
    let extraText: string = "";
    let allowHover: boolean = true;

    function handleMouseMove(e: MouseEvent): void {
        hoverX = e.clientX + 10;
        hoverY = e.clientY + 10;
    }

    function addToInventory(): void {
        if (isCollectable && objectData) {
            $currentGameData.inventory.push(objectData);
            objectData.visible = false;
        }
    }

    setContext("setExtraText", (text: string) => {
        extraText = text;
    });

    setContext("setAllowHover", (allow: boolean) => {
        allowHover = allow;
    });
</script>

<div on:mousemove={(e) => handleMouseMove(e)} on:mouseleave={() => isHovering = false}
     on:mouseenter={() => isHovering = true} on:click={() => addToInventory()} class:isHovering
     style="--posX: {posX}px; --posY: {posY}px; --pos: {position};">
    <slot/>
    <span id="hoverTitle" style="--hoverX: {hoverX}px; --hoverY: {hoverY}px"
          class:isHovering={isHovering && allowHover}>
        {objectData?.name}

        {#if isCollectable}
            <br/><b>Left-click</b> to put item into inventory!<br/>
            {extraText}
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