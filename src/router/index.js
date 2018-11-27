import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/home', component: () => import('@/views/Home/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouterMap
})

export const sspRouterMap = [
  {
    path: '/overview',
    component: Layout,
    redirect: '/overview/main',
    meta: { title: '概况总览' },
    children: [{
      path: 'main',
      name: 'Overview',
      component: () => import('@/views/Overview/index')
    }]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/index',
    meta: { title: '统计报表' },
    children: [
      {
        path: 'index',
        name: 'Statistics',
        component: () => import('@/views/Statistics/index')
      }
    ]
  },

  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    meta: { title: '应用管理' },
    children: [
      {
        path: 'index',
        name: 'App',
        component: () => import('@/views/App/index')
      },
      {
        path: 'addApp',
        name: 'addApp',
        component: () => import('@/views/App/addApp')
      },
      {
        path: 'addAdvert',
        name: 'addAdvert',
        component: () => import('@/views/App/addAdvert')
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/index',
    meta: { title: '财务管理' },
    children: [
      {
        path: 'index',
        name: 'Finance',
        component: () => import('@/views/Finance/index')
      }]
  },

  {
    path: '/SDK-DOWN',
    component: Layout,
    redirect: '/SDK-DOWN/down',
    meta: { title: 'SDK下载' },
    children: [
      {
        path: 'down',
        name: 'SDK',
        component: () => import('@/views/SDK/index')
      }
    ]
  },

  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'account',
        component: () => import('@/views/Account/index')
      },
      {
        path: 'information',
        name: 'information',
        component: () => import('@/views/Account/information')
      }
    ]
  },
  { path: '/', redirect: '/overview', hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]
