import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import account from './account'
import document from './document'
Vue.use(Router)
// 将路由表暴露给 sideItem 组件 动态渲染出菜单栏
export const asyncRouterMap = [
  ...account,
  ...document
]
export const constantRouterMap = [{
  path: '/',
  redirect: '/index',
  component: () => import('@/pages/Layout' /* webpackChunkName: 'layout' */), // 主页
  children: [{
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
      icon: 'dashboard',
      noCache: true
    },
    component: () => import('@/pages/index' /* webpackChunkName: 'index' */) // 启动页
  }]
},
{
  path: '/401',
  name: '401',
  component: () => import('@/pages/tinymce-demo' /* webpackChunkName: '401' */) // 启动页
},
{
  path: '/404',
  name: '404',
  component: () => import('@/pages/error/404' /* webpackChunkName: '401' */) // 启动页
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
let routerMap = constantRouterMap.concat(asyncRouterMap)
const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }), // 新开的路由默认为顶部
  routes: routerMap
})
// 捕获权限
router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (to.path === '/index') { // 启动页无需权限
  //   next()
  // } else if (to.path === '/401') { // 无权限页面
  //   next()
  // } else if (to.path === '/404') { // 无匹配页面
  //   next()
  // } else {
  //   // 当页面有权限限制的时候 根据自身项目更改
  //   const privilege = store.getters.privilege
  //   const flag = privilege.some(p => p === to.meta.title || p === to.matched[1].meta.title)
  //   if (privilege.length > 0) {
  //     if (flag) {
  //       next()
  //     } else {
  //       next({ path: '/401', replace: true })
  //       // next()
  //     }
  //   } else {
  //     next({ path: '/index', replace: true })
  //   }
  // }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
