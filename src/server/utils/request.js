import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import convertUri from './convertUri'
import oauthJudge from './oauthJudge'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.url = convertUri(config.url)
    let token = store.getters.token || null
    // 请求头带token
    if (token && oauthJudge(config.url)) {
      config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (response.status !== 200) {
      Notification({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  /**
   * 响应出错的处理
   */
  error => {
    let res = error.response
    return Promise.reject(res)
  }
)

export default service
