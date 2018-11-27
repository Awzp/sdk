import request from '@/utils/request'
const baseURL = process.env.apiConfig.sspApi

/**
 * @param {Object} params
 * @description 添加广告位接口
 */
export function handlePositions(type, data) {
  return request({
    baseURL,
    url: `positions/${type}`,
    method: 'post',
    data
  })
}

/**
 * @param {Object} params
 * @description 修改广告位接口
 */
export function getInfo(posid) {
  return request({
    baseURL,
    url: 'positions/get',
    method: 'get',
    params: { posid }
  })
}

/**
 * @param {string} type
 * @param {string} posid
 * @description 上下线广告位接口
 */
export function OnOffline(type, posid) {
  return request({
    baseURL,
    url: `positions/${type}`,
    method: 'get',
    params: { posid }
  })
}
