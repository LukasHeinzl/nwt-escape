<script lang="ts">
    import {resyncRoom} from "../../stores";

    export let objectData: EscapeAccessPoint;
    let lastHasConnection: boolean = objectData.hasConnection;

    function handleConnectedDevices(hasConnection: boolean): void {
        if (hasConnection === lastHasConnection) {
            return;
        }

        lastHasConnection = hasConnection;

        for (let device of objectData.connectedDevices) {
            device.hasConnection = hasConnection;
        }

        $resyncRoom++;
    }

    $: handleConnectedDevices(objectData.hasConnection);
</script>

<img src={objectData.img} alt={objectData.name}/>