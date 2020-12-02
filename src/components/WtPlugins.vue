<template>
    <span v-if="main.ui.plugin === 'element'">
        <wt-tip-el></wt-tip-el>
        <wt-modal-el></wt-modal-el>
        <wt-message-box-el></wt-message-box-el>
        <wt-notice-el></wt-notice-el>
        <wt-loading-el></wt-loading-el>
    </span>
</template>

<script>
    import main from '../configs/main';
    import WtTipEl from "./element/WtTip";
    import WtModalEl from "./element/WtModal";
    import WtMessageBoxEl from "./element/WtMessageBox";
    import WtNoticeEl from "./element/WtNotice";
    import WtLoadingEl from "./element/WtLoading";
    export default {
        name: "WtPlugins",
        components: {
            WtLoadingEl,
            WtNoticeEl,
            WtMessageBoxEl,
            WtModalEl,
            WtTipEl,
        },
        data() {
            return {
                main: main,
            };
        }
    }
</script>

<style scoped>

</style>