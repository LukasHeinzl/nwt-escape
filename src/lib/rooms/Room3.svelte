<script lang="ts">
  import Interactable from "../Interactable.svelte";
  import CodeDevice from "../objects/CodeDevice.svelte";
  import PlacementAnchor from "../objects/PlacementAnchor.svelte";
  import Cabinet from "../objects/Cabinet.svelte";
  import WallOutlet from "../objects/WallOutlet.svelte";
  import Door from "../objects/Door.svelte";
  import PatchPanel from "../objects/PatchPanel.svelte";
  import Switch from "../objects/Switch.svelte";
  import Router from "../objects/Router.svelte";
  import RoutedCodeDevice from "../objects/RoutedCodeDevice.svelte";
  import RoutedDoorLock from "../objects/RoutedDoorLock.svelte";

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

  let ethernetCableData: EscapeObject = {
    name: "Ethernet cable",
    img: "/objects/ethernet_cable.png",
    type: "EthernetCable",
    visible: true
  };

  let codeDeviceData: EscapeCodeDevice = {
    name: "Code Device",
    img: "/objects/rack_code_device.png",
    type: "CodeDevice",
    info: "The secret code is 80443",
    isActive: false,
    needsConnection: true,
    hasConnection: false,
    visible: true,
    macAddress: ""
  };

  let codeDeviceAnchorData: EscapePlacementAnchor = {
    name: "Code Device Anchor",
    img: "",
    type: "PlacementAnchor",
    potentialDevices: [codeDeviceData],
    visible: true
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

  let switchData: EscapeSwitch = {
    name: "Switch",
    type: "Switch",
    img: "/objects/switch.png",
    visible: true,
    needsPOE: false,
    hasPOE: false,
    needsConnection: false,
    hasConnection: true,
    securityActive: false,
    securityPassword: "",
    macAddress: "",
    blockedMACs: [],
    connectedDevices: []
  };

  let routerData: EscapeRouter = {
    name: "Router",
    type: "Router",
    img: "/objects/router.png",
    visible: true,
    needsConnection: false,
    hasConnection: true,
    macAddress: "",
    needsDhcp: true,
    dhcpEnabled: false,
    dhcpNetId: "",
    dhcpNetMask: "",
    isActive: false,
    staticRoutes: new Map<string, string>(),
    hasFirewall: false,
    unblockedPorts: []
  };

  let routedCodeDeviceData: EscapeRoutedCodeDevice = {
    name: "Routed Code Device",
    type: "RoutedCodeDevice",
    img: "/objects/rack_code_device.png",
    visible: true,
    needsConnection: true,
    hasConnection: false,
    macAddress: "",
    codeDevice: codeDeviceData,
    router: routerData,
    switch: switchData
  };

  let routedCodeDeviceAnchorData: EscapePlacementAnchor = {
    name: "Routed Code Device Anchor",
    img: "",
    type: "PlacementAnchor",
    potentialDevices: [routedCodeDeviceData],
    visible: true
  };

  let patchPanelData: EscapePatchPanel = {
    name: "Patch Panel",
    type: "PatchPanel",
    img: "/objects/patch_panel.png",
    visible: true,
    hasSwitch: true,
    switch: switchData,
    outlets: []
  };

  let routedDoorLockData: EscapeRoutedDoorLock = {
    name: "Routed Door Lock",
    type: "RoutedDoorLock",
    img: "/objects/door_lock.png",
    visible: true,
    needsConnection: true,
    hasConnection: false,
    macAddress: "",
    door: doorData,
    router: routerData
  };

  let routedDoorLockAnchorData: EscapePlacementAnchor = {
    name: "Routed Door Lock Anchor",
    img: "",
    type: "PlacementAnchor",
    potentialDevices: [routedDoorLockData],
    visible: true
  };

  let cabinetData: EscapeCabinet = {
    name: "Cabinet",
    img: "/objects/cabinet.png",
    type: "Cabinet",
    contents: [ethernetCableData, routedDoorLockData],
    pin: "80443",
    unlocked: false,
    needsConnection: false,
    hasConnection: false,
    macAddress: "",
    needsPin: true
  };

  let wallOutlet1Data: EscapeWallOutlet = {
    name: "Wall Outlet 1",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: true,
    hasConnection: true,
    potentialDevices: [routedDoorLockData],
    visible: true,
    macAddress: ""
  };

  let wallOutlet2Data: EscapeWallOutlet = {
    name: "Wall Outlet 2",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: true,
    hasConnection: true,
    potentialDevices: [routedDoorLockData],
    visible: true,
    macAddress: ""
  };

  let wallOutlet3Data: EscapeWallOutlet = {
    name: "Wall Outlet 3",
    img: "/objects/wall_outlet.png",
    type: "WallOutlet",
    connectedDeviceIdx: -1,
    needsConnection: true,
    hasConnection: true,
    potentialDevices: [routedDoorLockData],
    visible: true,
    macAddress: ""
  };

  $: {
    if (codeDeviceData.visible && !codeDeviceAnchorData.visible && !patchPanelData.outlets.includes(codeDeviceData)) {
      patchPanelData.outlets.push(codeDeviceData);
    }

    if (routedCodeDeviceData.visible && !routedCodeDeviceAnchorData.visible && !patchPanelData.outlets.includes(routedCodeDeviceData)) {
      patchPanelData.outlets.push(routedCodeDeviceData);
    }

    patchPanelData = patchPanelData;
  }

  $: if (routerData) {
    routedCodeDeviceData = routedCodeDeviceData;
    routedDoorLockData = routedDoorLockData;
  }
  $: if (patchPanelData) switchData = switchData;
  $: if (routedCodeDeviceData) codeDeviceData = codeDeviceData;
  $: if (routedDoorLockData) doorData = doorData;
</script>

<main>
  {#if patchCable1Data.visible}
    <Interactable posX="100" posY="100" bind:objectData={patchCable1Data} isCollectable>
      <img src={patchCable1Data.img} alt={patchCable1Data.name} />
    </Interactable>
  {/if}

  {#if patchCable2Data.visible}
    <Interactable posX="300" posY="100" bind:objectData={patchCable2Data} isCollectable>
      <img src={patchCable2Data.img} alt={patchCable2Data.name} />
    </Interactable>
  {/if}

  {#if codeDeviceData.visible && codeDeviceAnchorData.visible}
    <Interactable posX="100" posY="400" bind:objectData={codeDeviceData} isCollectable>
      <img src={codeDeviceData.img} alt={codeDeviceData.name} />
    </Interactable>
  {/if}

  {#if codeDeviceData.visible && !codeDeviceAnchorData.visible}
    <Interactable posX="220" posY="400" objectData={codeDeviceData}>
      <CodeDevice bind:objectData={codeDeviceData} />
    </Interactable>
  {/if}

  {#if codeDeviceAnchorData.visible}
    <Interactable posX="220" posY="400" objectData={codeDeviceAnchorData}>
      <PlacementAnchor bind:objectData={codeDeviceAnchorData} />
    </Interactable>
  {/if}

  {#if routedCodeDeviceData.visible && routedCodeDeviceAnchorData.visible}
    <Interactable posX="100" posY="430" bind:objectData={routedCodeDeviceData} isCollectable>
      <img src={routedCodeDeviceData.img} alt={routedCodeDeviceData.name} />
    </Interactable>
  {/if}

  {#if routedCodeDeviceData.visible && !routedCodeDeviceAnchorData.visible}
    <Interactable posX="300" posY="430" objectData={routedCodeDeviceData}>
      <RoutedCodeDevice bind:objectData={routedCodeDeviceData} />
    </Interactable>
  {/if}

  {#if routedCodeDeviceAnchorData.visible}
    <Interactable posX="300" posY="430" objectData={routedCodeDeviceAnchorData}>
      <PlacementAnchor bind:objectData={routedCodeDeviceAnchorData} />
    </Interactable>
  {/if}

  <Interactable posX="100" posY="500" objectData={cabinetData}>
    <Cabinet bind:objectData={cabinetData} />
  </Interactable>

  <Interactable posX="400" posY="200" objectData={wallOutlet1Data}>
    <WallOutlet bind:objectData={wallOutlet1Data} />
  </Interactable>

  <Interactable posX="400" posY="300" objectData={wallOutlet2Data}>
    <WallOutlet bind:objectData={wallOutlet2Data} />
  </Interactable>

  <Interactable posX="400" posY="400" objectData={wallOutlet3Data}>
    <WallOutlet bind:objectData={wallOutlet3Data} />
  </Interactable>

  <Interactable posX="300" posY="150" objectData={doorData}>
    <Door bind:objectData={doorData} />
  </Interactable>

  <Interactable posX="300" posY="500" objectData={patchPanelData}>
    <PatchPanel bind:objectData={patchPanelData} />
  </Interactable>

  <Interactable posX="300" posY="600" objectData={switchData}>
    <Switch bind:objectData={switchData} />
  </Interactable>

  <Interactable posX="500" posY="600" objectData={routerData}>
    <Router bind:objectData={routerData} />
  </Interactable>

  {#if !routedDoorLockAnchorData.visible}
    <Interactable posX="500" posY="100" objectData={routedDoorLockData}>
      <RoutedDoorLock bind:objectData={routedDoorLockData} />
    </Interactable>
  {/if}

  {#if routedDoorLockAnchorData.visible}
    <Interactable posX="500" posY="100" objectData={routedDoorLockAnchorData}>
      <PlacementAnchor bind:objectData={routedDoorLockAnchorData} />
    </Interactable>
  {/if}
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        background: url("/rooms/room3.png");
        background-size: cover;
    }
</style>