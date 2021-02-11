import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

const token = store.getters['global/token'];

// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启进度条
  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' });
  } else if (!to.matched.length) {
    next('/404') // 
  } else {
    next();
  }
})

// 后置守卫
router.afterEach((to, from,) => {
  NProgress.done(); // 关闭进度条
})

export default router;