<template>
    <el-container class="height-100">
        <el-header class="wt-layout-header bgg-primary" v-if="showHeader">
            <el-container>
                <el-aside :width="asideWidth">
                    <div class="logo">
                        WeiTianFrame
                    </div>
                </el-aside>
                <el-container>

                </el-container>
            </el-container>
        </el-header>
        <el-main class="height-100 wt-layout-main">
            <el-container class="height-100">
                <el-aside :width="asideWidth" v-if="showAside">

                </el-aside>
                <el-main class="wt-layout-content bgg-main" :style="layoutStyle">

                    <el-breadcrumb separator="/" v-if="showBreadcrumb" class="wt-layout-breadcrumb">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item
                            v-for="(item, index) in breadcrumb"
                            :key="index"
                        >
                            {{item.name}}
                        </el-breadcrumb-item>
                        <el-breadcrumb-item v-if="route.name !== '首页'">
                            {{route.name}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>

                    <div class="wt-layout-slot" :class="showBreadcrumb ? 'has-breadcrumb' : 'height-100'">
                        <slot></slot>
                    </div>

                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
    // 侧边宽度
    const defaultWidth = '300px';

    export default {
        name: "layout-main",

        data() {
            return {
                // 侧边宽度
                asideWidth: defaultWidth,
            };
        },

        computed: {
            route() {
                return this.$route;
            },
            showHeader() {
                let meta = this.$route.meta || {};
                return meta.showHeader === undefined ? true : meta.showHeader;
            },
            showAside() {
                let meta = this.$route.meta || {};
                return meta.showAside === undefined ? true : meta.showAside;
            },
            showBreadcrumb() {
                let meta = this.$route.meta || {};
                return meta.showBreadcrumb === undefined ? true : meta.showBreadcrumb;
            },
            breadcrumb() {
                let meta = this.$route.meta || {};
                return Array.isArray( meta.breadcrumb ) ? meta.breadcrumb : [];
            },
            layoutStyle() {
                let meta = this.$route.meta || {};
                return meta.style || {padding: '10px 20px 20px 20px'};
            },

            isOpen() {
                return this.asideWidth === defaultWidth;
            }
        },

        methods: {
            onToggle() {
                this.asideWidth = this.isOpen ? '56px' : defaultWidth;
            },
        }
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
        padding: 0;
    }

    .wt-layout-header {
        padding: 0;
    }

    .wt-layout-content {
        overflow: hidden;
    }

    .wt-layout-breadcrumb {
        height: 24px;
        line-height: 24px;
        margin-bottom: 10px;
    }

    .has-breadcrumb {
        height: calc( 100% - 34px );
        overflow: auto;
    }
</style>
