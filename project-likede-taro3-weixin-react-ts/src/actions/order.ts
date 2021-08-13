import api from '../services/api'
import { OrderPayload } from '../interfaces/order'

/**
 * 订单搜索
 * @param payload
 */
export const orderSearch = (payload: OrderPayload): Promise<any> => {
  return api.get('/order/search', payload)
}

/**
 * 请求支付
 * @param payload
 */
export const requestPay = (
  innerCode: string,
  jsCode: string,
  skuId: string
): Promise<any> => {
  return api.post('/order/requestPay', { innerCode, jsCode, skuId })
}

/**
 * 取消支付
 * @param innerCode 设备编号
 * @param orderNo 订单编号
 */
export const cancelPay = (innerCode: string, orderNo: string): Promise<any> => {
  return api.get(`/order/cancelPay/${innerCode}/${orderNo}`)
}
