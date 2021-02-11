const state = {
  user: {},  // 用户信息
};

const actions = {};

const mutations = {};

const getters = {
  token: (state) => {
    const { user } = state;
    const { token = '' } = user || {};
    return true; // 后期改
  }
};

module.exports = {
  namespaced: true, // 命名空间开启
  state,
  getters,
  actions,
  mutations
}