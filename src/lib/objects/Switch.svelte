<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";

  export let objectData: EscapeSwitch;

  let isOverlayVisible: boolean = false;
  let enteredPassword: string = "";

  function handleConnectedDevices(data: EscapeSwitch): void {
    let hadChange: boolean = false;

    for (let device of objectData.connectedDevices) {
      let newState = true;

      if (objectData.needsConnection) {
        newState = data.hasConnection;
      }

      if (objectData.needsPOE) {
        newState &&= objectData.hasPOE;
      }

      if (objectData.blockedMACs.includes(device.macAddress)) {
        newState = false;
      }

      if (device.hasConnection !== newState) {
        hadChange = true;
      }

      device.hasConnection = newState;
    }

    if (hadChange) {
      objectData = objectData;
    }
  }

  function disableSecurity(): void {
    if (enteredPassword !== objectData.securityPassword) {
      enteredPassword = "Wrong password";
      setTimeout(() => enteredPassword = "", 1000);
      return;
    }

    objectData.securityActive = false;
  }

  function unblockMAC(index: number): void {
    objectData.blockedMACs.splice(index, 1);
    objectData.blockedMACs = objectData.blockedMACs;
    handleConnectedDevices(objectData);
  }

  $: handleConnectedDevices(objectData);
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  <section>
    {#if objectData.needsConnection && !objectData.hasConnection}
      This device does not have a network connection.
    {/if}

    {#if objectData.needsPOE}
      <button on:click={() => objectData.hasPOE = !objectData.hasPOE}>
        {#if objectData.hasPOE}
          Disable PoE
        {:else}
          Enable PoE
        {/if}
      </button>
    {/if}

    <b>Blocked MAC-addresses</b>
    {#if objectData.securityActive}
      Security password required!
      <input type="text" bind:value={enteredPassword} on:change={() => disableSecurity()}>
      <button on:click={() => disableSecurity()}>Disable security</button>
    {:else}
      {#each objectData.blockedMACs as mac, i (i)}
        <div>
          {mac}
          <button on:click={() => unblockMAC(i)}>Unblock</button>
        </div>
      {/each}
    {/if}
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