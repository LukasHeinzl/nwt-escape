<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";

  export let objectData: EscapeRouter;

  let isOverlayVisible: boolean = false;
  let dhcpMsg: string = "";
  let newRoute: string = "";
  let newVia: string = "";
  let newPort: number = 0;

  function addNewRoute() {
    if (!isValidIp(newRoute) || !isValidIp(newVia)) {
      return;
    }

    objectData.staticRoutes.set(newRoute, newVia);
    objectData = objectData;
    newRoute = "";
    newVia = "";
  }

  function checkDhcpSettings() {
    if (!objectData.dhcpEnabled) {
      objectData.isActive = false;
      dhcpMsg = "";
      return;
    }

    if (!isValidIp(objectData.dhcpNetId) || !isValidIp(objectData.dhcpNetMask)) {
      objectData.isActive = false;
      dhcpMsg = "Invalid IP address(es)";
      return;
    }

    objectData.isActive = true;
    objectData = objectData;
    dhcpMsg = "";
  }

  function isValidIp(ip: string): boolean {
    let parts = ip.split(".");

    if (parts.length !== 4) {
      return false;
    }

    for (let part of parts) {
      if (!part.match(/^[0-9]+$/)) {
        return false;
      }

      let num = parseInt(part);

      if (num < 0 || num > 255) {
        return false;
      }
    }

    return true;
  }

  function openPort() {
    if (newPort < 0 || newPort > 65535) {
      return;
    }

    objectData.unblockedPorts.push(newPort);
    objectData = objectData;
    newPort = 0;
  }

  function closePort(idx: number) {
    objectData.unblockedPorts.splice(idx, 1);
    objectData = objectData;
  }
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  <section>
    {#if objectData.needsDhcp}
      <div>
        DHCP is currently {objectData.dhcpEnabled ? "enabled" : "disabled"}.
        <button on:click={() => {objectData.dhcpEnabled = !objectData.dhcpEnabled; checkDhcpSettings()}}>
          {objectData.dhcpEnabled ? "Disable" : "Enable"}
        </button>
      </div>
      {#if objectData.dhcpEnabled}
        <label>Network ID:
          <input type="text" bind:value={objectData.dhcpNetId} on:keyup={() => checkDhcpSettings()} />
        </label>
        <label>Subnet Mask:
          <input type="text" bind:value={objectData.dhcpNetMask} on:keyup={() => checkDhcpSettings()} />
        </label>
        <span>{dhcpMsg}</span>
        <br />
      {/if}
    {/if}
    <div class="vertical">
      Static routes:
      <div>
        Add route to <input type="text" bind:value={newRoute} />
        via <input type="text" bind:value={newVia} on:change={() => addNewRoute()} />
        <button on:click={() => addNewRoute()}>Add</button>
      </div>
      <ul>
        {#each [...objectData.staticRoutes] as [route, via], i (i)}
          <li>
            {route} via {via}
            <button on:click={() => {objectData.staticRoutes.delete(route); objectData = objectData}}>Delete</button>
          </li>
        {/each}
      </ul>
    </div>
    {#if objectData.hasFirewall}
      <div class="vertical">
        Firewall - open ports:
        <div>
          <input type="number" bind:value={newPort} placeholder="Port number" on:change={() => openPort()} />
          <button on:click={() => openPort()}>Add port</button>
        </div>
        <ul>
          {#each objectData.unblockedPorts as port, i (i)}
            <li>
              {port}
              <button on:click={() => closePort(i)}>Delete</button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true} />

<style>
    section, .vertical {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>