<script lang="ts">
  import Interactable from "../Interactable.svelte";
  import Switch from "../objects/Switch.svelte";
  import Router from "../objects/Router.svelte";
  import Server from "../objects/Server.svelte";

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
    info: "To unlock the door, the security software needs to run on the server. The credentials are: admin/pw1234"
  };

  let serverData: EscapeObject = {
    name: "Server",
    type: "Server",
    img: "/objects/server.png",
    visible: true
  };
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
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        background: url("/rooms/room4.png");
        background-size: cover;
    }
</style>