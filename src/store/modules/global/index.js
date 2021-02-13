import { SETUSREINFO, SETMAPDATE } from './types';

const state = {
  user: {
    token: "",
    user: ""
  },  // 用户信息
  globalLoading: false,
  mapData: {} // 映射数据
};

const actions = {
  // 设置用户信息
  setUserInfo: function ({ state, commit }, params = {}) {
    commit(SETUSREINFO, params);
  },
  setMapData: function ({ state, commit }, params = {}) {
    commit(SETMAPDATE, params)
  }
};

const mutations = {
  SETUSREINFO(state, payload = {}) {
    state.user = payload;
  },
  setLoading(state, payload) {
    state.globalLoading = payload;
  },
  SETMAPDATE(state, payload) {
    state.mapData = payload
  }
};

const getters = {
  token: function (state) {
    const { user } = state;
    const { token = '' } = user || {};
    return token;
  },
  sort_map: function (state) {
    const { mapData = {} } = state;
    const { sort_map: data = {} } = mapData;
    return data;
  },
  uid: function (state) {
    const { user } = state;
    const { uid = '' } = user || {};
    return uid;
  }
};

export default {
  namespaced: true, // 命名空间开启
  state,
  getters,
  actions,
  mutations
}