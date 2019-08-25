// import * as s from '@/utils/sessionStorage'
import * as ls from '@/utils/localStorage'
import { asyncRouterMap } from '@/router'
const account = {
  state: {
    userInfo: ls.get('userInfo') || {},
    userInfoDetail: ls.get('userInfoDetail') || {},
    permission: ls.get('permission') || [],
    privilege: ls.get('privilege') || [],
    doctorInfo: ls.get('doctorInfo') || {}
  },
  mutations: {
    setUserInfo: state => {
      state.userInfo = ls.get('userInfo') || {}
    },
    setUserInfoDetail: state => {
      state.userInfoDetail = ls.get('userInfoDetail') || {}
    },
    setPermission: state => {
      state.permission = ls.get('permission') || []
    },
    setPrivilege: state => {
      state.privilege = ls.get('privilege') || []
    },
    setDoctorInfo: state => {
      state.doctorInfo = ls.get('doctorInfo') || {}
    }
  },
  actions: {
    setUserInfo: ({ commit, dispatch, state }, payload) => {
      ls.set('userInfo', payload)
      commit('setUserInfo')
    },
    logout: ({ commit, dispatch, state }, payload) => {
      dispatch('setUserInfo', {})
      dispatch('setPermission', {})
      ls.clear()
    },
    setUserInfoDetail: ({ commit, dispatch, state }, payload) => {
      ls.set('userInfoDetail', payload)
      commit('setUserInfoDetail')
    },
    setPermission: ({ commit, dispatch, state }, payload) => {
      if (JSON.stringify(payload) === '{}') {
        ls.set('permission', [])
        commit('setPermission')
        dispatch('setPrivilege', [])
      } else {
        const obj = getPermission(payload)
        ls.set('permission', obj.permission)
        commit('setPermission')
        dispatch('setPrivilege', obj.privilege)
      }
    },
    setPrivilege: ({ commit, dispatch, state }, payload) => {
      ls.set('privilege', payload)
      commit('setPrivilege')
    },
    setDoctorInfo: ({ commit, dispatch, state }, payload) => {
      ls.set('doctorInfo', payload)
      commit('setDoctorInfo')
    }
  }
}
const getPermission = (payload) => {
  let newArr = JSON.parse(JSON.stringify(asyncRouterMap)) // 数组深拷贝
  let payloadFilter = []
  payload.forEach(item => {
    item.children.forEach(el => {
      if (el.enable) {
        payloadFilter.push(el.name)
      }
    })
  })
  newArr.forEach(item => {
    let arr = []
    item.children.forEach(child => {
      payloadFilter.forEach(el => {
        if (el === child.meta.title) {
          arr.push(child)
        }
      })
    })
    item.children = arr
  })
  const obj = {
    permission: newArr,
    privilege: payloadFilter
  }
  return obj
}
export default account
