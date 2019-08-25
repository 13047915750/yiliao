// 通用型api
import request from './request'
import axios from 'axios'
import { Message } from 'element-ui'
// 文件上传 api 地址
// http://{{host}}/api/v1.0/upload/ossUpload 预上传地址
// https://arbitration-web.oss-cn-hangzhou.aliyuncs.com 上传文件
export const ossUpload = (params) => {
  return request('get', '/rc/v1/admin/upload/img', params)
}

export const uploadImg = (data, file) => {
  const ossConfig = data
  const uploadUrl = data.host
  let formData = new FormData()
  formData.append('OSSAccessKeyId', ossConfig.accessid)
  formData.append('Signature', ossConfig.signature)
  formData.append('callback', ossConfig.callback)
  formData.append('key', ossConfig.key)
  formData.append('policy', ossConfig.policy)
  formData.append('file', file)
  return axios.post(uploadUrl, formData).then(res => {
    if (res.data.code === 0) {
      return Promise.resolve(res.data)
    }
    Message({
      type: 'error',
      message: res.data.message
    })
    return Promise.reject(res.data)
  }).catch(err => {
    return Promise.reject(err)
  })
}
