<template>
    <div class="wt-table" ref="container">
        <!--搜索-->
        <div class="wt-table-search" v-if="models.showSearchForm" :style="{ height: models.searchFormHeight + 'px' }">
            <el-form v-bind="_searchFormOptions">
                <el-row :gutter="6">
                    <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="22">
                        <el-row :gutter="6">
                            <el-col :span="item.span || 8" :key="index" v-for="(item, index) of models.searchColumns">
                                <wt-form-slot :model="models.modelInstance" :item="item"></wt-form-slot>
                            </el-col>
                        </el-row>
                    </el-col>
                    <!--搜索和重置按钮-->
                    <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="2" class="wt-table-search-buttons">
                        <el-button
                                v-for="button of models.searchFormButtons"
                                v-if=" button.show === undefined || button.show === true "
                                v-bind="button.options"
                                v-on="button.events"
                        >
                            {{button.text}}
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!--额外区域-->
        <div class="wt-table-extra" :style="{ height: models.extraHeight+ 'px' }" v-if="models.showExtra">
            <slot name="extra"></slot>
        </div>

        <!--表格组件-->
        <el-table
                v-bind="_tableOptions"
                v-on="models._tableEvents"
        >
            <el-table-column
                    v-for="column of models.columns"
                    :prop="column.attribute"
                    :label="column.label || models.modelInstance.getLabel( column.attribute )"
                    v-bind="column.options || {}"
            >
                <template slot-scope="scope">
                    <component
                            v-if="typeof column.view === 'object'"
                            v-bind:is="column.view"
                            v-bind="{ scope: scope, column: column }">
                    </component>
                    <template v-else>
                        {{scope.row.model.getValue( column.attribute )}}
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <!--翻页组件-->
        <div class="wt-table-page" v-if="models.showPage" :style="{ height: models.pageHeight+ 'px' }">
            <el-pagination v-bind="_pageOptions" v-on="models._pageEvents"></el-pagination>
        </div>
    </div>
</template>

<script>
    import TableModels from "../../cores/model/TableModels";
    import WtFormSlot from "./WtFormSlot";
    export default {
        name: "WtTable",
        components: {WtFormSlot},
        props: {
            /**
             * 用于展示属于的 TableModels
             */
            models: {
                type: TableModels,
                required: true,
            }
        },
        data() {
            return {
                /**
                 * 记录初始化状态，用于控制流程
                 */
                init: false,
            };
        },
        methods: {
            /**
             * 计算表格组件的样式
             * @returns {Object}
             * @private
             */
            _calcTableStyle() {
                let style = {};
                if (this.$refs.container) {
                    style.height = this.$refs.container.clientHeight;
                    style.height -= this.models.showSearchForm ? this.models.searchFormHeight : 0;
                    style.height -= this.models.showExtra ? this.models.extraHeight : 0;
                    style.height -= this.models.showPage ? this.models.pageHeight : 0;
                    style.height += 'px';
                }
                return style;
            },

            /**
             * 计算表单需要的数据
             * @return {Array}
             * @private
             */
            _calcTableData() {
                let data = [];
                for( let model of this.models.list ) {
                    let row = {
                        model: model,
                    };

                    for ( let column of this.models.columns ) {
                        if( column.attribute ) {
                            row[ column.attribute ] = model.getValue( column.attribute );
                        }
                    }
                    data.push( row );

                }
                return data;
            },
        },
        computed: {
            /**
             * 分页组件选项
             * @returns {Object}
             * @private
             */
            _pageOptions() {
                return Object.assign({
                    background: true,
                    layout: 'prev, pager, next',
                }, this.models.pageOptions);
            },

            /**
             * 表格选项
             * @returns {Object}
             * @private
             */
            _tableOptions() {
                if( this.init ) {
                    return Object.assign({
                        style: this._calcTableStyle(),
                        data: this._calcTableData(),
                    }, this.models.tableOptions);
                }
                return this.models.tableOptions;
            },

            /**
             * 搜索表单选项
             * @returns {{ref: string, size: string, "label-position": string} & Object}
             * @private
             */
            _searchFormOptions() {
                return Object.assign({
                    'ref': 'searchForm',
                    'label-position': 'top',
                    'size': 'mini'
                }, this.models.searchFormOptions);
            }
        },
        created() {
            this.models.onCreated( this );
            this.$emit('created');
        },
        beforeMount() {
            this.models.onBeforeMount( this );
            this.$emit('beforeMount');
        },
        mounted() {
            this.init = true;
            this.models.onMounted( this );
            this.$emit('mounted');
        },
        beforeUpdate() {
            this.models.onBeforeUpdate( this );
            this.$emit('beforeUpdate');
        },
        updated() {
            this.models.onUpdated( this );
            this.$emit('updated');
        },
        beforeDestroy() {
            this.models.onBeforeDestroy( this );
            this.$emit('beforeDestroy');
        },
        destroyed() {
            this.models.onDestroyed( this );
            this.$emit('destroyed');
        }
    }
</script>

<style scoped>
    .wt-table {
        width: 100%;
        height: 100%;
    }

    .wt-table-search {
        overflow: hidden;
    }

    .wt-table-page {
        overflow: hidden;
    }

    .wt-table-search-buttons {
        text-align: right;
        padding-top: 28px;
        height: 60px;
        overflow: hidden;
        box-sizing: border-box;
    }
</style>
