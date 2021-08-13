import request from '@/utils/request'
import { Region, RegionModelView, RegionPageModelView } from '@/entity/region'

export const defaultRegion: Region = {
  id: '',
  name: '',
  nodeCount: 0,
  remark: ''
}

export const defaultRegionModelView: RegionModelView = {
  regionName: '',
  remark: ''
}

export const defaultRegionPageModelView: RegionPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  name: undefined
}

export const searchRegion = (params: RegionPageModelView) =>
  request({
    url: '/api/vm-service/region/search',
    method: 'get',
    params
  })

export const createRegion = (data: RegionModelView) =>
  request({
    url: '/api/vm-service/region',
    method: 'post',
    data
  })

export const editRegion = (id: string, data: RegionModelView) =>
  request({
    url: `/api/vm-service/region/${id}`,
    method: 'put',
    data
  })

export const removeRegion = (id: string) =>
  request({
    url: `/api/vm-service/region/${id}`,
    method: 'delete'
  })
