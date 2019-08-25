import request from './request'

// 获取文章列表
export const getDocuments = (params) => {
  return request('get', '/rc/v1/admin/documents', params)
}

// 获取文章单条详情
export const getDocument = (params) => {
  return request('get', '/rc/v1/admin/document', params)
}

// 新增文章
export const postDocument = (params) => {
  return request('post', '/rc/v1/admin/document', params)
}

// 更新文章
export const patchDocument = (params) => {
  return request('patch', '/rc/v1/admin/document', params)
}
