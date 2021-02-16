import request from '@/api';

// 已购买商品列表
export const getBuyshopList = (params) => {
  return request({
    url: '/buy/shop/list',
    method: 'get',
    params,
  })
}
