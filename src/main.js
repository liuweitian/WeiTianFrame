import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import store from './store';
import router from './routers';
import main from './configs/main';
import './plugins/element.js';

Vue.config.productionTip = main.debug;

Vue.use(VueAxios, axios);
Vue.use(VueCookies);

store.commit('setAccessToken', VueCookies.get('accessToken'), true);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');