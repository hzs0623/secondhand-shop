module.exports = (file) => () => import("@/views/" + file) // 按需加载
