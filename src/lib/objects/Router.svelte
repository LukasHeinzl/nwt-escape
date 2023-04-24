<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";

  export let objectData: EscapeRouter;

  let isOverlayVisible: boolean = false;
  let dhcpMsg: string = "";

  function checkDhcpSettings() {
    if (!objectData.dhcpEnabled) {
      objectData.isActive = false;
      dhcpMsg = "";
      return;
    }

    if (!isValidIp(objectData.dhcpNetId) || !isValidIp(objectData.dhcpNetMask) || !isValidIp(objectData.dhcpGateway)) {
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
        <label>Default Gateway:
          <input type="text" bind:value={objectData.dhcpGateway} on:keyup={() => checkDhcpSettings()} />
        </label>
        <span>{dhcpMsg}</span>
        <br />
      {/if}
    {/if}
    <div>
      Static routes:
      <ul>
        {#each [...objectData.staticRoutes] as [route, via], i (i)}
          <li>
            {route} via {via}
            <button on:click={() => {objectData.staticRoutes.delete(route); objectData = objectData}}>Delete</button>
          </li>
        {/each}
      </ul>
    </div>
  </section>
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true} />

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>