<template>
    <div class="title">
        <el-row>
            <el-col :span="18" v-html="title" :style="{fontSize: size, fontWeight: 'bold'}">
            </el-col>
            <el-col :span="6" class="button">
                <el-button
                        v-wt-permission="button.permission"
                        :type="button.type || 'text'"
                        :key="index"
                        v-for="(button, index) of buttons"
                        size="mini"
                        @click="button.onClick(id)"
                        v-if="button.show === undefined || button.show === true"
                >
                    <wt-icon weight="0px" v-if="button.icon" :name="button.icon"></wt-icon>
                    {{button.text}}
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import WtIcon from "../WtIcon";
    export default {
        name: "wtFormTitle",
        components: {WtIcon},
        props: {
            id: {
                type: [String, Number],
            },
            title: {
                type: String,
                required: true,
            },
            buttons: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            size: {
                type: String,
                default: '16px'
            },
        }
    }
</script>

<style scoped>
    .title {
        font-size: 16px;
        height: 30px;
        line-height: 30px;
    }

    .button {
        text-align: right;
        height: 30px;
        line-height: 30px;
    }

    .button button {
        position: relative;
        top: -2px;
    }
</style>
