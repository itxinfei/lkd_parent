/**
 * 售货机实体
 */
export interface VmEntity {
  /**
   * 详细地址
   */
  addr: string
  /**
   * 直线距离(单位米)
   */
  distance: number
  /**
   * 售货机编号
   */
  innerCode: string
  /**
   * 经纬度坐标位置("123,30")
   */
  location: string
  /**
   * 点位名称
   */
  nodeName: string
  /**
   * 售货机类型名
   */
  typeName: string
}
