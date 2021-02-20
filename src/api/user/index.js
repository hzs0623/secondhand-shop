import request from '@/api';

export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export const register = (data) => {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export const userEdit = (data) => {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export const userInfo = (params) => {
  return request({
    url: '/user/find',
    method: 'get',
    params,
  })
}