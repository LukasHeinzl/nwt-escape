<script lang="ts">
    import {resyncWifi} from "../../stores";

    export let objectData: EscapeAccessPoint;

    function handleConnectedDevices(hasConnection: boolean): void {
        let hadChange: boolean = false;

        for (let device of objectData.connectedDevices) {
            if (device.hasConnection !== hasConnection) {
                hadChange = true;
            }

            device.hasConnection = hasConnection;
        }

        if (hadChange) {
            $resyncWifi++;
        }
    }

    $: handleConnectedDevices(objectData.hasConnection);
</script>

<img src={objectData.img} alt={objectData.name}/>