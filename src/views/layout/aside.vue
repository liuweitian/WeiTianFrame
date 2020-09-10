<template>
    <el-menu
            class="wt-menu"
            :default-active="activeId"
            active-text-color="#188ae2"
            unique-opened
            router
            :collapse="collapse"
            :collapse-transition="false"
    >

        <template v-for="(item) in menuConfig">
            <el-submenu :index="item.id" v-if="item.type === 2">
                <template slot="title">
                    <wt-icon :name="item.icon" size="14px"></wt-icon>
                    <span class="active-text-color menu-text">{{item.name}}</span>
                </template>
                <el-menu-item-group  v-for="(subItem, key2) in item.items" :key="key2">
                    <el-menu-item :index="subItem.id">
                        <wt-icon :name="subItem.icon" size="14px"></wt-icon>
                        <span class="active-text-color menu-text">{{subItem.name}}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-menu-item :index="item.id" v-else>
                <wt-icon :name="item.icon" size="14px"></wt-icon>
                <span class="active-text-color menu-text">{{item.name}}</span>
            </el-menu-item>
        </template>

    </el-menu>
</template>

<script>
    import WtIcon from "../../components/common/WtIcon";
    export default {
        name: "layout-aside",
        components: {WtIcon},
        props: {
            collapse: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                // 高亮的菜单
                activeId: this.$route.path,

                // 菜单配置
                menuConfig: [
                    {
                        id: '/',
                        type: 1, // 1表示这是一个一级菜单，2表示这是个二级菜单
                        name: '驾驶舱',
                        icon: 'wt-icon-bingzhuangtu',
                    },
                    {
                        id: '/wechat/index',
                        type: 1, // 1表示这是一个一级菜单，2表示这是个二级菜单
                        name: '微信管理',
                        icon: 'wt-icon-weixin',
                    },
                    {
                        id: '/setting',
                        type: 2, // 1表示这是一个一级菜单，2表示这是个二级菜单
                        name: '系统设置',
                        icon: 'wt-icon-shezhi',
                        items: [ // 二级菜单配置
                            {
                                id: '/user/index',
                                name: '账号管理',
                                icon: 'wt-icon-yonghu',
                            },
                            {
                                id: '/area/index',
                                name: '区域管理',
                                icon: 'wt-icon-dingwei',
                            },
                        ]
                    },
                ]
            };
        },
    }
</script>

<style scoped>
    .menu-text{
        margin-left: 20px;
    }

    .wt-menu {
        border: none;
    }
</style>