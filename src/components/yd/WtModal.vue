<template>
    <yd-popup v-model="show" position="bottom" :height="modalSize">
        <yd-navbar v-if="modalTitle" :title="modalTitle" height=".7rem">
            <span slot="left" v-on:click="onClose('cancel')">取消</span>
            <span slot="right" v-on:click="onClose('confirm')">确认</span>
        </yd-navbar>
        <component v-bind:is="modalView"></component>
    </yd-popup>
</template>

<script>
    export default {
        name: "WtModal",
        methods: {
            onClose(type) {
                typeof this.modal.onClose === 'function' ? this.modal.onClose(type, this.closeModal) : '';
            },
            closeModal() {
                this.$store.dispatch('hideModal');
            }
        },
        computed: {
            modalId() {
                return this.modal.id;
            },
            modalView() {
                return this.modal.view;
            },
            modalSize() {
                return this.modal.size;
            },
            modalTitle() {
                return this.modal.title;
            },
        },
        data() {
            let modal = this.$store.state.modal;
            return {
                modal: modal,
                show: false,
            };
        },
        watch: {
            modalId(id) {
                this.show = id ? true : false;
            }
        }
    }
</script>

<style scoped>
    span {
        color: #333;
    }
</style>