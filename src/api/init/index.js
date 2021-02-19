import request from '@/api';

// 获取map值
export const getMap = (params) => {
  return request({
    url: '/init/map',
    method: 'get',
    params,
  })
}

// 获取map值
export const getUserMap = (params) => {
  return request({
    url: '/init/user/map',
    method: 'get',
    params,
  })
}

// 获取oss
export const getOssConfig = (params) => {
  return request({
    url: '/oss/config',
    method: 'get',
    params,
  })
}