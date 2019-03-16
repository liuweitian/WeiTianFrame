<template>
    <div id="app">
        <wtf-tip></wtf-tip>
        <router-view></router-view>
    </div>
</template>

<script>
    import WtfTip from "./components/WtfTip";
    export default {
        name: 'app',
        components: {WtfTip},
    }
</script>

<style>

</style>
