import request from '@/utils/request'
import { SkuClassModelView, SkuClassPageModelView, SkuClass } from '@/entity/sku-class'

export const defaultSkuClassPageModelView: SkuClassPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  className: undefined
}

export const defaultSkuClass: SkuClass = {
  classId: 0,
  className: ''
}

export const defaultSkuClassModelView: SkuClassModelView = {
  className: ''
}

export const searchSkuClass = (params: SkuClassPageModelView) =>
  request({
    url: '/api/vm-service/skuClass/search',
    method: 'get',
    params
  })

export const createSkuClass = (data: SkuClassModelView) =>
  request({
    url: '/api/vm-service/skuClass',
    method: 'post',
    data
  })

export const editSkuClass = (classId: number, data: SkuClassModelView) =>
  request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: 'put',
    data
  })

export const removeSkuClass = (classId: number) =>
  request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: 'delete'
  })
