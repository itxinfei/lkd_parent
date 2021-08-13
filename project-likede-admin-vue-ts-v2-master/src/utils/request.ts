import axios from 'axios'
import { Message } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})
request.defaults.headers.post['Content-Type'] = 'application/json'

// Request interceptors
request.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['Authorization'] = UserModule.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
request.interceptors.response.use(
  response => response,
  error => {
    // Status Code 500
    if (error.response.status === 500) {
      Message({
        message: error.response.data,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error.response.data)
    }

    // Status Code 404, 503...
    const message = '服务器开小差了，请稍后重试'
    Message({
      message: message, // error.response.statusText,
      type: 'error',
      duration: 5 * 1000
    })
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(message)
  }
)

export default request
