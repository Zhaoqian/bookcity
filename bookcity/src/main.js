// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/fonts/iconfont.css';
import './common/index.css';
import "swiper/dist/css/swiper.min.css"
import axios from 'axios';
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;

Vue.component("Head", ()=> import ('@/components/header.vue'));
Vue.component("Dllist", ()=> import ('@/components/dlList.vue'))

    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})