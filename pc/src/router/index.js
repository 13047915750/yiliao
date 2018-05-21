import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component(resolve) {
        require(['@/pages/login'], resolve)
      }
    },
    {
      path: '/home',
      name: 'Home',
      component(resolve) {
        require(['@/pages/home'], resolve)
      },
      children: [
        {
          path: '/account',
          name: 'Account',
          component(resolve) {
            require(['@/pages/account'], resolve)
          },
        }
      ]
    }
  ]
})
