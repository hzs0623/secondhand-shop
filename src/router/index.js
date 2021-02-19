import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import NProgress from "nprogress"; // 进度条
// import "nprogress/nprogress.css";

Vue.use(VueRouter);

// 重写路由 防止报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
});

// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启进度条
  if (!to.matched.length) {
    next('/404');
  } else {
    next();
  }
})

// 后置守卫
router.afterEach((to, from,) => {
  NProgress.done(); // 关闭进度条
})

export default router;
