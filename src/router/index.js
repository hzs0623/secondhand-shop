import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css";
import store from "@/store";
import { getToken } from '@/utils';

Vue.use(VueRouter);

// 重写路由 防止报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
});



const curToken = getToken().token;

// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启进度条
  const map = ['Login', 'Index', 'Main', 'Register', 'details'];
  const token = store.getters['global/token'] || curToken;
  if (token && !to.matched.length) {
    next('/404');
    NProgress.done(); // 关闭进度条
  } else if (!token && map.indexOf(to.name) === -1) {
    next({ name: 'Login' });
    NProgress.done(); // 关闭进度条
  } else {
    next();
  }
})

// 后置守卫
router.afterEach((to, from,) => {
  NProgress.done(); // 关闭进度条
})

export default router;
