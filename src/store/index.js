import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({ /* 选项 */ });

import global from './modules/global';

const stores = {
  "global": global
}

Object.keys(stores).forEach(key => {
  // 注册模块 `myModule`
  store.registerModule(key, stores[key])
})


export default store;
