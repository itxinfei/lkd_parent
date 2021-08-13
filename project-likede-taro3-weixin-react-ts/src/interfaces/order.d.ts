/**
 * 订单实体
 */
export interface OrderEntity {
  /**
   * 点位地址
   */
  addr: string
  /**
   * 支付金额
   */
  amount: number
  /**
   * 取消原因
   */
  cancelDesc: string
  /**
   * 订单时间
   */
  createTime: string
  /**
   * 订单id
   */
  id: string
  /**
   * 设备编号
   */
  innerCode: string
  /**
   * 订单编号
   */
  orderNo: string
  /**
   * 支付状态，0-未支付;1-支付完成;2-退款中;3-退款完成
   */
  payStatus: number
  /**
   * 支付类型，1支付宝 2微信
   */
  payType: number
  /**
   * 商品Id
   */
  skuId: string
  /**
   * 商品名称
   */
  skuName: string
  /**
   * //订单状态:0-未支付;1-支付完成;2-出货成功;3-出货失败;4-已失效
   */
  status: number
}

/**
 * TODO: 需要再思考下
 */
export type OrderPayload = {
  pageIndex: number
  pageSize: number
  openId: string
  startDate: string
  endDate: string
}
