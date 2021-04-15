import { SETUSREINFO, SETMAPDATE } from "./types"
// ['服饰', '鞋类箱包','运动户外','珠宝配饰','化妆品','图书音像','乐器','服务大类','食品','数码',]

const state = {
  user: {
    token: "",
    user: "",
  }, // 用户信息
  globalLoading: false,
  mapData: {}, // 映射数据
}

const actions = {
  // 设置用户信息
  setUserInfo: function({ state, commit }, params = {}) {
    commit(SETUSREINFO, params)
  },
  setMapData: function({ state, commit }, params = {}) {
    commit(SETMAPDATE, params)
  },
}

const mutations = {
  SETUSREINFO(state, payload = {}) {
    state.user = payload
  },
  setLoading(state, payload) {
    state.globalLoading = payload
  },
  SETMAPDATE(state, payload) {
    state.mapData = payload
  },
}

const getters = {
  token: function(state) {
    const { user } = state
    const { token = "" } = user || {}
    return token
  },
  // 分类
  sort_map: function(state) {
    const { mapData = {} } = state
    const { sort_map: data = {} } = mapData
    return data
  },
  // 商品状态
  shop_state: function(state) {
    const { mapData = {} } = state
    const { shop_state: data = {} } = mapData
    return data
  },
  // 支付类型
  buy_type: function(state) {
    const { mapData = {} } = state
    const { buy_type: data = {} } = mapData
    return data
  },
  // 成新map
  level_map: function(state) {
    const { mapData = {} } = state
    const { level_map: data = {} } = mapData
    return data
  },
  // 商品发货状态
  sell_state_map: function(state) {
    const { mapData = {} } = state
    const { sell_state_map: data = {} } = mapData
    return data
  },

  uid: function(state) {
    const { user = {} } = state
    const { uid = "" } = user
    return uid
  },
  username_map: function() {
    const { mapData = {} } = state
    const { username_map: data = {} } = mapData
    return data
  },
  username: function(state) {
    const { user = {}, mapData = {} } = state
    const { uid = "" } = user
    const { username_map } = mapData
    let name = ""
    username_map &&
      username_map.some((user) => {
        if (user.uid == uid) {
          name = user.username
          return true
        }
      })
    return name
  },
}

export default {
  namespaced: true, // 命名空间开启
  state,
  getters,
  actions,
  mutations,
}
