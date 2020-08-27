<template>
    <div id="app">
        <wt-plugins></wt-plugins>
        <layout-main v-if="!forbidden.state">
            <router-view></router-view>
        </layout-main>
        <not-allow v-else></not-allow>
    </div>
</template>

<script>
    import LayoutMain from './views/layout/main';
    import NotAllow from "./views/error/notAllow";
    import WtPlugins from "./components/WtPlugins";
    export default {
        name: 'app',
        components: {WtPlugins, NotAllow, LayoutMain},
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
</style>
