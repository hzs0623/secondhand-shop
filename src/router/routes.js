// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV);
import container from '@/layouts/container.vue';

// 框架内
const frameIn = [
  {
    path: '/',
    component: container, // 布局
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
    name: '登录',
    // meta: {
    //   freeAuth: true
    // },
    component: _import('login/index.vue')
  }
];


export default [...frameIn, ...frameOut];
