import request from '@/utils/request'

export function login(data) {
  return request({
    baseURL: process.env.apiConfig.userApi,
    url: 'user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    baseURL: process.env.apiConfig.userApi,
    url: 'user/register',
    method: 'post',
    data
  })
}
