import request from '@/utils/request'

/**
 * @param {Object} data
 * @description 添加APP接口
 */
export function HandelApp(type, data) {
  return request({
    baseURL: process.env.apiConfig.sspApi,
    url: `applications/${type}`,
    method: 'post',
    data
  })
}

/**
 * @param {Object} params
 * @description 删除应用接口
 */
export function getAppInfo(appid) {
  return request({
    baseURL: process.env.apiConfig.sspApi,
    url: 'applications/get',
    method: 'get',
    params: { appid }
  })
}

/**
 * @param {Object} params
 * @description 获取应用列表接口
 */
export function getAppList(params) {
  return request({
    baseURL: process.env.apiConfig.sspApi,
    url: 'applications/query',
    method: 'get',
    params
  })
}

/**
 * @param {Object} params
 * @description 获取应用类型列表接口
 */
export function getCategory(params) {
  return request({
    baseURL: process.env.apiConfig.userApi,
    url: 'dictionary/query',
    method: 'get',
    params
  })
}

/**
 * @param {Object} params
 * @description 删除应用接口
 */
export function delteApp(appid) {
  return request({
    baseURL: process.env.apiConfig.sspApi,
    url: 'applications/del',
    method: 'get',
    params: { appid }
  })
}
