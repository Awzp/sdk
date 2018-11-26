const initData = {
  userType: '',
  diaStep: {
    reg_1: false,
    reg_2: false,
    login: false
  }
}

const home = {
  state: { ...initData },
  mutations: {
    SELECT_USERTYPE: (state, type) => {
      state.userType = type
    },
    CHANGE_DIASTEP: (state, step) => {
      state.diaStep = Object.assign({}, initData.diaStep, step)
    },
    RESET_STATE: (state) => {
      Object.assign(state, initData)
    }
  },
  actions: {
    selectType({ commit }, type) {
      commit('SELECT_USERTYPE', type)
    },
    changeStep({ commit }, step) {
      commit('CHANGE_DIASTEP', step)
    },
    resetRegState({ commit }) {
      commit('RESET_STATE')
    }
  }
}

export default home
