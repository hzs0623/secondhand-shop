import request from '@/api';

export const getShopList = (params) => {
  return request({
    url: '/shop/list',
    method: 'get',
    params,
  })
}

export const getShopItem = (params) => {
  return request({
    url: '/shop/item',
    method: 'get',
    params
  })
}

// 获取留言列表
export const getShopMesgList = (params) => {
  return request({
    url: '/shop/get/message',
    method: 'get',
    params
  })
}

// 添加留言
export const addShopMesg = (data) => {
  return request({
    url: '/shop/add/message',
    method: 'post',
    data
  })
}

// 删除留言
export const deleteShopMesg = (data) => {
  return request({
    url: '/shop/delete/message',
    method: 'post',
    data
  })
}

export const addShopItem = (data) => {
  return request({
    url: '/shop/add',
    method: 'post',
    data
  })
}

export const getByIdShopList = (params) => {
  return request({
    url: '/shop/uid/list',
    method: 'get',
    params
  })
}

export const removeShop = (data) => {
  return request({
    url: '/shop/delete',
    method: 'post',
    data
  })
}

// 商品编辑
export const editShop = (data) => {
  return request({
    url: '/shop/edit',
    method: 'post',
    data
  })
}

// 商品搜索
export const searchShop = (params) => {
  return request({
    url: '/shop/search',
    method: 'get',
    params
  })
}
