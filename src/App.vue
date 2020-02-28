<template>
    <div id="app">
        <wt-plugins></wt-plugins>
        <router-view v-if="!forbidden.state"></router-view>
        <not-allow v-else></not-allow>
    </div>
</template>

<script>
    import NotAllow from "./views/error/notAllow";
    import WtPlugins from "./components/WtPlugins";
    import Permission from "./cores/helpers/Permission";
    export default {
        name: 'app',
        components: {WtPlugins, NotAllow},
        computed: {
            forbidden() {
                return this.$store.state.forbidden;
            }
        }
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
