<template>
    <wt-form
        :model="model2"
        :config="config"
    ></wt-form>
</template>

<script>
    import WtForm from "./WtForm";
    import AppModel from "../../models/baseModels/AppModel";
    export default {
        name: "WtModalForm",
        components: {WtForm},

        props: {
            /**
             * 模型实例
             */
            model: {
                type: AppModel,
                required: true,
            },

            /**
             * 表单配置
             */
            config: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                model2: new this.model.constructor( this.model.getSourceData() ),

                modalLoading: false,
            };
        },

        watch: {
            'model.errors': {
                deep: true,
                handler() {
                    this.model2.updateAttribute({
                        errors: this.model.errors
                    });
                }
            }
        },

        methods: {
            onLoading() {
                this.modalLoading = true;
            },
            onLoaded() {
                this.modalLoading = false;
            },

            onModalClose(btn, closeHandler) {
                if( btn && btn.type === 'submit' ) {
                    this.model.updateData( this.model2.getSourceData() );

                    let eventName = btn.type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());

                    this.$emit('on' + eventName, {
                        onClose: closeHandler,
                        onLoading: this.onLoading,
                        onLoaded: this.onLoaded,
                    });
                } else {
                    closeHandler();
                }
            }
        }
    }
</script>

<style scoped>

</style>