import request from '@/utils/request'

export function addApp(data) {
  return request({
    url: 'applications/add',
    method: 'post',
    data
  })
}
