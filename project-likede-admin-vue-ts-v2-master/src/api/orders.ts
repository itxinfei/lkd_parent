import request from '@/utils/request'
import { Order, OrderPageModelView } from '@/entity/order'

export const defaultOrderPageModelView: OrderPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  orderNo: undefined,
  startDate: undefined,
  endDate: undefined
}

export const defaultOrder: Order = {
  orderNo: '',
  innerCode: '',
  skuName: '',
  amount: 0,
  status: 0,
  addr: '',
  createTime: '',
  updateTime: '',
  payType: ''
}

export const ORDER_STATUS = {
  0: '未支付',
  1: '支付完成',
  2: '出货成功',
  3: '出货失败',
  4: '已失效'
}

export const searchOrder = (params: OrderPageModelView) =>
  request({
    url: '/api/order-service/order/search',
    method: 'get',
    params
  })

export const getOrderCollect = (data: any) =>
  request({
    url: `/orderService/order/collect/${data.start}/${data.end}`,
    method: 'get'
  })

export const getCompanyCollect = (data: any) =>
  request({
    url: `/orderService/order/companyCollect/${data.start}/${data.end}`,
    method: 'get'
  })

export const getAreaCollect = (data: any) =>
  request({
    url: `/orderService/order/areaCollect/${data.areaId}/${data.startDate}/${data.endDate}`,
    method: 'get'
  })

export const getTop15Sku = (data: any) =>
  request({
    url: `/orderService/order/top15Sku/${data.startTime}/${data.endTime}`,
    method: 'get'
  })
