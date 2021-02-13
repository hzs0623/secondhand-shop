import { SETUSREINFO } from './types';

const state = {
  user: {
    token: "",
    user: ""
  },  // 用户信息
  globalLoading: false
};

const actions = {
  // 设置用户信息
  setUserInfo: function ({ state, commit }, params = {}) {
    commit(SETUSREINFO, params);
  }
};

const mutations = {
  SETUSREINFO(state, payload = {}) {
    state.user = payload;
  },
  setLoading(state, payload) {
    state.globalLoading = payload;
  },
};

const getters = {
  token: function (state) {
    const { user } = state;
    const { token = '' } = user || {};
    return token;
  }
};

export default {
  namespaced: true, // 命名空间开启
  state,
  getters,
  actions,
  mutations
}