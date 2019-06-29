import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import store from './store';
import router from './routers';
import main from './configs/main';
import './plugins/wt.js';

// 开发调试提示
Vue.config.productionTip = main.debug;

Vue.use(VueAxios, axios);
Vue.use(VueCookies);

// 从cookie中读取token
store.commit('setAccessToken', VueCookies.get('accessToken'), true);

let ui = main.ui;
Promise.all([
    import('./plugins/' + ui.plugin + '.js')
]).then(() => {
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount('#app');
});