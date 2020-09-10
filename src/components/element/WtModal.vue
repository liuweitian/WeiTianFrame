<template>
    <el-dialog
            class="wt-modal"
            :title="modal.title"
            :visible.sync="show"
            :modal="false"
            :width="sizeConfig[modal.size]"
            :close-on-click-modal="false"
            @closed="hideModal"
    >
        <div class="wt-modal-container">
            <wt-loading-bar :show="true" v-if="loading"></wt-loading-bar>

            <div class="wt-overlay" v-if="loading"></div>

            <div class="wt-modal-content">
                <component
                        v-if="modal.view"
                        v-bind:is="getView( modal.view )"
                        v-bind="modal.options"
                        v-on="modal.events || {}"
                        ref="view"
                ></component>
            </div>

            <div class="wt-modal-footer">
                <el-button
                        v-for="(btn, index) of modal.buttons"
                        :key="index"
                        v-bind="btn.options || {}"
                        @click="onClose(btn)"
                >{{btn.name}}</el-button>
            </div>
        </div>

    </el-dialog>
</template>

<script>
    import WtLoadingBar from "../common/WtLoadingBar";

    export default {
        name: "WtModal",
        components: {WtLoadingBar},
        methods: {
            onClose(btn) {
                if( !this.view || this.view.modalLoading ) {
                    return true;
                }

                if( btn && btn.autoClose === true ) {
                    this.closeModal(false);
                }

                if( typeof this.view.onModalClose === 'function' ) {
                    this.view.onModalClose( btn, this.closeModal );
                } else {
                    this.closeModal(true);
                }
            },

            closeModal(runCloseEvent = false) {
                if( runCloseEvent && typeof this.modal.onClose === 'function' ) {
                    this.modal.onClose();
                }
                this.hideModal();
            },

            hideModal() {
                this.$store.dispatch('hideModal');
            },

            getView(view) {
                return typeof view === 'function' ? view() : view;
            }
        },
        computed: {
            modalId() {
                return this.modal.id;
            },

            loading() {
                if( !this.view ) {
                    return false;
                }
                return this.view && this.view.modalLoading;
            },

            modal() {
                return this.$store.state.modal;
            },
        },

        updated() {
            this.view = this.$refs.view;
        },

        data() {
            return {
                show: false,
                view: undefined,

                sizeConfig: {
                    mini: '300px',
                    small: '600px',
                    normal: '800px',
                    large: '1200px',
                }
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
    .wt-modal-content {
        max-height: 500px;
        overflow: auto;
    }

    .wt-modal /deep/ .el-dialog__body {
        padding: 20px;
    }

    .wt-modal-footer {
        overflow: hidden;
        padding-top: 20px;
    }

    .wt-modal-container {
        position: relative;
    }

    .wt-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .wt-modal {
        background-color: rgba( 0, 0, 0, .3 );
    }
</style>
