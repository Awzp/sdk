import { sspRouterMap, constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, type) {
      return new Promise(resolve => {
        if (type === 'ssp') {
          commit('SET_ROUTERS', sspRouterMap)
        }
        resolve()
      })
    }
  }
}

export default permission
