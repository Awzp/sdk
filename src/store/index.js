import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'
import permission from './modules/permission'
import statistics from './modules/statistics'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    user,
    permission,
    statistics
  },
  getters
})

export default store
