import request from '@/api';

// 添加购物车
export const addShopCart = (data) => {
  return request({
    url: '/shop/cart/add',
    method: 'post',
    data,
  })
}

// 查询购物车列表
export const getShopCart = (params) => {
  return request({
    url: '/shop/cart/list',
    method: 'get',
    params,
  })
}

// 删除购物车
export const removeShopCart = (data) => {
  return request({
    url: '/shop/cart/delete',
    method: 'post',
    data,
  })
}

// 结算购物车
export const paymentShop = (data) => {
  return request({
    url: '/payment/shop',
    method: 'post',
    data,
  })
}

