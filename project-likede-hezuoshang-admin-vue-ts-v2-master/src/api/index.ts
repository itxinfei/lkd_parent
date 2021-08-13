import ajax, { createApi, Method, getListAndParams, getByBlob, putListAndParams } from '@/utils/request'
import { baseUrl } from '@/config.json'

export class Api {
  request: Method = ajax

  @createApi({ url: baseUrl + '/user-service/user/login', method: 'post' })
  login!: Method

  @createApi({ url: baseUrl + '/order-service/report/orderAmount', method: 'get' })
  getReportOrderAmount!: Method

  @createApi({ url: baseUrl + '/order-service/report/search', method: 'get' })
  getReportSearch!: Method 
  
}

export default new Api()

export const allCity = () => {
  return require('./chinaCitys.json')
}

// 今日总收入
export const getReportOrderAmount = (params: object) => {
  return getListAndParams(`${baseUrl}/order-service/report/orderAmount`, params)
}

// 今日总订单
export const getReportOrderCount = (params: object) => {
  return getListAndParams(`${baseUrl}/order-service/report/orderCount`, params)
}

// 本周总收入
export const getReportAmountInfo = (params: { id: string; weekStartDate: string; startToday: Function }) => {
  return getListAndParams(`${baseUrl}/order-service/report/amountInfo/${params.id}/${params.weekStartDate}/${params.startToday()}`)
}

// 本周总订单
export const getRerportOrderCountInfo = (params: { id: string; weekStartDate: string; startToday: Function }) => {
  return getListAndParams(`${baseUrl}/order-service/report/orderCountInfo/${params.id}/${params.weekStartDate}/${params.startToday()}`)
}

// 折线图
export const getReportCollectReport = (params: { id: string; dateArr: Array<string> }) => {
  return getListAndParams(`${baseUrl}/order-service/report/collectReport/${params.id}/${params.dateArr[0]}/${params.dateArr[1]}`)
}

// 首页展示列表的接口
export const getRepostTop12Collect = (id: string) => {
  return getListAndParams(`${baseUrl}/order-service/report/top12Collect/${id}`)
}

// 首页跳转过来列表页的接口
export const getReportSearch = (id: string, params: object) => {
  return getListAndParams(`${baseUrl}/order-service/report/search/${id}`, params)
}

// 文件导出
export const getReportExport = (id: string, dateArr: Array<string>, params: object) => {
  return getByBlob( `${baseUrl}/order-service/report/export/${id}/${dateArr[0]}/${dateArr[1]}`, params)
}

// 修改密码
export const putPartnerPpdatePwd = (id: string, params: object) => {
  return putListAndParams(`${baseUrl}/user-service/partner/updatePwd/${id}`, params)
}

// 获取个人信息
export const getPartner = (id: string) => {
  return getListAndParams(`${baseUrl}/user-service/partner/${id}`)
}

// 更新个人信息
export const putPartner = (id: string, params: object) => {
  return putListAndParams(`${baseUrl}/user-service/partner/${id}`, params)
}