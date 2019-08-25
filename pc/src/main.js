// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
import '@/assets/less/main.less'
import '@/assets/less/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

import mixin from './mixin/index'
import * as filters from './filters'
Vue.use(ElementUI)
Vue.mixin(mixin)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(VueDirectiveImagePreviewer, {
  zIndex: 9999
})
Vue.config.productionTip = false
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
Vue.use({
  vm
})
