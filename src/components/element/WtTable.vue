<template>
    <div class="wt-table width-100 height-100 bgg-white">
        <wt-loading-bar
                :show="table.loading"
        ></wt-loading-bar>

        <div class="wt-table-search border-light">
            <el-row :gutter="4" class="height-100">
                <el-col :span="4" class="height-100">
                    <el-button
                            v-for="(button, index) of table.getLeftButtons()"
                            :key="index"
                            v-bind="button.options || {}"
                            v-on="button.events || {}"
                            v-wt-permission="button.permission"
                    >
                        {{button.text}}
                    </el-button>
                </el-col>
                <el-col :span="14" class="height-100">
                    <wt-form
                            :model="table.model"
                            :config="table.getSearchConfig().slice(0, searchItemCount)"
                            :show-label="false"
                            :show-error-message="false"
                            :default-column-options="{lg: 6, md: 6, sm: 6, xs: 6}"
                    ></wt-form>
                </el-col>
                <el-col :span="6" class="height-100 align-right">
                    <el-button
                            type="text"
                            @click="onAdvancedSearch"
                            v-if="table.getSearchConfig().length > searchItemCount"
                    >高级搜索</el-button>
                    <el-button
                            v-for="(button, index) of table.getRightButtons()"
                            :key="index"
                            v-bind="button.options || {}"
                            v-on="button.events || {}"
                            v-wt-permission="button.permission"
                    >{{button.text}}
                    </el-button>
                </el-col>
            </el-row>
        </div>

        <div class="wt-table-container">
            <el-table
                    ref="table"
                    :empty-text="table.loading ? '加载中...' : emptyText"
                    :data="table.list"
                    border
                    height="100%"
            >

                <el-table-column
                        v-for="(column, index) of table.getColumns()"
                        :key="index"
                        :prop="column.attribute"
                        :label="table.model.getLabel( column.attribute )"
                        v-bind="column.options || {}"
                >
                    <template slot-scope="{row}">
                        <span
                                v-if="column.view === undefined"
                                v-on="column.event || {}"
                        >
                            {{row.getValue( column.attribute )}}
                        </span>
                        <component
                                v-else
                                v-bind:is="column.view"
                                v-bind="column.viewOptions || {}"
                                v-on="column.event || {}"
                        ></component>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <div class="wt-table-page">
            <el-pagination
                    :page-size="table.pageSize"
                    :current-page="table.currentPage"
                    :total="table.totalCount"
                    @current-change="onChangePage"
                    hide-on-single-page
                    layout="total, prev, pager, next"
            >
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import WtLoadingBar from "../common/WtLoadingBar";
    import BaseTable from "../../cores/model/BaseTable";
    import WtForm from "./WtForm";
    import WtModalForm from "./WtModalForm";

    export default {
        name: "WtTable",
        components: {WtForm, WtLoadingBar},

        props: {
            /**
             * 无数据时展示的内容
             */
            emptyText: {
                type: String,
                default: '暂无信息'
            },

            /**
             * 表格实例，必须是 BaseTable 的实例或者其子类的实例
             */
            table: {
                type: BaseTable,
                required: true,
            },

            /**
             * 搜索框最多展示数量
             */
            searchItemCount: {
                type: Number,
                default: 4,
            },

            /**
             * 是否将搜索条件推送到链接里
             */
            pushStatus: {
                type: Boolean,
                default: true,
            }
        },

        watch: {
            /**
             * 监听当前页码变化，如果变化则读取数据
             */
            'table.currentPage'() {
                this.pushToUrl();
            },

            /**
             * 监听搜索模型数据变化，如果变化则推送到URL中
             */
            'table.model.data': {
                deep: true,
                handler() {
                    this.pushToUrl();
                }
            },
        },

        methods: {
            /**
             * 当翻页组件的当前页变化时触发该事件
             * @param {int} afterPage 改变后的页码
             */
            onChangePage(afterPage) {
                this.table.currentPage = afterPage;
                this.onSearch();
            },

            /**
             * 查询方法
             * 正常来讲是直接调用 表格实例 的 onLoad 方法，如果有其它前置条件需要处理的可以在之类处理
             */
            onSearch() {
                this.table.onLoad();
            },

            /**
             * 从url中读取搜素内容
             */
            loadSearchData() {
                if( this.$route.query.search ) {
                    this.table.model.updateData( JSON.parse( this.$route.query.search ) );
                }
                if( this.$route.query.meta ) {
                    this.table.setMeta( JSON.parse( this.$route.query.meta ) );
                }
            },

            /**
             * 将搜索信息推送到URL中
             */
            pushToUrl() {
                if( this.pushStatus ) {
                    let search = {};
                    for ( let field of this.table.getSearchConfig() ) {
                        if( this.table.model.getSourceValue( field.attribute ) ) {
                            search[ field.attribute ] = this.table.model.getSourceValue( field.attribute );
                        }
                    }
                    search = JSON.stringify(search);

                    let query = {
                        meta: JSON.stringify(this.table.getMeta()),
                        search: search === '{}' ? undefined : search,
                    };

                    try {
                        this.$router.push( {
                            path: this.$route.path,
                            query: query
                        } );
                    } catch (e) {

                    }
                }
            },

            /**
             * 高级搜索
             */
            onAdvancedSearch() {
                this.$store.dispatch('showModal', {
                    title: '高级搜素',
                    view: WtModalForm,
                    options: {
                        model: this.table.model,
                        config: this.table.getSearchConfig()
                    },
                    events: {
                        onSubmit: ({onClose}) => {
                            onClose();
                            this.onSearch();
                        }
                    }
                });
            }
        },

        mounted() {
            // 表格组件加载完成后直接触发搜索事件来加载数据
            this.loadSearchData();
            this.onSearch();
        }
    }
</script>

<style scoped>
    .wt-table {
        position: relative;
    }

    .wt-table-search {
        height: 32px;
        padding: 10px;
        border-width: 0;
        border-bottom-width: 1px;
    }

    .wt-table-container {
        height: calc(100% - 53px - 20px - 42px);
        padding: 10px;
    }

    .wt-table-page {
        height: 32px;
        padding: 0 0 10px;
        text-align: right;
    }
</style>