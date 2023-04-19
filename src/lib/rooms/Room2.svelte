<script lang="ts">
    import Interactable from "../Interactable.svelte";
    import Switch from "../objects/Switch.svelte";
    import PlacementAnchor from "../objects/PlacementAnchor.svelte";

    let switchData: EscapeSwitch = {
        name: "Switch",
        type: "Switch",
        img: "/objects/switch.png",
        visible: true,
        needsPOE: true,
        hasPOE: false,
        needsConnection: false,
        hasConnection: false,
        securityActive: true,
        securityPassword: "1234",
        macAddress: "",
        blockedMACs: ["72-6A-74-61-4C-BC"],
        connectedDevices: [],
    };

    let switchAnchorData: EscapePlacementAnchor = {
        name: "Rack mount for switch",
        type: "PlacementAnchor",
        img: "/objects/switch_rack_mount.png",
        visible: true,
        potentialDevices: [switchData],
    };
</script>

<main>
    {#if switchData.visible && switchAnchorData.visible}
        <Interactable posX="100" posY="400" bind:objectData={switchData} isCollectable>
            <img src={switchData.img} alt={switchData.name}/>
        </Interactable>
    {/if}

    {#if switchData.visible && !switchAnchorData.visible}
        <Interactable posX="300" posY="400" objectData={switchData}>
            <Switch bind:objectData={switchData}/>
        </Interactable>
    {/if}

    {#if switchAnchorData.visible}
        <Interactable posX="300" posY="400" objectData={switchAnchorData}>
            <PlacementAnchor bind:objectData={switchAnchorData}/>
        </Interactable>
    {/if}
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        background: url("/rooms/room2.png");
        background-size: cover;
    }
</style>