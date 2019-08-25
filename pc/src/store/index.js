import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import tagsView from './modules/tagsView'
import getters from './getters'
import account from './modules/account'
import document from './modules/document'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    global,
    tagsView,
    account,
    document
  },
  getters
})

export default store
