// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV);
import container from '@/layouts/container.vue';

// 框架内
const frameIn = [
  {
    path: '/',
    name: 'Index',
    component: container, // 布局
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: "Main",
        component: _import('main/index')
      },
      // 商品详情
      {
        path: 'shop/details',
        name: 'details',
        component: _import('shopDetails')
      },
      // 发布物品
      {
        path: 'publish/shop',
        name: 'publish',
        component: _import('publish')
      },
      // 我发布的商品
      {
        path: 'my/shoping',
        name: 'myShop',
        component: _import('myShop')
      },
      // 用户信息
      {
        path: 'user/info',
        name: 'userInfo',
        component: _import('userInfo')
      },
      // 购物车
      {
        path: 'shop/cart',
        name: 'shopCart',
        component: _import('shopCart')
      }
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
