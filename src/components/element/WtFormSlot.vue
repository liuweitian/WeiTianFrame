<template>
    <div class="form-slot">
        <template v-if="item.extra">
            <!--辅助节点-->
            <div v-if="item.type === 'line'" class="line"></div>

            <!--辅助节点-->
            <wt-form-title :title="item.title" v-if="item.type === 'title'"></wt-form-title>
        </template>

        <el-form-item
                :label="model.getLabel( item.attribute )"
                :prop="item.attribute"
                v-else-if="item.permission === undefined || hasPermission(item.permission)"
                class="wt-form-slot-item"
        >
            <el-input
                    v-model="model.data[ item.attribute ]"
                    v-if="item.type === 'input'"
                    v-bind="item.options"
            ></el-input>

            <el-date-picker
                    style="width: 100%;"
                    v-model="model.data[ item.attribute ]"
                    type="datetime"
                    v-bind="item.options"
                    v-if="item.type === 'datetime'"
            >
            </el-date-picker>

            <el-date-picker
                    style="width: 100%;"
                    v-model="model.data[ item.attribute ]"
                    type="date"
                    v-bind="item.options"
                    v-if="item.type === 'date'"
            >
            </el-date-picker>

            <el-select
                    v-model="model.data[ item.attribute ]"
                    v-if="item.type === 'select'"
                    v-bind="item.options"
            >
                <el-option
                        v-for="( label, value ) in item.private.options"
                        :key="value"
                        :label="label"
                        :value="value">
                </el-option>
            </el-select>
        </el-form-item>

    </div>
</template>

<script>
    import Permission from "../../cores/helpers/Permission";
    import BaseModel from "../../cores/model/BaseModel";
    import WtFormTitle from "./WtFormTitle";

    export default {
        name: "wtFormSlot",
        components: {WtFormTitle},
        props: {
            model: {
                type: BaseModel,
            },
            item: {
                type: Object,
            }
        },
        methods: {
            hasPermission(name) {
                if( name ) {
                    return Permission.hasPermission(name);
                }
                return true;
            }
        }
    }
</script>

<style scoped>
    .line {
        margin: 12px 0;
        height: 1px;
        background-color: #eee;
    }

    .el-select {
        width: 100%;
    }

    .wt-form-slot-item {
        margin-bottom: 0 !important;
    }

    .wt-form-slot-item /deep/ .el-form-item__label {
        padding-bottom: 0 !important;
    }
</style>
