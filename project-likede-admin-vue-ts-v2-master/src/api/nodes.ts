import request from '@/utils/request'
import { UserModule } from '@/store/modules/user'
import { NodeModelView, NodePageModelView, Nodes } from '@/entity/node'

export const defaultNodeModelView: NodeModelView = {
  name: '',
  addr: '',
  areaCode: 0,
  createUserId: UserModule.userId,
  regionId: undefined,
  businessId: undefined,
  ownerId: undefined,
  ownerName: ''
}

export const defaultNode: Nodes = {
  id: '',
  name: '',
  addr: '',
  createUserId: 0,
  ownerId: 0,
  ownerName: '',
  businessId: 0,
  regionId: '',
  vmCount: 0,
  businessType: {
    name: ''
  },
  region: {
    name: ''
  },
  areaCode: 0
}

export const defaultNodePageModelView: NodePageModelView = {
  pageIndex: 1,
  pageSize: 10,
  name: undefined,
  regionId: undefined
}

export const searchNode = (params: any) =>
  request({
    url: '/api/vm-service/node/search',
    method: 'get',
    params
  })

export const createNode = (data: NodeModelView) =>
  request({
    url: '/api/vm-service/node',
    method: 'post',
    data
  })

export const updateNode = (id: string, data: NodeModelView) =>
  request({
    url: `/api/vm-service/node/${id}`,
    method: 'put',
    data
  })

export const nodeVmList = (id: string) =>
  request({
    url: `/api/vm-service/node/vmList/${id}`,
    method: 'get'
  })

export const removeNode = (id: string) =>
  request({
    url: `/api/vm-service/node/${id}`,
    method: 'delete'
  })

export const nodeCollect = () =>
  request({
    url: `/api/vm-service/node/nodeCollect`,
    method: 'get'
  })

export const nodeCount = () =>
  request({
    url: `/api/vm-service/node/count`,
    method: 'get'
  })
