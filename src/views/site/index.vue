<template>
    <div class="site-index">
        <wt-table
                :models="models"
                :page-options="{total: 30}"
        >
            <div slot="extra" style="line-height: 40px;">
                这是一个表格组件，这句话使用表格组件的额外区域插槽展示
            </div>
        </wt-table>
    </div>
</template>

<script>
    import WtTable from "../../components/element/WtTable";
    import UserTable from "../../models/tableModels/UserTable";
    import User from "../../models/dataModels/User";
    export default {
        name: "index",
        components: {WtTable},
        data() {
            return {
                models: User.instanceList([
                    { username: '张三', password: '123456', phone: 13267722052 },
                    { username: '李四', password: '654321', phone: 15900100791 },
                    { username: '王五', password: '8888888', phone: null },
                    { username: '赵六', password: '0000000', phone: '020-6444882672' },
                ], UserTable),
            };
        },
    }
</script>

<style scoped>
    .site-index {
        height: 100%;
    }
</style>
