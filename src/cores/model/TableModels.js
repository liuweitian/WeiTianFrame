import Models from "./Models";
import BaseModel from "./BaseModel";

export default class TableModels extends Models {
    constructor(props) {
        super(props);

        let _this = this;

        /**
         * 表格组件实例
         * 在 onCreated 事件触发时赋值
         * @type {undefined|Vue}
         */
        this.component = undefined;

        /**
         * 需要在列表中显示的字段配置
         * @type {Array}
         */
        this.columns = [
            // {
            //     attribute: 'username', // 字段名，必填
            //     view: VueComponent, // Vue组件，用来自定义展示单元格，非必填
            //     options: { width: 500 } , // 单元格的属性，非必填，见 elementUI官方文档 el-table-column 组件说明
            //     ...other, // 其它项，如果自定义了view参数，这整个column单元数据都会传入column的形式传入，可根据实际情况定义
            // },
        ];

        /**
         * 模型实例
         * 用于格式化表头label，接收搜索表单数据等
         * @type {BaseModel}
         */
        this.modelInstance = new BaseModel();

        /**
         * 搜索项字段配置
         * @type {Array}
         */
        this.searchColumns = [
            // {
            //     attribute: 'is_admin', // 属性名，请确保在 instanceModel 中已经定义，否则会报错
            //     permission: '管理员搜索', // 权限名，可以不设置，如果设置了并且用户没有该权限则搜索项不展示
            //     span: 8, // 表单项占据的列数，一行总数为24
            //     type: 'select', // 搜索项类型，目前支持的有 input, date， datetime 和 select
            //     // 私有属性列表，表单项类型独有的属性在这里定义，比如 select 的 下拉项
            //     private: {
            //         options: {
            //             0: '否',
            //             1: '是'
            //         }
            //     },
            //     // 搜索项的属性，不同的类型有特定的属性值
            //     options: {
            //         size: 'mini'
            //     }
            // }
        ];

        /**
         * 搜索表单选项
         * @type {Object}
         * @see https://element.eleme.cn/#/zh-CN/component/form
         */
        this.searchFormOptions = {};

        /**
         * 搜索表单按钮配置
         * @type {*[]}
         */
        this.searchFormButtons = [
            {
                text: '搜索', // 按钮名称
                show: true, // 是否展示，默认true
                /**
                 * 按钮属性列表
                 * @see https://element.eleme.cn/#/zh-CN/component/button
                 */
                options: {
                    size: 'mini',
                    type: 'primary'
                },
                /**
                 * 按钮事件列表
                 */
                events: {
                    click() {
                        _this.onSearchFormSubmit( ...arguments );
                    }
                }
            },
            {
                text: '重置',
                options: {
                    size: 'mini',
                    type: 'default'
                },
                show: true,
                events: {
                    click() {
                        _this.onSearchFormReset( ...arguments );
                    }
                }
            },
        ];

        /**
         * 搜索表单的高度
         * @type {number}
         */
        this.searchFormHeight = 60;

        /**
         * 是否展示搜索表单
         * @type {boolean}
         */
        this.showSearchForm = true;

        /**
         * 翻页组件的事件
         * @type {{"next-click": TableModels.onPageNextClick, "size-change": TableModels.onPageSizeChange, "current-change": TableModels.onPageCurrentChange, "prev-click": TableModels.onPagePrevClick}}
         * @private
         * @see https://element.eleme.cn/#/zh-CN/component/pagination
         */
        this._pageEvents = {
            'current-change'() {
                _this.onPageCurrentChange(...arguments)
            },
            'size-change'() {
                _this.onPageSizeChange(...arguments)
            },
            'prev-click'() {
                _this.onPagePrevClick(...arguments)
            },
            'next-click'() {
                _this.onPageNextClick(...arguments)
            },
        };

        /**
         * 分页组件选项
         * @see https://element.eleme.cn/#/zh-CN/component/pagination
         */
        this.pageOptions = {

        };

        /**
         * 分页栏的高度
         * @type {number}
         */
        this.pageHeight = 32;

        /**
         * 是否展示分页栏
         * @type {boolean}
         */
        this.showPage = true;

        /**
         * 表格组件的事件
         * @type {{select: TableModels.onTableSelect, "row-click": TableModels.onTableRowClick, "header-click": TableModels.onTableHeaderClick, "select-all": TableModels.onTableSelectAll, "cell-click": TableModels.onTableCellClick, "cell-dblclick": TableModels.onTableCellDbClick, "header-contextmenu": TableModels.onTableHeaderContextMenu, "row-contextmenu": TableModels.onTableRowContextMenu, "header-dragend": TableModels.onTableHeaderDragend, "cell-mouse-enter": TableModels.onTableCellMouseEnter, "row-dblclick": TableModels.onTableRowDbClick, "cell-mouse-leave": TableModels.onTableCellMouseLeave, "current-change": TableModels.onTableCurrentChange, "sort-change": TableModels.onTableSortChange, "selection-change": TableModels.onTableSelectionChange}}
         * @private
         * @see https://element.eleme.cn/#/zh-CN/component/table
         */
        this._tableEvents = {
            'select'() {
                _this.onTableSelect(...arguments)
            },
            'select-all'() {
                _this.onTableSelectAll(...arguments)
            },
            'selection-change'() {
                _this.onTableSelectionChange(...arguments)
            },
            'cell-mouse-enter'() {
                _this.onTableCellMouseEnter(...arguments)
            },
            'cell-mouse-leave'() {
                _this.onTableCellMouseLeave(...arguments)
            },
            'cell-click'() {
                _this.onTableCellClick(...arguments)
            },
            'cell-dblclick'() {
                _this.onTableCellDbClick(...arguments)
            },
            'row-click'() {
                _this.onTableRowClick(...arguments)
            },
            'row-contextmenu'() {
                _this.onTableRowContextMenu(...arguments)
            },
            'row-dblclick'() {
                _this.onTableRowDbClick(...arguments)
            },
            'header-click'() {
                _this.onTableHeaderClick(...arguments)
            },
            'header-contextmenu'() {
                _this.onTableHeaderContextMenu(...arguments)
            },
            'sort-change'() {
                _this.onTableSortChange(...arguments)
            },
            'current-change'() {
                _this.onTableCurrentChange(...arguments)
            },
            'header-dragend'() {
                _this.onTableHeaderDragend(...arguments)
            },
        };

        /**
         * 表格组件选项
         * @see https://element.eleme.cn/#/zh-CN/component/table
         */
        this.tableOptions = {

        };

        /**
         * 额外空间的高度
         * @type {number}
         */
        this.extraHeight = 40;

        /**
         * 是否展示额外空间
         * @type {boolean}
         */
        this.showExtra = true;
    }

    /**
     * 提交按钮点击事件
     * @param {Event} event
     */
    onSearchFormSubmit(event) {
        // do sth
    }

    /**
     * 重置按钮点击事件
     */
    onSearchFormReset() {
        // do sth
    }

    /**
     * 翻页组件事件
     * currentPage 改变时会触发
     * @param {number} index 当前页
     */
    onPageCurrentChange(index) {
        // do sth
    }

    /**
     * 翻页组件事件
     * pageSize 改变时会触发
     * @param {number} size 每页条数
     */
    onPageSizeChange(size) {
        // do sth
    }

    /**
     * 翻页组件事件
     * 用户点击上一页按钮改变当前页后触发
     * @param {number} index 当前页
     */
    onPagePrevClick(index) {
        // do sth
    }

    /**
     * 翻页组件事件
     * 用户点击下一页按钮改变当前页后触发
     * @param {number} index 当前页
     */
    onPageNextClick(index) {
        // do sth
    }

    /**
     * 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @param {number} selection
     * @param {Object} row
     */
    onTableSelect(selection, row) {
        // do sth
    }

    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     * @param {number} selection
     */
    onTableSelectAll(selection) {
        // do sth
    }

    /**
     * 当选择项发生变化时会触发该事件
     * @param {number} selection
     */
    onTableSelectionChange(selection) {
        // do sth
    }

    /**
     * 当单元格 hover 进入时会触发该事件
     * @param {Object} row
     * @param {Object} column
     * @param {Object} cell
     * @param {Event} event
     */
    onTableCellMouseEnter(row, column, cell, event) {
        // do sth
    }

    /**
     * 当单元格 hover 退出时会触发该事件
     * @param {Object} row
     * @param {Object} column
     * @param {Object} cell
     * @param {Event} event
     */
    onTableCellMouseLeave(row, column, cell, event) {
        // do sth
    }

    /**
     * 当某个单元格被点击时会触发该事件
     * @param {Object} row
     * @param {Object} column
     * @param {Object} cell
     * @param {Event} event
     */
    onTableCellClick(row, column, cell, event) {
        // do sth
    }

    /**
     * 当某个单元格被双击击时会触发该事件
     * @param {Object} row
     * @param {Object} column
     * @param {Object} cell
     * @param {Event} event
     */
    onTableCellDbClick(row, column, cell, event) {
        // do sth
    }

    /**
     * 当某一行被点击时会触发该事件
     * @param {Object} row
     * @param {Object} column
     * @param {Event} event
     */
    onTableRowClick(row, column, event) {
        // do sth
    }

    /**
     * 当某一行被鼠标右键点击时会触发该事件
     * @param {Object} row
     * @param {Object} column
     * @param {Event} event
     */
    onTableRowContextMenu(row, column, event) {
        // do sth
    }

    /**
     * 当某一行被双击时会触发该事件
     * @param {Object} row
     * @param {Object} column
     * @param {Event} event
     */
    onTableRowDbClick(row, column, event) {
        // do sth
    }

    /**
     * 当某一列的表头被点击时会触发该事件
     * @param {Object} column
     * @param {Event} event
     */
    onTableHeaderClick(column, event) {
        // do sth
    }

    /**
     * 当某一列的表头被鼠标右键点击时触发该事件
     * @param {Object} column
     * @param {Event} event
     */
    onTableHeaderContextMenu(column, event) {
        // do sth
    }

    /**
     * 当表格的排序条件发生变化的时候会触发该事件
     * @param {Object} column
     * @param {String} prop
     * @param {String} order
     */
    onTableSortChange({column, prop, order}) {
        // do sth
    }

    /**
     * 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
     * @param {Object} currentRow
     * @param {Object} oldCurrentRow
     */
    onTableCurrentChange(currentRow, oldCurrentRow) {
        // do sth
    }

    /**
     * 当拖动表头改变了列的宽度的时候会触发该事件
     * @param {Number} newWidth
     * @param {Number} oldWidth
     * @param {Object} column
     * @param {Event} event
     */
    onTableHeaderDragend(newWidth, oldWidth, column, event) {
        // do sth
    }

    /**
     * 组件事件：创建后
     * @param component
     * @see https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
     */
    onCreated(component) {
        this.component = component;
        // do sth
    }

    /**
     * 组件事件：完成前
     * @param component
     * @see https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
     */
    onBeforeMount(component) {
        // do sth
    }

    /**
     * 组件事件：完成后
     * @param component
     * @see https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
     */
    onMounted(component) {
        // do sth
    }

    /**
     * 组件事件：更新前
     * @param component
     * @see https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
     */
    onBeforeUpdate(component) {
        // do sth
    }

    /**
     * 组件事件：更新后
     * @param component
     * @see https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
     */
    onUpdated(component) {
        // do sth
    }

    /**
     * 组件事件：销毁前
     * @param component
     * @see https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
     */
    onBeforeDestroy(component) {
        // do sth
    }

    /**
     * 组件事件：销毁后
     * @param component
     * @see https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
     */
    onDestroyed(component) {
        // do sth
    }

}
