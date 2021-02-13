import request from '@/api';

// 获取map值
export const getMap = (params) => {
  return request({
    url: '/init/map',
    method: 'get',
    params,
  })
}
