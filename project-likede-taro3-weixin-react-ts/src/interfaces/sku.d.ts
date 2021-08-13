/**
 * 商品实体
 */
export interface SkuEntity {
  /**
   * 设备地址
   */
  addr: string
  /**
   * 余量
   */
  capacity: number
  /**
   * 商品图片url
   */
  image: string
  /**
   * 设备编号
   */
  innerCode: string
  /**
   * 商品原价
   */
  price: number
  /**
   * 商品售价
   */
  realPrice: number
  /**
   * 商品Id
   */
  skuId: string
  /**
   * 商品名称
   */
  skuName: string
  /**
   * 净含量
   */
  unit: string
}
