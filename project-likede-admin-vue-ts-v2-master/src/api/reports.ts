import { ReportModelView, ReportOrderStats, ReportPageModelView } from '@/entity/report'
import request from '@/utils/request'

export const defaultReportModelView: ReportModelView = {
  partnerId: undefined,
  start: '',
  end: '',
  innerCode: undefined
}

export const defaultReportOrderStats: ReportOrderStats = {
  orderAmount: '0',
  orderCount: '0',
  totalBill: '0'
}

export const defaultReportPageModelView: ReportPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  partnerName: undefined,
  start: '',
  end: ''
}

export const orderCount = (params: ReportModelView) =>
  request({
    url: '/api/order-service/report/orderCount',
    method: 'get',
    params
  })

export const orderAmount = (params: ReportModelView) =>
  request({
    url: '/api/order-service/report/orderAmount',
    method: 'get',
    params
  })

export const totalBill = (params: ReportModelView) =>
  request({
    url: '/api/order-service/report/totalBill',
    method: 'get',
    params
  })

export const partnerCollect = (params: ReportPageModelView) =>
  request({
    url: '/api/order-service/report/partnerCollect',
    method: 'get',
    params
  })

export const skuTop = (topValue: number, start: string, end: string) =>
  request({
    url: `/api/order-service/report/skuTop/${topValue}/${start}/${end}`,
    method: 'get'
  })

export const amountCollect = (collectType: number, start: string, end: string) =>
  request({
    url: `/api/order-service/report/amountCollect/${collectType}/${start}/${end}`,
    method: 'get'
  })

export const regionCollect = (start: string, end: string) =>
  request({
    url: `/api/order-service/report/regionCollect/${start}/${end}`,
    method: 'get'
  })

export const skuCollect = (innerCode: string, start: string, end: string) =>
  request({
    url: `/api/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
    method: 'get'
  })
