<template>
    <div class="wt-baidu-map-info-window-item">
        <label>{{label}}：</label>
        <span>{{value}}</span>
    </div>
</template>

<script>
    import {InfoWindow} from "./InfoWindow";

    export default {
        name: "WtInfoWIndowText",
        props: {
            label: {
                type: String,
            },
            value: {
                type: String,
            },
            infoWindow: {
                type: InfoWindow,
            },
        }
    }
</script>

<style scoped>
    .wt-baidu-map-info-window-item label {
        color: #666;
    }
</style>
