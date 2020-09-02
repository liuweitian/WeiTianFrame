import Vue from 'vue';

// 百度地图
import './baiduMap.js';

// icon图标
import './src/wtIconFont/wt.icon.font.css';

// 加载公共样式
import './src/common/common.css';

import Permission from "../cores/helpers/Permission";

// 权限指令
Vue.directive('wt-permission-and', {
    update: (dom, update) => {
        update.def.bind(dom, update);
    },
    bind: (dom, binding) => {
        if( !Permission.hasPermissionAnd( binding.value ) ) {
            dom.classList.add('wt-hide');
        } else {
            dom.classList.remove('wt-hide');
        }
    },
});
Vue.directive('wt-permission-or', {
    update: (dom, update) => {
        update.def.bind(dom, update);
    },
    bind: (dom, binding) => {
        if( !Permission.hasPermissionOr( binding.value ) ) {
            dom.classList.add('wt-hide');
        } else {
            dom.classList.remove('wt-hide');
        }
    },
});
Vue.directive('wt-permission', {
    update: (dom, update) => {
        update.def.bind(dom, update);
    },
    bind: (dom, binding) => {
        if( !Permission.hasPermission( binding.value ) ) {
            dom.classList.add('wt-hide');
        } else {
            dom.classList.remove('wt-hide');
        }
    }
});