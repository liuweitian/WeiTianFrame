<template>
    <el-dialog
            :title="modalTitle"
            :visible.sync="show"
            :modal="false"
            :width="modalWidth"
            :close-on-click-modal="false"
            @closed="onClose"
    >
        <component v-bind:is="modalView"></component>
    </el-dialog>
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
            modalTitle() {
                return this.modal.title;
            },
            modalView() {
                return this.modal.view;
            },
            modalWidth() {
                return this.modal.width;
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