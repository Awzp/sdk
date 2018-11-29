const statis = {
  state: {
    data: {
      appid: 'all',
      posid: 'all',
      startdate: null,
      enddate: null
    },
    showtype: 'yesterday',
    savetype: 'yesterday',
    searchAction: 0
  },
  mutations: {
    CHANGE_ALLDATA: (state, data) => {
      state.data.appid = data.appid
      state.data.posid = data.posid
      state.data.startdate = data.startdate
      state.data.enddate = data.enddate
      state.searchAction++
    },
    CHANGE_SHOWTYPE: (state, type) => {
      state.showtype = type
    },
    SAVE_SHOWTYPE: (state, type) => {
      state.savetype = type
    },
    REVERT_SHOWTYPE: (state) => {
      state.showtype = state.savetype
    }
  },
  actions: {
    changeSearch({ commit }, data) {
      if (data.startdate || data.enddate) {
        commit('CHANGE_SHOWTYPE', '')
      } else {
        commit('REVERT_SHOWTYPE')
      }
      commit('CHANGE_ALLDATA', data)
    },
    changeShowType({ commit }, type) {
      commit('CHANGE_SHOWTYPE', type)
      commit('SAVE_SHOWTYPE', type)
    }
  }
}

export default statis
