<template>
    <div id="app">
        <wt-plugins></wt-plugins>
    </div>
</template>

<script>
    import WtPlugins from "./components/WtPlugins";
    import WtBaiduMap from "./components/baiduMap/WtBaiduMap";
    export default {
        name: 'app',
        components: {WtPlugins},
    }
</script>

<style>
    body {
        margin: 0;
    }

    #app {
        height: 100%;
    }
</style>
