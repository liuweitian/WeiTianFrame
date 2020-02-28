<template>
    <baidu-map
            ref="mapDom"
            class="map-node"
            :center="center"
            :zoom="zoom"
            :map-type="mapType"
            :scroll-wheel-zoom="true"
            :map-click="false"
            @ready="onReady"
    >
    </baidu-map>
</template>

<script>
    import data from './data';
    import props from './props';
    import methods from './methods';

    export default {
        name: "wt-baidu-map",
        data: data,
        props: props,
        methods: methods,
    }
</script>

<style scoped>
    .map-node {
        width: 100%;
        heighT: 100%;
    }
</style>
