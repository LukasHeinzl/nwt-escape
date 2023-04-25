<script lang="ts">
  import Interactable from "../Interactable.svelte";
  import Switch from "../objects/Switch.svelte";
  import Router from "../objects/Router.svelte";
  import Server from "../objects/Server.svelte";
  import Computer from "../objects/Computer.svelte";
  import Door from "../objects/Door.svelte";

  let routerData: EscapeRouter = {
    name: "Router",
    type: "Router",
    img: "/objects/router.png",
    visible: true,
    needsConnection: false,
    hasConnection: true,
    macAddress: "",
    needsDhcp: false,
    dhcpEnabled: false,
    dhcpNetId: "",
    dhcpNetMask: "",
    isActive: false,
    staticRoutes: new Map<string, string>(),
    hasFirewall: true,
    unblockedPorts: []
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

  let credentialsInfo: EscapeCodeDevice = {
    name: "Server Credentials",
    img: "/objects/paper.png",
    type: "CodeDevice",
    isActive: true,
    hasConnection: false,
    needsConnection: false,
    macAddress: "",
    visible: true,
    info: "To unlock the door, the security software needs to run on the server. The credentials are: admin/h4x0r"
  };

  let serverData: EscapeObject = {
    name: "Server",
    type: "Server",
    img: "/objects/server.png",
    visible: true
  };

  let computerData: EscapeComputer = {
    name: "Computer",
    type: "Computer",
    img: "/objects/server.png",
    visible: true,
    router: routerData,
    serverRunning: false
  };

  let monitorData: EscapeObject = {
    name: "Monitor",
    type: "Monitor",
    img: "/objects/monitor.png",
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

  $: if (routerData) computerData = computerData;
  $: if (computerData) {
    doorData.hasConnection = computerData.serverRunning && routerData.unblockedPorts.includes(25565);
  }
</script>

<main>
  {#if credentialsInfo.visible}
    <Interactable posX="100" posY="100" bind:objectData={credentialsInfo} isCollectable>
      <img src={credentialsInfo.img} alt={credentialsInfo.name} />
    </Interactable>
  {/if}

  <Interactable posX="300" posY="600" objectData={switchData}>
    <Switch bind:objectData={switchData} />
  </Interactable>

  <Interactable posX="500" posY="600" objectData={routerData}>
    <Router bind:objectData={routerData} />
  </Interactable>

  <Interactable posX="500" posY="300" objectData={serverData}>
    <Server bind:objectData={serverData} />
  </Interactable>

  <Interactable posX="300" posY="300" objectData={computerData}>
    <Computer bind:objectData={computerData} />
  </Interactable>

  <Interactable posX="100" posY="200" objectData={monitorData}>
    <img src={monitorData.img} alt={monitorData.name} />
  </Interactable>

  <Interactable posX="300" posY="150" objectData={doorData}>
    <Door bind:objectData={doorData} />
  </Interactable>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        background: url("/room.png");
        background-size: cover;
    }
</style>