import request from '@/utils/request'
const baseURL = process.env.apiConfig.sspApi

/**
 * @param {Object} params
 * @description  统计图接口
 */
export function getChart(params) {
  return request({
    baseURL,
    url: `analysis/charts`,
    method: 'get',
    params
  })
}

/**
 * @param {Object} params
 * @description 统计表接口
 */
export function getTable(params) {
  return request({
    baseURL,
    url: `analysis/query`,
    method: 'get',
    params
  })
}
