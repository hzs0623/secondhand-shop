import request from '@/api';

export const getOrderList = (params) => {
  return request({
    url: '/order/list',
    method: 'get',
    params,
  })
}

// 修改订单
export const orderEdit = (data) => {
  return request({
    url: '/order/edit',
    method: 'post',
    data,
  })
}

// 取消订单
export const orderCancel = (data) => {
  return request({
    url: '/order/cancel',
    method: 'post',
    data,
  })
}
