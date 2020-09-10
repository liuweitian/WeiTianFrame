import BaseModels from "./BaseModels";
import AppModel from "../../models/baseModels/AppModel";
import Api from "../call/Api";
import store from "../../store";
import ExportFactories from "../../queue/ExportFactories";
import Export from "../../models/dataModels/Export";
import WtModalForm from "../../components/element/WtModalForm";
import ar from "element-ui/src/locale/lang/ar";

export default class BaseTable extends BaseModels {
    /**
     * 搜索模型
     * 必须设置，否则搜索功能会有问题
     * @type {AppModel}
     */
    static Model = AppModel;

    /**
     * 新建功能的数据模型
     * 该模型必须设置一个名为 getFormConfig 的成员方法，用于定义新建表单，结构和 getSearchConfig 方法返回的类似
     * 如果不设置的话，会默认使用搜索模型
     * @type {undefined}
     */
    static CreateModel = undefined;

    /**
     * 新建按钮的权限
     * @type {string}
     */
    static CreateBtnPermission = '';

    /**
     * 导出按钮的权限
     * @type {string}
     */
    static ExportBtnPermission = '';

    constructor(list = [], searchData = {}) {
        super(list);

        /**
         * 模型实例
         * @type {BaseModel}
         */
        this.model = new this.constructor.Model( searchData );

        /**
         * 是否有查询正在进行
         * @type {boolean}
         */
        this.loading = false;

        /**
         * 列表名称，主要用于导出时展示
         * @type {string}
         */
        this.name = '列表';

        /**
         * 项目总数
         * @type {number}
         */
        this.totalCount = 0;

        /**
         * 每页个数
         * @type {number}
         */
        this.pageSize = 20;

        /**
         * 当前页
         * @type {number}
         */
        this.currentPage = 1;

        /**
         * 页数
         * @type {number}
         */
        this.pageCount = 0;
    }

    /**
     * 获取表格配置
     * @returns {*[]}
     */
    getColumns() {
        return [];
    }

    /**
     * 获取搜索配置
     */
    getSearchConfig() {
        return [];
    }

    /**
     * 获取左侧按钮
     */
    getLeftButtons() {
        return [
            {
                text: '新建',
                permission: this.constructor.CreateBtnPermission,
                options: {
                    type: 'primary'
                },
                events: {
                    click: () => {
                        this.onCreate();
                    }
                }
            }
        ];
    }

    /**
     * 获取右侧按钮
     * @returns {*[]}
     */
    getRightButtons() {
        return [
            {
                text: '搜索',
                options: {
                    type: 'primary',
                    plain: '',
                },
                events: {
                    click: () => {
                        this.currentPage = 1;
                        this.onLoad();
                    }
                }
            },
            {
                text: '导出',
                permission: this.constructor.ExportBtnPermission,
                options: {
                    type: 'primary',
                    plain: '',
                },
                events: {
                    click: () => {
                        this.onExport();
                    }
                }
            },

        ];
    }

    /**
     * 设置 meta
     * @param {int} currentPage 当前页
     * @param {int} pageCount 页数
     * @param {int} perPage 单页条数
     * @param {int} totalCount 总条数
     */
    setMeta({ currentPage, pageCount, perPage, totalCount }) {
        this.currentPage = currentPage;
        this.pageCount = pageCount;
        this.pageSize = perPage;
        this.totalCount = totalCount;
    }

    /**
     * 获取 meta
     * @returns {{pageCount: number, pageSize: number, currentPage: number, totalCount: number}}
     */
    getMeta() {
        return {
            currentPage: this.currentPage,
            pageCount: this.pageCount,
            pageSize: this.pageSize,
            totalCount: this.totalCount
        };
    }

    /**
     * 加载列表
     * @param {function} callback 接口调用完成后的回调函数
     */
    onLoad(callback) {
        this.loading = true;
        let params = Object.assign({}, this.model.getSearchParams(), {
            page: this.currentPage,
            page_size: this.pageSize
        });
        this.constructor.Model.list(params, ({type, data}) => {
            this.loading = false;
            if( type === 'success' ) {
                this.updateList( data.models.list );

                this.setMeta( data.meta );
            }
            typeof callback === 'function' ? callback({type, data}) : '';
        });
    }

    /**
     * 导出
     * @returns {boolean}
     */
    onExport() {
        if( this.loading ) {
            return false;
        }

        if( this.totalCount < 1 ) {
            this.showTip({
                text: '无内容，请调整筛选条件',
                type: 'error'
            });
            return false;
        }

        this.loading = true;

        let urlItem = Api.instance().setUrlPath(this.constructor.Model.ListApi).getUrlItem();

        let params = {
            api: urlItem.url,
            name: this.name,
            export_params: this.model.getSearchParams(),
            total_count: this.totalCount,
            page_size: this.pageSize
        };

        let exportModel = new Export(params);

        exportModel.create( ({type, data}) => {
            this.loading = false;

            if( type !== 'success' ) {
                this.showTip({
                    text: data.message,
                    type: 'error'
                });
                return false;
            }

            store.commit('push', {
                target: store.state.queueList,
                data: [
                    new ExportFactories({
                        id: data.data.id
                    }),
                ],
            });
            this.showTip({
                text: this.name + '导出中，请稍等',
                type: 'info'
            });
        } );
    }

    /**
     * 新建按钮点击事件
     * @param {object} defaultData 新建模型默认的数据
     */
    onCreate(defaultData) {
        let Model = this.constructor.CreateModel || this.constructor.Model;
        let model = new Model(defaultData);

        this.showModal({
            title: '新建',
            options: {
                model: model,
                config: model.getFormConfig(),
            },
            view: WtModalForm,
            events: {
                onSubmit: ({ onClose, onLoading, onLoaded }) => {
                    onLoading();

                    model.create(({type, data}) => {
                        onLoaded();
                        if( type === 'success' ) {
                            onClose();
                            this.onLoad();
                        }
                    })
                }
            }
        });
    }

    /**
     * 弹出模态框
     * @param options
     */
    showModal(options) {
        store.dispatch('showModal', options);
    }

    /**
     * 弹出轻提示框
     * @param {object} options
     */
    showTip(options) {
        store.dispatch('showTip', options);
    }
}