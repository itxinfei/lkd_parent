import request from '@/utils/request'

import { ApplyPolicyModelView, Vm, VmModelView, VmPageModelView } from '@/entity/vm'
import { UserModule } from '@/store/modules/user'

export const defaultVmPageModelView: VmPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  status: undefined,
  innerCode: undefined
}

export const defaultVmModelView: VmModelView = {
  createUserId: UserModule.userId,
  nodeId: '',
  vmType: undefined
}

export const defaultVm: Vm = {
  id: '',
  vmType: 0,
  innerCode: '',
  nodeId: '',
  vmStatus: 0,
  lastSupplyTime: '',
  businessId: 0,
  regionId: '',
  fault: false,
  node: {
    id: '',
    name: '',
    addr: ''
  },
  region: {
    id: '',
    name: '',
    nodeCount: 0
  },
  type: {
    name: '',
    channelMaxCapacity: 0
  },
  ownerName: '',
  status: {
    '10001': false,
    '10002': false,
    '10003': false
  }
}

export const defaultApplyPolicyModelView: ApplyPolicyModelView = {
  innerCodeList: [],
  policyId: undefined
}

export const businessType = () =>
  request({
    url: '/api/vm-service/businessType',
    method: 'get'
  })

export const businessTypeName = (businessId: number) =>
  request({
    url: `/api/vm-service/businessType/name/${businessId}`,
    method: 'get'
  })

export const searchVm = (params: VmPageModelView) =>
  request({
    url: '/api/vm-service/vm/search',
    method: 'get',
    params
  })

export const createVm = (data: VmModelView) =>
  request({
    url: '/api/vm-service/vm',
    method: 'post',
    data
  })

export const editVm = (id: string, nodeId: string) =>
  request({
    url: `/api/vm-service/vm/${id}/${nodeId}`,
    method: 'put'
  })

export const applyPolicy = (data: ApplyPolicyModelView) =>
  request({
    url: `/api/vm-service/vm/applyPolicy`,
    method: 'put',
    data
  })

export const cancelPolicy = (innerCode: string, policyId: number) =>
  request({
    url: `/api/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'put'
  })
