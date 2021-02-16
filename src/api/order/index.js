import request from '@/api';

export const getOrderList = (params) => {
  return request({
    url: '/order/list',
    method: 'get',
    params,
  })
}

// 发货还是取消订单
export const orderEdit = (data) => {
  return request({
    url: '/order/edit',
    method: 'post',
    data,
  })
}
