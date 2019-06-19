<template>
    <div id="app">
        <wt-tip></wt-tip>
        <wt-modal></wt-modal>
        <wt-notice></wt-notice>
        <wt-message-box></wt-message-box>
    </div>
</template>

<script>
    import WtTip from "./components/WtTip";
    import WtModal from "./components/WtModal";
    import WtNotice from "./components/WtNotice";
    import WtMessageBox from "./components/WtMessageBox";

    export default {
        name: 'app',
        components: {WtMessageBox, WtNotice, WtModal, WtTip}
    }
</script>

<style>
    body {
        margin: 0;
    }
    #app {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 12px;
    }
</style>
