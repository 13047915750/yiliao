// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/less/public.less'
import store from './store'
Vue.config.productionTip = false

/* eslint-disable no-new */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import untils from './mixins/untils'
Vue.mixin(untils)
Vue.use(ElementUI) 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
