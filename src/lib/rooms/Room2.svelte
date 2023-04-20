<script lang="ts">
  import Interactable from "../Interactable.svelte";
  import Switch from "../objects/Switch.svelte";
  import PlacementAnchor from "../objects/PlacementAnchor.svelte";
  import PatchPanel from "../objects/PatchPanel.svelte";
  import WallOutlet from "../objects/WallOutlet.svelte";

  let patchCable1Data: EscapeObject = {
    name: "Patch Cable",
    type: "PatchCable",
    img: "/objects/patch_cable.png",
    visible: true
  };

  let patchCable2Data: EscapeObject = {
    name: "Patch Cable",
    type: "PatchCable",
    img: "/objects/patch_cable.png",
    visible: true
  };

  let patchCable3Data: EscapeObject = {
    name: "Patch Cable",
    type: "PatchCable",
    img: "/objects/patch_cable.png",
    visible: true
  };

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
    connectedDevices: []
  };

  let switchAnchorData: EscapePlacementAnchor = {
    name: "Rack mount for switch",
    type: "PlacementAnchor",
    img: "/objects/switch_rack_mount.png",
    visible: true,
    potentialDevices: [switchData]
  };

  let doorLockWallOutletData: EscapeWallOutlet = {
    name: "Wall Outlet 1",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: true,
    hasConnection: false,
    potentialDevices: [],
    visible: true,
    macAddress: "72-6A-74-61-4C-BC"
  };

  let usableWallOutlet1Data: EscapeWallOutlet = {
    name: "Wall Outlet 2",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: true,
    hasConnection: false,
    potentialDevices: [],
    visible: true,
    macAddress: ""
  };

  let usableWallOutlet2Data: EscapeWallOutlet = {
    name: "Wall Outlet 3",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: true,
    hasConnection: false,
    potentialDevices: [],
    visible: true,
    macAddress: ""
  };

  let dummyWallOutlet1Data: EscapeWallOutlet = {
    name: "Wall Outlet 4",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: true,
    hasConnection: false,
    potentialDevices: [],
    visible: true,
    macAddress: ""
  };

  let dummyWallOutlet2Data: EscapeWallOutlet = {
    name: "Wall Outlet 5",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: true,
    hasConnection: false,
    potentialDevices: [],
    visible: true,
    macAddress: ""
  };

  let patchPanelData: EscapePatchPanel = {
    name: "Patch Panel",
    type: "PatchPanel",
    img: "/objects/patch_panel.png",
    visible: true,
    hasSwitch: false,
    switch: switchData,
    outlets: [doorLockWallOutletData, usableWallOutlet1Data, usableWallOutlet2Data, dummyWallOutlet1Data, dummyWallOutlet2Data]
  };

  $: if (patchPanelData) {
    switchData = switchData;
  }

  $: if (switchData) {
    doorLockWallOutletData = doorLockWallOutletData;
    usableWallOutlet1Data = usableWallOutlet1Data;
    usableWallOutlet2Data = usableWallOutlet2Data;
    dummyWallOutlet1Data = dummyWallOutlet1Data;
    dummyWallOutlet2Data = dummyWallOutlet2Data;
  }

  $: if (switchAnchorData) {
    patchPanelData.hasSwitch = <boolean>switchData.visible && !switchAnchorData.visible;
    switchData = switchData;
  }
</script>

<main>
  {#if switchData.visible && switchAnchorData.visible}
    <Interactable posX="100" posY="400" bind:objectData={switchData} isCollectable>
      <img src={switchData.img} alt={switchData.name} />
    </Interactable>
  {/if}

  {#if switchData.visible && !switchAnchorData.visible}
    <Interactable posX="300" posY="400" objectData={switchData}>
      <Switch bind:objectData={switchData} />
    </Interactable>
  {/if}

  {#if switchAnchorData.visible}
    <Interactable posX="300" posY="400" objectData={switchAnchorData}>
      <PlacementAnchor bind:objectData={switchAnchorData} />
    </Interactable>
  {/if}

  <Interactable posX="300" posY="500" objectData={patchPanelData}>
    <PatchPanel bind:objectData={patchPanelData} />
  </Interactable>

  {#if patchCable1Data.visible}
    <Interactable posX="700" posY="400" bind:objectData={patchCable1Data} isCollectable>
      <img src={patchCable1Data.img} alt={patchCable1Data.name} />
    </Interactable>
  {/if}

  {#if patchCable2Data.visible}
    <Interactable posX="600" posY="400" bind:objectData={patchCable2Data} isCollectable>
      <img src={patchCable2Data.img} alt={patchCable2Data.name} />
    </Interactable>
  {/if}

  {#if patchCable3Data.visible}
    <Interactable posX="500" posY="400" bind:objectData={patchCable3Data} isCollectable>
      <img src={patchCable3Data.img} alt={patchCable3Data.name} />
    </Interactable>
  {/if}

  <Interactable posX="400" posY="200" objectData={doorLockWallOutletData}>
    <WallOutlet bind:objectData={doorLockWallOutletData} />
  </Interactable>

  <Interactable posX="400" posY="250" objectData={usableWallOutlet1Data}>
    <WallOutlet bind:objectData={usableWallOutlet1Data} />
  </Interactable>

  <Interactable posX="400" posY="300" objectData={usableWallOutlet2Data}>
    <WallOutlet bind:objectData={usableWallOutlet2Data} />
  </Interactable>

  <Interactable posX="400" posY="350" objectData={dummyWallOutlet1Data}>
    <WallOutlet bind:objectData={dummyWallOutlet1Data} />
  </Interactable>

  <Interactable posX="400" posY="370" objectData={dummyWallOutlet2Data}>
    <WallOutlet bind:objectData={dummyWallOutlet2Data} />
  </Interactable>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        background: url("/rooms/room2.png");
        background-size: cover;
    }
</style>