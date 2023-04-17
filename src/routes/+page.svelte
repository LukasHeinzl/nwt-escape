<script lang="ts">
    import {currentGameData, currentRoom, initialGameData} from "../stores";
    import Interactable from "../lib/Interactable.svelte";
    import EscapeObject from "../lib/EscapeObject.svelte";

    let timer: number | undefined;

    function formatTime(time: number): string {
        let minutes = time % 60 + "";
        let hours = Math.floor((time / 60) % 60) + "";

        minutes = minutes.padStart(2, "0");
        hours = hours.padStart(2, "0");

        return hours + ":" + minutes;
    }

    async function startGame(retry: boolean = false) {
        if (retry) {
            $currentRoom = 0;
            $currentGameData = Object.assign({}, initialGameData);
        }

        $currentGameData.state = "playing";
        resumeGame();
    }

    function handlePause(e: KeyboardEvent): void {
        if (e.key === "Escape") {
            if ($currentGameData.state === "playing") {
                $currentGameData.state = "paused";
                clearTimeout(timer!);
            } else {
                $currentGameData.state = "playing";
                resumeGame();
            }
        }
    }

    function resumeGame(): void {
        timer = setInterval(countdown, 1000);
        $currentGameData.state = "playing";
    }

    function countdown(): void {
        $currentGameData.timeLeft -= 1;

        if ($currentGameData.timeLeft === 0) {
            clearInterval(timer!);
            timer = undefined;
            $currentGameData.state = "lost";
        }
    }

    function downloadStats(): void {
        console.log(JSON.stringify(Object.fromEntries($currentGameData!.stats)));
    }

    function trackClicks(): void {
        if ($currentGameData.state !== "playing") {
            return;
        }

        let currentClickCount: number = $currentGameData.stats.get("totalClickCount") ?? 0;
        $currentGameData.stats.set("totalClickCount", currentClickCount + 1);
    }
</script>

<svelte:window on:keyup={(e) => handlePause(e)} on:click={() => trackClicks()}/>

<main>
    <div id="timer">
        {formatTime($currentGameData?.timeLeft ?? 0)}
    </div>

    <header id="title">
        <h1>
            Escape the net-labs - Room {$currentRoom + 1}
            "{$currentGameData.rooms[$currentRoom]?.name ?? ""}"
        </h1>
    </header>

    <aside id="inventory">
        <h2>Inventory</h2>
        <div>
            {#each $currentGameData.inventory as obj, i (i)}
                <div class="slot">
                    <Interactable posX={-1} posY={-1} objectData={obj}>
                        <EscapeObject objectData={obj}/>
                    </Interactable>
                </div>
            {/each}
        </div>
    </aside>

    <section id="currentRoom">
        <svelte:component this={$currentGameData.rooms[$currentRoom]?.component ?? null}/>
    </section>
</main>

<div id="overlay" class:hidden={$currentGameData.state === "playing"}>
    <h1>Welcome to nwt-escape</h1>
    <h2>- A web-based point-and-click escape game -</h2>

    <section>
        {#if $currentGameData.state === "won"}
            <b>GAME WON</b>
        {:else if $currentGameData.state === "lost"}
            <b>GAME OVER</b>
        {:else if $currentGameData.state === "paused"}
            <b>PAUSED</b>
        {/if}

        <div><b>Title:</b>Escape the net-labs</div>
        <div>
            <b>Rooms{$currentGameData.state === "won" || $currentGameData.state === "lost" ? " completed" : ""}:</b>
            {#if $currentGameData.state === "won" || $currentGameData.state === "lost"}
                {$currentRoom} /
            {/if}
            {$currentGameData.rooms.length}
        </div>
        <div>
            <b>Time{$currentGameData.state !== "waiting" ? " left" : ""}: </b>
            {formatTime($currentGameData?.timeLeft ?? 0)}
        </div>
    </section>

    <button on:click={() => $currentGameData.state === "paused" ? resumeGame() : startGame($currentGameData.state === "lost")}>
        {#if $currentGameData.state === "paused"}
            Resume
        {:else if $currentGameData.state === "lost" || $currentGameData.state === "won"}
            Retry
        {:else}
            Start
        {/if}
    </button>

    {#if $currentGameData.state === "won" || $currentGameData.state === "lost"}
        <button on:click={() => downloadStats()}>Download stats</button>
    {/if}
</div>

<style>
    main {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        display: grid;
        grid-template-columns: 11rem auto;
        grid-template-rows: 5rem auto;
        grid-template-areas: 'timer title'
        'inventory currentRoom';
    }

    div#timer {
        grid-area: timer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid black;
    }

    header#title {
        grid-area: title;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid black;
    }

    aside#inventory {
        grid-area: inventory;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5rem;
        align-items: center;
        border-right: 1px solid black;
        padding: 0.5rem;
        overflow: hidden;
    }

    aside#inventory > div {
        overflow-y: auto;
    }

    aside#inventory > div > div.slot {
        width: 10rem;
        height: 10rem;
        border: 1px solid black;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    section#currentRoom {
        position: relative;
        grid-area: currentRoom;
        padding: 1rem;
        width: 1000px;
        height: 600px;
        justify-self: center;
        align-self: center;
        border: 1px solid black;
    }

    div#overlay {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 5rem;
        position: fixed;
        z-index: 999999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
    }

    div#overlay > h1, h2 {
        margin: 0;
    }

    div#overlay section {
        margin-top: 5rem;
        font-size: 110%;
        min-width: 15rem;
    }

    div#overlay section > div {
        display: flex;
        justify-content: space-between;
    }

    div#overlay button {
        margin-top: 3rem;
        font-size: 120%;
        padding: 1rem 3rem;
    }

    div#overlay.hidden {
        display: none;
    }
</style>