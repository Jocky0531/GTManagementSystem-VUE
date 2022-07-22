import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from "./axios";

Vue.prototype.$axios = axios

Vue.config.productionTip = false;

Vue.use(ElementUI);

// require("./mock")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title === undefined?'论文管理系统':to.meta.title
  next();
})