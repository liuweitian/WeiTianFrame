<template>
    <div id="app">
        <wt-plugins></wt-plugins>
        <wt-baidu-map></wt-baidu-map>
    </div>
</template>

<script>
    import WtPlugins from "./components/WtPlugins";
    import WtBaiduMap from "./components/baiduMap/WtBaiduMap";
    import WtIcon from "./components/WtIcon";
    export default {
        name: 'app',
        components: {WtIcon, WtBaiduMap, WtPlugins},
    }
</script>

<style>
    html,body {
        margin: 0;
        height: 100%;
    }

    #app {
        height: 100%;
    }
</style>
