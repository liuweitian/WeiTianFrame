import Vue from 'vue';
import VueRouter from "vue-router";
import SiteIndex from '../views/site/index';
import SiteLogin from '../views/site/login';
import store from "../store";

import ErrorNotFound from '../views/error/notFound';
import ErrorNotAllow from '../views/error/notAllow';
import Permission from "../cores/helpers/Permission";

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
                permission: '测试权限',
            },
            component: SiteIndex,
        },
        {
            path: '/site/login',
            name: 'login',
            label: '登录',
            component: SiteLogin,
        },
        {
            path: '*',
            name: 'notFound',
            label: '未找到页面',
            component: ErrorNotFound
        },
        {
            path: '/error/notFound',
            name: 'notFound',
            label: '未找到页面',
            component: ErrorNotFound
        },
        {
            path: '/error/notAllow',
            name: 'notAllow',
            label: '未授权访问',
            component: ErrorNotAllow,
        },
    ]
});

router.beforeEach((to, from, next) => {

    // 授权访问
    if( to.meta.permission && typeof to.meta.permission === 'string') {
        Permission.checkPermission({
            condition: 'permission',
            permission: to.meta.permission,
        });
    }
    if( to.meta.permissionAnd && typeof to.meta.permissionAnd === 'object') {
        Permission.checkPermission({
            condition: 'permissionAnd',
            permission: to.meta.permissionAnd,
        });
    }
    if( to.meta.permissionOr && typeof to.meta.permissionOr === 'object') {
        Permission.checkPermission({
            condition: 'permissionOr',
            permission: to.meta.permissionOr,
        });
    }

    // 如果路由规定需要登录则判断登录状态，未登录将强制返回登录页
    if( to.meta.login === true && !store.state.user.isLogin() ) {
        setTimeout(() => {
            if (!store.state.user.isLogin()) {
                store.commit('logout');
                router.push('/site/login');
            } else {
                next();
            }
        }, 300);
    } else {
        next();
    }
});

export default router;
