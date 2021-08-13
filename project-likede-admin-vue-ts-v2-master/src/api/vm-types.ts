import { VmType, VmTypeModelView, VmTypePageModelView } from '@/entity/vm-type'
import request from '@/utils/request'

export const defaultVmTypePageModelView: VmTypePageModelView = {
  pageIndex: 1,
  pageSize: 10,
  name: undefined
}

export const defaultVmType: VmType = {
  typeId: 0,
  vmRow: 0,
  vmCol: 0,
  name: '',
  channelMaxCapacity: 0,
  model: '',
  image: ''
}

export const defaultVmTypeModelView: VmTypeModelView = {
  name: '',
  model: '',
  vmRow: undefined,
  vmCol: undefined,
  channelMaxCapacity: undefined,
  image: ''
}

export const searchVmType = (params: VmTypePageModelView) =>
  request({
    url: '/api/vm-service/vmType/search',
    method: 'get',
    params
  })

export const createVmType = (data: VmTypeModelView) =>
  request({
    url: '/api/vm-service/vmType',
    method: 'post',
    data
  })

export const editVmType = (typeId: number, data: VmTypeModelView) =>
  request({
    url: `/api/vm-service/vmType/${typeId}`,
    method: 'put',
    data
  })

export const removeVmType = (typeId: number) =>
  request({
    url: `/api/vm-service/vmType/${typeId}`,
    method: 'delete'
  })

export const getVmType = (typeId: number) =>
  request({
    url: `/api/vm-service/vmType/${typeId}`,
    method: 'get'
  })
