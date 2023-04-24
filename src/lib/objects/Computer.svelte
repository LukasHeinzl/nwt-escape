<script lang="ts">
  import ObjectOverlay from "../ObjectOverlay.svelte";

  export let objectData: EscapeComputer;

  let isOverlayVisible: boolean = false;
  let inputElem: HTMLInputElement;
  let consoleElem: HTMLDivElement;
  let lines: string[] = ["user@local ~ $ "];
  let currentPc: string = "user@local";
  let sshLoginAttempt: boolean = false;
  let inputs: string[] = [];
  let inputsIndex: number = -1;

  $: if (isOverlayVisible) {
    setTimeout(() => inputElem.focus(), 100);
  }

  function handleInput(event: KeyboardEvent) {
    if (event.key !== "Enter") {
      if (event.key === "ArrowUp") {
        if (inputsIndex < inputs.length - 1) {
          inputsIndex++;
          inputElem.value = inputs[inputsIndex];
        }
      } else if (event.key === "ArrowDown") {
        if (inputsIndex > 0) {
          inputsIndex--;
          inputElem.value = inputs[inputsIndex];
        } else if (inputsIndex === 0) {
          inputsIndex--;
          inputElem.value = "";
        }
      }

      return;
    }

    let input = inputElem.value.split(" ");
    inputElem.value = "";
    let output: string;

    inputs.unshift(input.join(" "));

    if (input.length === 0) {
      output = "";
      sshLoginAttempt = false;
    } else if (input.length === 1) {
      if (sshLoginAttempt) {
        if (input[0] === "h4x0r") {
          currentPc = "admin@secserv";
          output = "";
        } else {
          output = "Permission denied, please try again.";
        }

        sshLoginAttempt = false;
      } else if (input[0] === "help") {
        output = "Commands: help, clear, exit, ssh, ls, cat";
      } else if (input[0] === "clear") {
        lines = [];
        output = "";
      } else if (input[0] === "exit") {
        if (currentPc === "user@local") {
          isOverlayVisible = false;
          output = "";
          lines = [];
        } else {
          currentPc = "user@local";
          output = "";
        }
      } else if (input[0] === "ssh") {
        output = "ssh: missing operand";
      } else if (input[0] === "ls") {
        output = currentPc === "user@local" ? "instructions.txt" : "security_server";
      } else if (input[0] === "cat") {
        output = "cat: missing operand";
      } else if (input[0] === "./security_server" && currentPc === "admin@secserv") {
        output = "Started security server";
        objectData.serverRunning = true;
        objectData = objectData;
      } else {
        output = `${input[0]}: command not found`;
      }
    } else if (input.length === 2) {
      if (input[0] === "help") {
        output = "Commands: help, clear, exit, ssh, ls, cat";
      } else if (input[0] === "clear") {
        lines = [];
        output = "";
      } else if (input[0] === "exit") {
        if (currentPc === "user@local") {
          isOverlayVisible = false;
          output = "";
          lines = [];
        } else {
          currentPc = "user@local";
          output = "";
        }
      } else if (input[0] === "./security_server" && currentPc === "admin@secserv") {
        output = "Started security server";
        objectData.serverRunning = true;
        objectData = objectData;
      } else if (input[0] === "ls") {
        output = "ls: cannot access '" + input[1] + "': No such file or directory";
      } else if (input[0] === "ssh") {
        if (input[1] === "admin@10.2.77.5") {
          if (objectData.router.unblockedPorts.includes(22)) {
            output = "Please enter password";
            sshLoginAttempt = true;
          } else {
            output = "ssh: could not connect to host";
          }
        } else {
          output = `ssh: Could not resolve hostname ${input[1]}: Name or service not known`;
        }
      } else if (input[0] === "cat") {
        if (input[1] === "instructions.txt" && currentPc === "user@local") {
          output = "Welcome to the security server!<br/>" +
            "The security server is a server that is used to store sensitive data.<br/>" +
            "It is protected by a firewall that only allows connections from the local network.<br/>" +
            "To provide security information to the door lock, the port 1234 needs to be unblocked on the firewall!";
        } else if (input[1] === "security_server" && currentPc === "admin@secserv") {
          output = "cat: binary data cannot be printed";
        } else {
          output = "cat: " + input[1] + ": No such file or directory";
        }
      } else {
        output = `${input[0]}: command not found`;
      }
    }

    lines.push(currentPc + " ~ $ " + output);
    lines = lines;
    setTimeout(() => consoleElem.scrollTop = consoleElem.scrollHeight, 100);
  }
</script>

<ObjectOverlay title={objectData.name} bind:isOverlayVisible>
  <section>
    <div bind:this={consoleElem}>
      {#each lines as line}
        <span>{@html line}</span>
      {/each}
    </div>
    <input type="text" on:keyup={(e) => handleInput(e)} bind:this={inputElem} />
  </section>
</ObjectOverlay>

<img src={objectData.img} alt={objectData.name} on:click={() => isOverlayVisible = true} />

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: "Courier New", Arial, sans-serif;
    }

    div {
        flex: 1;
        overflow-y: scroll;
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
    }

    div span {
        padding-left: 0.5rem;
    }

    input {
        width: calc(100% - 0.5rem);
        padding-left: 0.5rem;
        border: none;
        font-size: 16px;
        font-family: "Courier New", Arial, sans-serif;
    }

    input:focus {
        outline: none;
    }
</style>