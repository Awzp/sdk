import { login } from '@/api/login'
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userData: getUser()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.userData = user
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      userInfo.email = userInfo.email.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          setToken(data.token)
          setUser(data.user)
          commit('SET_TOKEN', data.token)
          commit('SET_USER', data.user)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUser()
        resolve()
      })
    }
  }
}

export default user
