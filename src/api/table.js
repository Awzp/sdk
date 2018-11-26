import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/chart',
    method: 'get',
    params
  })
}
