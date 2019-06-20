<template>
    <span v-if="main.ui.plugin === 'element'">
        <wt-tip></wt-tip>
        <wt-modal></wt-modal>
        <wt-message-box></wt-message-box>
        <wt-notice></wt-notice>
        <wt-loading></wt-loading>
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
    import WtTip from "./element/WtTip";
    import WtModal from "./element/WtModal";
    import WtMessageBox from "./element/WtMessageBox";
    import WtNotice from "./element/WtNotice";
    import WtMessageBoxYd from "./yd/WtMessageBox";
    import WtTipYd from "./yd/WtTip";
    import WtNoticeYd from "./yd/WtNotice";
    import WtModalYd from "./yd/WtModal";
    import WtLoading from "./element/WtLoading";
    import WtLoadingYd from "./yd/WtLoading";
    export default {
        name: "WtPlugins",
        components: {
            WtLoading,
            WtNotice,
            WtMessageBox,
            WtModal,
            WtTip,
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