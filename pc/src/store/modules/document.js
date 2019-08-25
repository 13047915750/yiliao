// import * as s from '@/utils/sessionStorage'
import * as ls from '@/utils/localStorage'
const account = {
  state: {
    docuemntInsertInfo: ls.get('docuemntInsertInfo') || {},
    documentUpdateInfo: ls.get('documentUpdateInfo') || {}
  },
  mutations: {
    setDocumentInsertInfo: state => {
      state.docuemntInsertInfo = ls.get('docuemntInsertInfo') || {}
    },
    setDocumentUpdateInfo: state => {
      state.docuemntInsertInfo = ls.get('documentUpdateInfo') || {}
    }
  },
  actions: {
    setDocumentInsertInfo: ({ commit, dispatch, state }, payload) => {
      ls.set('docuemntInsertInfo', payload)
      commit('setDocumentInsertInfo')
    },
    setDocumentUpdateInfo: ({ commit, dispatch, state }, payload) => {
      ls.set('documentUpdateInfo', payload)
      commit('setDocumentUpdateInfo')
    }
  }
}
export default account
