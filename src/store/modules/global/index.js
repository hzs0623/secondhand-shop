import { SETUSREINFO } from './types';
import { pro_token } from '@/utils/var';

const state = {
  user: {
    token: "",
    username: ""
  },  // 用户信息
};

const actions = {
  // 设置用户信息
  setUserInfo: function ({ state, commit }, params = {}) {
    commit(SETUSREINFO, params);
  }
};

const mutations = {
  SETUSREINFO(state, payload) {
    const { user, token } = payload || {};
    localStorage.setItem(pro_token, token);
    state.user = {
      username: user,
      token
    }
  }
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