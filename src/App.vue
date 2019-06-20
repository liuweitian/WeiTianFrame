<template>
    <div id="app">
        <wt-plugins></wt-plugins>
    </div>
</template>

<script>
    import WtPlugins from "./components/WtPlugins";
    export default {
        name: 'app',
        components: {WtPlugins},
        mounted() {
            this.$store.dispatch("showModal", {
                title: "模态框标题",
                size: "300px",
                view: undefined,
                options: {},
            });
        }
    }
</script>

<style>
    body {
        margin: 0;
    }
</style>
