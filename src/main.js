import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router';
import store from '@/store';
import * as filters from '@/utils/filter';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Object.keys(filters).forEach(key => Vue.filter(key, filters[key])); // 全局注入filter

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
