<template>
    <el-container class="h-div wt-layout-container">
        <el-header class="wt-header">
            <el-container>
                <el-aside width="200px">
                    <div class="logo">
                        WeiTianFrame
                    </div>
                </el-aside>
                <el-container>
                    <el-menu
                            class="wt-layout-menu"
                            background-color="#409EFF"
                            text-color="#FFF"
                            :router="true"
                            mode="horizontal">
                        <el-menu-item index="/">首页</el-menu-item>
                    </el-menu>
                </el-container>
            </el-container>
        </el-header>
        <el-main class="h-div wt-layout-main">
            <slot></slot>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "layout-main"
    }
</script>

<style scoped>
    .logo {
        height: 60px;
        line-height: 60px;
        color: #fff;
        text-align: center;
    }

    .wt-layout-main {
        padding: 10px;
    }

    .wt-header {
        background-color: #409EFF;
    }
</style>
