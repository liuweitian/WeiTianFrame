<template>
    <div id="app">
        <wt-tip></wt-tip>
        <router-view></router-view>
    </div>
</template>

<script>
    import WtTip from "./components/WtTip";
    export default {
        name: 'app',
        components: {WtTip},
    }
</script>

<style>

</style>
