import request from '@/utils/request'
const baseURL = process.env.apiConfig.sspApi

/**
 * @param {Object} params
 * @description 添加广告位接口
 */
export function chartApi(params) {
  return request({
    baseURL,
    url: `analysis/charts`,
    method: 'get',
    params
  })
}
