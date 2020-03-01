<template>
    <el-dialog
            :title="modalTitle"
            :visible.sync="show"
            :modal="false"
            :width="modalSize"
            :close-on-click-modal="false"
            @closed="onClose"
    >
        <component v-bind:is="modalView" v-bind="modalOptions"></component>
    </el-dialog>
</template>

<script>
    export default {
        name: "WtModal",
        methods: {
            onClose() {
                if( typeof this.modal.onClose === 'function' ) {
                    this.modal.onClose( Object.assign( {}, this.$store.state.modal.options ) );
                }
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
                return Object.assign({}, this.modal.view);
            },
            modalSize() {
                return this.modal.size;
            },
            modalOptions() {
                return this.modal.options;
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
                this.show = !!id;
            }
        }
    }
</script>

<style scoped>

</style>
