<template>
    <div class="table-column-list">
        用户名是 {{ scope.row.model.getValue( column.attribute ) }}
    </div>
</template>

<script>
    export default {
        name: "demoColumn",
        props: {
            /**
             * 表单插槽参数
             * { {store, _self, column, row, $index} }
             * @see https://element.eleme.cn/#/zh-CN/component/table
             */
            scope: {
                type: Object,
                required: true,
            },

            /**
             * TableModel配置的 column项
             */
            column: {
                type: Object,
                required: true,
            }
        },
    }
</script>

<style scoped>

</style>
