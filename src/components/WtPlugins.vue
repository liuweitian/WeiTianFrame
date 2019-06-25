<template>
    <span v-if="main.ui.plugin === 'element'">
        <wt-tip-el></wt-tip-el>
        <wt-modal-el></wt-modal-el>
        <wt-message-box-el></wt-message-box-el>
        <wt-notice-el></wt-notice-el>
        <wt-loading-el></wt-loading-el>
    </span>
    <span v-else-if="main.ui.plugin === 'yd'">
        <wt-message-box-yd></wt-message-box-yd>
        <wt-tip-yd></wt-tip-yd>
        <wt-notice-yd></wt-notice-yd>
        <wt-modal-yd></wt-modal-yd>
        <wt-loading-yd></wt-loading-yd>
    </span>
</template>

<script>
    import main from '../configs/main';
    import WtTipEl from "./element/WtTip";
    import WtModalEl from "./element/WtModal";
    import WtMessageBoxEl from "./element/WtMessageBox";
    import WtNoticeEl from "./element/WtNotice";
    import WtLoadingEl from "./element/WtLoading";
    import WtMessageBoxYd from "./yd/WtMessageBox";
    import WtTipYd from "./yd/WtTip";
    import WtNoticeYd from "./yd/WtNotice";
    import WtModalYd from "./yd/WtModal";
    import WtLoadingYd from "./yd/WtLoading";
    export default {
        name: "WtPlugins",
        components: {
            WtLoadingEl,
            WtNoticeEl,
            WtMessageBoxEl,
            WtModalEl,
            WtTipEl,
            WtMessageBoxYd,
            WtTipYd,
            WtNoticeYd,
            WtModalYd,
            WtLoadingYd,
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