// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import * as echarts from 'echarts'
import 'iview/dist/styles/iview.css';
import iView from 'iview';
import jquery from 'jquery'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$ = jquery
Vue.prototype.$http = axios
// Vue.prototype.domain = "http://39.98.41.126:30007/recruit/"
Vue.prototype.domain = "https://recruit.qgailab.com/recruit/"
Vue.use(iView)
// 添加导航栏的border
Vue.prototype.addLiBorder = function(i) {
  let tabs = document.querySelectorAll(".side-tabs");
  for (let j = 0; j < tabs.length; j++) {
    if (j == i) tabs[j].classList.add("side-active");
    else tabs[j].classList.remove("side-active");
  }
},

// 按需引入iview
/* import 'iview/dist/styles/iview.css';
import {Button,Select,Option,Page,Table,Message} from 'iview';
Vue.component('Page', Page);
Vue.component('Message', Message);
Vue.component('Table', Table);
Vue.component('Button', Button);
Vue.component('Select', Select);
Vue.component('Option', Option); */

//  忽略警告
Vue.config.silent = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
