// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV);
import container from '@/layouts/container.vue';

// 框架内
const frameIn = [
  {
    path: '/',
    component: container, // 布局
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: "首页",
        component: _import('shop/index')
      },
      // ...waybillMenu,
    ]
  }
];

// 框架外
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: _import('system/login')
  },
  {
    path: '/register',
    name: 'Register',
    component: _import('system/register')
  },
  {
    path: '/404',
    name: 'Error',
    component: _import('system/error')
  }
];


export default [...frameIn, ...frameOut];
