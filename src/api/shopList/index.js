import request from '@/api';

export const getShopList = (params) => {
  return request({
    url: '/shop/list',
    method: 'get',
    params,
  })
}
