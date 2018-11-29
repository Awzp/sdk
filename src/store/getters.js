const getters = {
  token: state => state.user.token,
  user: state => state.user.userData,
  userType: state => state.home.userType,
  diaStep: state => state.home.diaStep,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  statisShowType: state => state.statistics.showtype,
  statisFilterData: state => state.statistics.data,
  statisAction: state => state.statistics.searchAction
}
export default getters
