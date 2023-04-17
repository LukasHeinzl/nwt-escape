<script lang="ts">
    import Interactable from "$lib/Interactable.svelte";
    import Cabinet from "$lib/objects/Cabinet.svelte";

    let cabinetData: EscapeCabinet = {
        name: "Cabinet",
        img: "/objects/cabinet.png",
        type: "Cabinet",
        contents: [],
        pin: "1234",
        unlocked: false,
    };

    let rawEthernetCableData: EscapeObject = {
        name: "Raw Ethernet Cable",
        img: "/objects/raw_ethernet_cable.png",
        type: "RawEthernetCable",
        visible: true,
    };

    let cablePlug1Data: EscapeObject = {
        name: "Cable Plug",
        img: "/objects/cable_plug.png",
        type: "CablePlug",
        visible: true,
    };

    let cablePlug2Data: EscapeObject = {
        name: "Cable Plug",
        img: "/objects/cable_plug.png",
        type: "CablePlug",
        visible: true,
    };

    let crimpingToolData: EscapeObject = {
        name: "Crimping Tool",
        img: "/objects/crimping_tool.png",
        type: "CrimpingTool",
        visible: true,
    };
</script>

<main>
    {#if rawEthernetCableData.visible}
        <Interactable posX="100" posY="400" bind:objectData={rawEthernetCableData} isCollectable>
            <img src={rawEthernetCableData.img} alt={rawEthernetCableData.name}/>
        </Interactable>
    {/if}

    {#if cablePlug1Data.visible}
        <Interactable posX="200" posY="400" bind:objectData={cablePlug1Data} isCollectable>
            <img src={cablePlug1Data.img} alt={cablePlug1Data.name}/>
        </Interactable>
    {/if}

    {#if cablePlug2Data.visible}
        <Interactable posX="300" posY="400" bind:objectData={cablePlug2Data} isCollectable>
            <img src={cablePlug2Data.img} alt={cablePlug2Data.name}/>
        </Interactable>
    {/if}

    {#if crimpingToolData.visible}
        <Interactable posX="400" posY="400" bind:objectData={crimpingToolData} isCollectable>
            <img src={crimpingToolData.img} alt={crimpingToolData.name}/>
        </Interactable>
    {/if}

    <Interactable posX="200" posY="200" name="Cabinet">
        <Cabinet bind:objectData={cabinetData}/>
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