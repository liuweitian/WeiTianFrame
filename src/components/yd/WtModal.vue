<template>
    <yd-popup v-model="show" position="bottom" :height="modalSize">
        <component v-bind:is="modalView"></component>
    </yd-popup>
</template>

<script>
    export default {
        name: "WtModal",
        methods: {
            onClose() {
                typeof this.modal.onClose === 'function' ? this.modal.onClose() : '';
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

</style>