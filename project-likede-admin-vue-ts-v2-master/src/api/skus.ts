import request from '@/utils/request'
import { Sku, SkuModelView, SkuPageModelView } from '@/entity/sku'

export const defaultSku: Sku = {
  skuId: '',
  skuName: '',
  skuImage: '',
  classId: 0,
  price: 0,
  brandName: '',
  ceateTime: '',
  unit: '',
  skuClass: {
    classId: 0,
    className: ''
  }
}

export const defaultSkuPageModelView: SkuPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  skuName: undefined
}

export const defaultSkuModelView: SkuModelView = {
  brandName: '',
  classId: undefined,
  price: undefined,
  skuImage: '',
  skuName: '',
  unit: ''
}

export const searchSku = (params: SkuPageModelView) =>
  request({
    url: '/api/vm-service/sku/search',
    method: 'get',
    params
  })

export const createSku = (data: SkuModelView) =>
  request({
    url: '/api/vm-service/sku',
    method: 'post',
    data
  })

export const editSku = (skuId: string, data: SkuModelView) =>
  request({
    url: `/api/vm-service/sku/${skuId}`,
    method: 'put',
    data
  })

export const skuUpload = (data: any) =>
  request({
    url: '/api/vm-service/sku/upload',
    method: 'post',
    data
  })

export const getSkus = (params: any) =>
  request({
    url: `/vmService/sku/all/${params.pageIndex}/${params.pageSize}`,
    method: 'get'
  })

export const fileUpload = (data: any) =>
  request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'post',
    data
  })

export const businessTop10 = (businessId: number) =>
  request({
    url: `/api/vm-service/sku/businessTop10/${businessId}`,
    method: 'get'
  })
