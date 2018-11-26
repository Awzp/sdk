import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  return JSON.parse(localStorage.getItem('userData'))
}

export function setUser(data) {
  localStorage.setItem('userData', JSON.stringify(data))
}

export function removeUser() {
  localStorage.removeItem('userData')
}
