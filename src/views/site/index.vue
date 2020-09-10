<template>
    <div class="site-index">
        <wt-table
                :table="table"
        ></wt-table>
    </div>
</template>

<script>
    import WtTable from "../../components/element/WtTable";
    import Table from "../../models/tableModels/UserTable";
    import Model from "../../models/dataModels/User";
    export default {
        name: "index",
        components: {WtTable},
        data() {
            return {
                table: Model.instanceList([], Table),
            };
        }
    }
</script>

<style scoped>
    .site-index {
        height: 100%;
    }
</style>
