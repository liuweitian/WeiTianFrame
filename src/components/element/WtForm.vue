<template>
    <div class="wt-form">
        <el-row :gutter="4">
            <el-col
                    class="wt-form-item"
                    v-for="(item, index) of config"
                    :key="index"
                    v-bind="getColumnOptions(item)"
            >
                <div class="wt-form-item-label text-regular" v-if="showLabel && item.attribute">
                    {{model.getLabel( item.attribute )}}
                </div>

                <component
                        v-bind:is="item.view"
                        v-bind="getOptions(item)"
                        v-on="item.events || {}"
                        v-model="model.data[ item.attribute ]"
                        class="width-100"
                ></component>

                <div class="wt-form-item-error-message text-danger" v-if="showErrorMessage && item.attribute">
                    {{ model.errors[ item.attribute ] && model.errors[ item.attribute ].join(', ')}}
                </div>

            </el-col>
        </el-row>

    </div>
</template>

<script>
    import AppModel from "../../models/baseModels/AppModel";

    export default {
        name: "WtForm",
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

            /**
             * 是否展示 label
             */
            showLabel: {
                type: Boolean,
                default: true,
            },

            /**
             * 是否展示 错误信息
             */
            showErrorMessage: {
                type: Boolean,
                default: true,
            },

            /**
             * 单元格的默认参数
             */
            defaultColumnOptions: {
                type: Object,
                default: () => {
                    return {
                        lg: 12,
                        md: 12,
                        sm: 24,
                        xs: 24,
                    };
                }
            }
        },

        methods: {
            /**
             * 获取单元格参数
             * @param {{attribute, columnOptions, view, options}} item
             * @returns {*}
             */
            getColumnOptions(item) {
                return Object.assign({}, item.columnOptions, this.defaultColumnOptions);
            },

            /**
             * 获取空间参数
             * @param {{attribute, columnOptions, view, options}} item
             * @returns {*}
             */
            getOptions(item) {
                return Object.assign({}, item.options, {
                    clearable: true,
                    placeholder: this.model.getLabel( item.attribute )
                });
            }
        }
    }
</script>

<style scoped>
    .wt-form {
        overflow: hidden;
    }

    .wt-form-item-label {
        font-size: 12px;
        height: 18px;
        line-height: 18px;
    }

    .wt-form-item-error-message {
        font-size: 12px;
        height: 18px;
        line-height: 18px;
    }
</style>