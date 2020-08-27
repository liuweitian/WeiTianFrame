<template>
    <div>
        <wt-icon
                v-for="(button, index) of column.buttons"
                :key="index"
                :name="button.icon"
                :style-data="{cursor: 'pointer', color: '#409EFF'}"
                @click.native="() => { button.onClick( {model: scope.row.model, index: scope.$index} ) }"
        >
        </wt-icon>
    </div>
</template>

<script>
    import WtIcon from "../../WtIcon";
    export default {
        name: "actionColumn",
        components: {WtIcon},
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
