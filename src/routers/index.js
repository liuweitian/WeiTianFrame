import Vue from 'vue';
import VueRouter from "vue-router";
import SiteIndex from '../views/site/index';
import SiteLogin from '../views/site/login';
import store from "../store";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            label: '首页',
            component: SiteIndex,
        },
        {
            path: '/site/login',
            name: 'login',
            label: '登录',
            component: SiteLogin,
        },
    ]
});

router.beforeEach((to, from, next) => {
    // 如果未登录，则跳回登录页
    if (to.name !== 'login' && !store.state.user.accessToken) {
        setTimeout(() => {
            if (!store.state.user.accessToken) {
                store.commit('logout');
            }
        }, 300);
    }
    next();
});

export default router;