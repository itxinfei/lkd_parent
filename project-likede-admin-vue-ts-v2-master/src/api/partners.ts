import request from '@/utils/request'
import { PartnerModelView, PartnerPageModelView, Partner } from '@/entity/partner'

export const defaultPartnerPageModelView: PartnerPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  name: undefined
}

export const defaultPartnerCreateModelView: PartnerModelView = {
  name: '',
  contact: '',
  mobile: '',
  ratio: undefined,
  account: '',
  password: ''
}

export const defaultPartnerEditModelView: PartnerModelView = {
  name: '',
  contact: '',
  mobile: '',
  ratio: undefined
}

export const defaultPartner: Partner = {
  id: 0,
  name: '',
  account: '',
  vmCount: 0,
  ratio: 0,
  contact: '',
  mobile: ''
}

export const searchPartner = (params: PartnerPageModelView) =>
  request({
    url: '/api/user-service/partner/search',
    method: 'get',
    params
  })

export const createPartner = (data: PartnerModelView) =>
  request({
    url: '/api/user-service/partner',
    method: 'post',
    data
  })

export const editPartner = (id: number, data: PartnerModelView) =>
  request({
    url: `/api/user-service/partner/${id}`,
    method: 'put',
    data
  })

export const removePartner = (id: number) =>
  request({
    url: `/api/user-service/partner/${id}`,
    method: 'delete'
  })

export const resetPwd = (id: number) =>
  request({
    url: `/api/user-service/partner/resetPwd/${id}`,
    method: 'put'
  })

export const partnerCount = () =>
  request({
    url: `/api/user-service/partner/count`,
    method: 'get'
  })
