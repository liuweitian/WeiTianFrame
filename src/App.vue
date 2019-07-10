<template>
    <div id="app">
        <wt-plugins></wt-plugins>
        <router-view></router-view>
    </div>
</template>

<script>
    import WtPlugins from "./components/WtPlugins";
    export default {
        name: 'app',
        components: {WtPlugins},
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

    .wt-hide {
        display: none !important;
    }

    #app .empty-text {
        text-align: center;
        color: #999;
    }
</style>
