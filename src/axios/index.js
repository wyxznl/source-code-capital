import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/'
// `headers`是要发送的自定义 headers
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.headers['Content-Type']) {
    return config
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
const ERR_MSG = '接口返回值有误'
function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(response => {
        if (Object.prototype.toString.call(response.data) === '[object Object]') {
          resolve(response.data)
        } else {
          reject(ERR_MSG)
        }
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(response => {
        if (Object.prototype.toString.call(response.data) === '[object Object]') {
          resolve(response.data)
        } else {
          reject(ERR_MSG)
        }
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  get,
  post
}
