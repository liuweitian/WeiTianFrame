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
            meta: {
                login: true,
            },
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
    if( to.meta.login === true && !store.state.user.isLogin() ) {
        setTimeout(() => {
            if (!store.state.user.isLogin()) {
                store.commit('logout');
                router.push('site/login');
            } else {
                next();
            }
        }, 300);
    } else {
        next();
    }
});

export default router;