import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
axios.interceptors.response.use(function (res) {
  // 在发送请求之前做些什么
  if (res.data.code === 103) {
    Message({
      message: '登录超时'
    })
    store.dispatch('logout')
  }
  return res;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
// const ORIGIN = 'http://gsnc.xiyoukeji.com/api/'
export default function request(url, data) {
  return axios({
    method: 'post',
    url,
    data,
    transformRequest: [function (data) {
      return qs.stringify(data, { arrayFormat: 'repeat' })
    }],
  })
    .then(handleState)
    .catch(err => {
      return Promise.reject(err)
    })
}

function handleState(response) {
  if (response.data.code === 100) {
    return response.data
  }
  return Promise.reject(response.data)
}
