import api from '../services/api'

/**
 * 搜索附近售货机
 * @param lat 坐标点纬度
 * @param lon 坐标点经度
 * @param distance 搜索半径,单位:千米
 */
export const vmSearch = (
  lat: number,
  lon: number,
  distance: number
): Promise<any> => {
  return api.post('/vm/search', { lat, lon, distance })
}

/**
 * 获取售货机商品列表
 * @param innerCode 设备编号
 */
export const vmSkuList = (innerCode: string): Promise<any> => {
  return api.get(`/vm/skuList/${innerCode}`)
}

/**
 * 扫码获取售货机商品详情
 * @param innerCode 设备编号
 * @param skuId 商品Id
 */
export const vmSku = (innerCode: string, skuId: string): Promise<any> => {
  return api.get(`/vm/sku/${innerCode}/${skuId}`)
}
