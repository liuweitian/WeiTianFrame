<template>
    <div id="app">
        <wt-tip></wt-tip>
        <wt-modal></wt-modal>
        <wt-notice></wt-notice>

    </div>
</template>

<script>
    import WtTip from "./components/WtTip";
    import WtModal from "./components/WtModal";
    import WtNotice from "./components/WtNotice";

    export default {
        name: 'app',
        components: {WtNotice, WtModal, WtTip},
    }
</script>

<style>
</style>
