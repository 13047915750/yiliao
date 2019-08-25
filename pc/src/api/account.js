import request from './request'

// 获取医生列表
export const getDoctors = (params) => {
  return request('get', '/rc/v1/admin/account/doctors', params)
}

// 获取医生单条详例
export const getDoctor = (params) => {
  return request('get', '/rc/v1/admin/account/doctor', params)
}

// 更新
export const patchDoctor = (params) => {
  return request('patch', '/rc/v1/admin/account/doctor', params)
}

// 获取医生列表
export const getPatients = (params) => {
  return request('get', '/rc/v1/admin/account/patients', params)
}

// 获取医生单条详例
export const getPatient = (params) => {
  return request('get', '/rc/v1/admin/account/patient', params)
}

// 更新
export const patchPatient = (params) => {
  return request('patch', '/rc/v1/admin/account/patient', params)
}

// 更新密码
export const resetPasswordByOld = (params) => {
  return request('patch', '/rc/v1/admin/password', params)
}
