import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import index from "./router";

Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

new Vue({
  render: h => h(App),
  router: index,
}).$mount('#app')
