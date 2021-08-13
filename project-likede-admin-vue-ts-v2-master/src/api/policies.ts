import { PageModelView } from '@/entity/page'
import { Policy, PolicyModelView, PolicyPageModelView, VmPolicy } from '@/entity/policy'
import request from '@/utils/request'

export const defaultPolicy: Policy = {
  policyId: '',
  policyName: '',
  discount: 0,
  createTime: ''
}

export const defalutVmPolicy: VmPolicy = {
  vmId: '',
  policyId: 0,
  policyName: '',
  discount: 0
}

export const defaultPolicyPageModelView: PolicyPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  policyName: undefined
}

export const defaultPolicyModelView: PolicyModelView = {
  discount: undefined,
  policyName: ''
}

export const defaultPolicyVmPageModelView: PageModelView = {
  pageIndex: 1,
  pageSize: 10
}

export const policyList = () =>
  request({
    url: '/api/vm-service/policy',
    method: 'get'
  })

export const searchPolicy = (params: PolicyPageModelView) =>
  request({
    url: '/api/vm-service/policy/search',
    method: 'get',
    params
  })

export const createPolicy = (data: PolicyModelView) =>
  request({
    url: '/api/vm-service/policy',
    method: 'post',
    data
  })

export const editPolicy = (policyId: string, data: PolicyModelView) =>
  request({
    url: `/api/vm-service/policy/${policyId}`,
    method: 'put',
    data
  })

export const removePolicy = (policyId: string) =>
  request({
    url: `/api/vm-service/policy/${policyId}`,
    method: 'delete'
  })

export const vmPolicy = (innerCode: string) =>
  request({
    url: `/api/vm-service/policy/vmPolicy/${innerCode}`,
    method: 'get'
  })

export const vmList = (policyId: string, params: PageModelView) =>
  request({
    url: `/api/vm-service/policy/vmList/${policyId}`,
    method: 'get',
    params
  })
