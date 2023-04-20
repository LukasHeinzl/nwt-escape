<script lang="ts">
  import Interactable from "../Interactable.svelte";
  import Cabinet from "../objects/Cabinet.svelte";
  import CodeDevice from "../objects/CodeDevice.svelte";
  import WallOutlet from "../objects/WallOutlet.svelte";
  import AccessPoint from "../objects/AccessPoint.svelte";
  import PlacementAnchor from "../objects/PlacementAnchor.svelte";
  import Door from "../objects/Door.svelte";

  let rawEthernetCableData: EscapeObject = {
    name: "Raw Ethernet Cable",
    img: "/objects/raw_ethernet_cable.png",
    type: "RawEthernetCable",
    visible: true
  };

  let cablePlug1Data: EscapeObject = {
    name: "Cable Plug",
    img: "/objects/cable_plug.png",
    type: "CablePlug",
    visible: true
  };

  let cablePlug2Data: EscapeObject = {
    name: "Cable Plug",
    img: "/objects/cable_plug.png",
    type: "CablePlug",
    visible: true
  };

  let crimpingToolData: EscapeObject = {
    name: "Crimping Tool",
    img: "/objects/crimping_tool.png",
    type: "CrimpingTool",
    visible: true
  };

  let codeDeviceData: EscapeCodeDevice = {
    name: "Code Device",
    img: "/objects/code_device.png",
    type: "CodeDevice",
    info: "The secret code is 1234",
    isActive: true,
    needsConnection: true,
    hasConnection: false,
    visible: true,
    macAddress: ""
  };

  let doorData: EscapeDoor = {
    name: "Door",
    img: "/objects/door.png",
    type: "Door",
    needsLock: false,
    hasLock: false,
    lockCode: "",
    unlocked: false,
    needsConnection: true,
    hasConnection: false,
    visible: true,
    macAddress: ""
  };

  let accessPointData: EscapeAccessPoint = {
    name: "Access Point",
    img: "/objects/access_point.png",
    type: "AccessPoint",
    connectedDevices: [doorData],
    needsConnection: true,
    hasConnection: false,
    visible: false,
    macAddress: ""
  };

  $: if (accessPointData) doorData = doorData;

  let accessPointAnchorData: EscapePlacementAnchor = {
    name: "Access Point Anchor",
    img: "/objects/access_point_anchor.png",
    type: "PlacementAnchor",
    potentialDevices: [accessPointData],
    visible: true
  };

  $: if (accessPointAnchorData) accessPointData = accessPointData;

  let wallOutletData: EscapeWallOutlet = {
    name: "Wall Outlet 1",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: false,
    hasConnection: true,
    potentialDevices: [codeDeviceData, accessPointData],
    visible: true,
    macAddress: ""
  };

  $: if (wallOutletData) codeDeviceData = codeDeviceData;
  $: if (wallOutletData) accessPointData = accessPointData;

  let cabinetData: EscapeCabinet = {
    name: "Cabinet",
    img: "/objects/cabinet.png",
    type: "Cabinet",
    contents: [accessPointData],
    pin: "1234",
    unlocked: false,
    needsConnection: false,
    hasConnection: false,
    macAddress: "",
    needsPin: true,
  };

  $: if (cabinetData) accessPointData = accessPointData;
</script>

<main>
  {#if rawEthernetCableData.visible}
    <Interactable posX="100" posY="400" bind:objectData={rawEthernetCableData} isCollectable>
      <img src={rawEthernetCableData.img} alt={rawEthernetCableData.name} />
    </Interactable>
  {/if}

  {#if cablePlug1Data.visible}
    <Interactable posX="200" posY="400" bind:objectData={cablePlug1Data} isCollectable>
      <img src={cablePlug1Data.img} alt={cablePlug1Data.name} />
    </Interactable>
  {/if}

  {#if cablePlug2Data.visible}
    <Interactable posX="300" posY="400" bind:objectData={cablePlug2Data} isCollectable>
      <img src={cablePlug2Data.img} alt={cablePlug2Data.name} />
    </Interactable>
  {/if}

  {#if crimpingToolData.visible}
    <Interactable posX="400" posY="400" bind:objectData={crimpingToolData} isCollectable>
      <img src={crimpingToolData.img} alt={crimpingToolData.name} />
    </Interactable>
  {/if}

  <Interactable posX="200" posY="200" objectData={cabinetData}>
    <Cabinet bind:objectData={cabinetData} />
  </Interactable>

  <Interactable posX="300" posY="200" objectData={codeDeviceData}>
    <CodeDevice objectData={codeDeviceData} />
  </Interactable>

  <Interactable posX="400" posY="200" objectData={wallOutletData}>
    <WallOutlet bind:objectData={wallOutletData} />
  </Interactable>

  {#if accessPointData.visible}
    <Interactable posX="200" posY="300" objectData={accessPointData}>
      <AccessPoint bind:objectData={accessPointData} />
    </Interactable>
  {/if}

  {#if accessPointAnchorData.visible}
    <Interactable posX="200" posY="300" objectData={accessPointAnchorData}>
      <PlacementAnchor bind:objectData={accessPointAnchorData} />
    </Interactable>
  {/if}

  <Interactable posX="400" posY="300" objectData={doorData}>
    <Door objectData={doorData} />
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