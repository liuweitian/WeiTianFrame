<template>
    <div id="app" class="height-100 width-100">
        <wt-plugins></wt-plugins>
        <div class="height-100" v-if="show">
            <layout-main v-if="!forbidden.state">
                <router-view></router-view>
            </layout-main>
            <not-allow v-else></not-allow>
        </div>
    </div>
</template>

<script>
    import LayoutMain from './views/layout/main';
    import NotAllow from "./views/error/403";
    import WtPlugins from "./components/WtPlugins";
    import Browser from "./cores/helpers/Browser";
    import main from './configs/main';
    import BaseFactories from "./queue/src/BaseFactories";
    export default {
        name: 'app',
        components: {WtPlugins, NotAllow, LayoutMain},
        computed: {
            forbidden() {
                return this.$store.state.forbidden;
            },

            route() {
                return this.$route;
            }
        },

        data() {
            return {
                show: false,

                queueInstance: undefined,
            };
        },

        /**
         * 监听当前路由，路由变更时修改页面标题
         */
        route() {
            this.setTitle();
        },

        methods: {
            /**
             * 根据路由配置，修改页面标题
             */
            setTitle(resolve) {
                Browser.setTitle( this.$route.name || main.appName );
                resolve ? resolve() : '';
            },

            /**
             * 执行阻塞函数
             * @param {function} fn
             * @returns {Promise<unknown>}
             */
            run(fn) {
                return new Promise((resolve) => {
                    fn(resolve);
                });
            },
        },

        mounted() {
            // 所有页面展示前的动作都在这里完成
            this.$store.dispatch('showLoading', {
                text: '请稍等...',
                run: async (closeHandle) => {
                    // 所有操作都必须带await开头并基于 run 方法回调完成，回调有一个resolve参数，当操作结束后需要主动执行该函数
                    await this.run( this.setTitle );

                    // 启动队列
                    this.queueInstance = BaseFactories.start();

                    this.show = true;

                    closeHandle();
                }
            });

        },

        destroyed() {
            clearInterval(this.queueInstance);
        }
    }
</script>

<style>

</style>
