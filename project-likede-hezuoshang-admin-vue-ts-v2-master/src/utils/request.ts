/* eslint-disable */
import axios, { AxiosInstance } from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import Cookies from 'js-cookie'

const instance = axios.create({
  withCredentials: true,
  timeout: 60000
})

instance.interceptors.request.use(config => {
  const data = {}
  if (!config.data) config.data = {}
  if (config.method === 'get' || config.method === 'delete') {
    config.params = config.data
    Object.assign(config.params, data)
  } else {
    Object.assign(config.data, data)
  }
  if (process.env.NODE_ENV !== 'production') {
    const baseURL = 'development'
    config.headers.Authorization = store.state.token ? store.state.token : Cookies.get('creditechToken')
    if (baseURL.startsWith('http')) {
      config.baseURL = 'localhttp'
      config.headers.Authorization = store.state.token ? store.state.token : Cookies.get('creditechToken')
      config.headers.localhttp = baseURL + (config.url || '').replace('/services', '/service')
    } else {
      config.baseURL = baseURL
    }
  }
  config.headers.Authorization = store.state.token ? store.state.token : Cookies.get('creditechToken')
  config.hideLoading = showLoading(Symbol('request'))
  return config
})

instance.interceptors.response.use(response => {
  const { config } = response
  const res = response.data || {}
  if (config.hideLoading) config.hideLoading()
  if (String(response.status) === '200') {
    // 无data判断
    if (!res.data) {
      if (res && res !== null) {
        if (res.success === false) {
          let msg = typeof config.msg === 'string' ? config.msg : res.msg
          msg && Message.error(msg)
          return res
        } else {
          // 成功部分
          let msg = typeof config.msg === 'string' ? config.msg : res.msg
          msg && Message.success(msg)
          return res
        }
      }
    }
  }
}, error => {
  error.config.hideLoading()
  if (String(error.response.status) === '500') {
    Message.error(error.response.data)
    return Promise.reject(error)
  }
  // Status Code 404, 503...
  const message = '服务器开小差了，请稍后重试'
  Message.error(message)
  return Promise.reject(message)
})

let arr: Array<symbol> = []
function isShowLoading () {
  setTimeout(() => {
    let flag = arr.length > 0
    flag !== store.state.loading && store.commit('updateLoading', flag)
  }, 100)
}

function showLoading (symbolId: symbol) {
  arr.push(symbolId)
  isShowLoading()
  return function () {
    arr.splice(arr.indexOf(symbolId), 1)
    isShowLoading()
  }
}

interface Cmethod <T> {
  (target: T, name: string): T
}

export interface Method<T = any, R = any> {
  (data?: T, showMsg?: boolean | string, errorMsg?: boolean | string): Promise<R>
}

interface FormatData<T = any> {
  (res: T, data: any): T
}

export function createApi (args: any, format?: FormatData, request: AxiosInstance = instance): Cmethod<any> {
  return function (target, name) {
    const oldValue = target[name]
    target[name] =async function (data: any = {}, showMsg?: any, errorMsg?: any) {
      const res = await instance({
        ...args,
        data,
        showMsg: showMsg !== undefined ? showMsg : args.showMsg,
        errorMsg: errorMsg !== undefined ? errorMsg : args.errorMsg
      })

      if (format) {
        return format.call(this, res, data)
      }
      return typeof oldValue === 'function' ? oldValue.call(this, res) : res
    }
    return target
  }
}

export const getListAndParams = (url: string, params = {}) => {
  return instance({
    method: 'get',
    url,
    data: { ...params },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export const getByBlob = (url: string, params = {}) => {
  return instance({
    method: 'get',
    url,
    data: { ...params },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    responseType: 'blob'
  })
}


export const putListAndParams = (url: string, params = {}) => {
  return instance({
    method: 'put',
    url,
    data: { ...params },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default instance