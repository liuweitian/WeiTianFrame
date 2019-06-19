<template>
    <div id="app">
        <wt-plugins></wt-plugins>
    </div>
</template>

<script>
    import WtPlugins from "./components/WtPlugins";
    export default {
        name: 'app',
        components: {WtPlugins}
    }
</script>

<style>
    body {
        margin: 0;
    }
</style>
