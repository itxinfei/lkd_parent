import request from '@/utils/request'
import { LoginModelView, User, UserModelView, UserPageModelView, UserWork, UserWorkPageModelView } from '@/entity/user'

export const defaultUserPageModelView: UserPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  userName: undefined,
  roleId: undefined,
  isRepair: undefined
}

export const defaultUserWorkPageModelView: UserWorkPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  userName: undefined,
  roleId: undefined,
  isRepair: undefined
}

export const defaultUserModelView: UserModelView = {
  userName: '',
  roleId: undefined,
  mobile: '',
  regionId: '',
  regionName: '',
  status: false,
  image: ''
}

export const defaultUser: User = {
  id: 0,
  roleId: 0,
  userName: '',
  regionId: '',
  regionName: '',
  mobile: '',
  role: {
    roleCode: '',
    roleId: 0,
    roleName: ''
  },
  status: false,
  image: ''
}

export const defaultUserWork: UserWork = {
  userId: 0,
  userName: '',
  mobile: '',
  roleName: '',
  workCount: 0,
  progressTotal: 0,
  cancelCount: 0
}

export const login = (data: LoginModelView) =>
  request({
    url: '/api/user-service/user/login',
    method: 'post',
    data
  })

export const searchUser = (params: UserPageModelView) =>
  request({
    url: '/api/user-service/user/search',
    method: 'get',
    params
  })

export const roleList = () =>
  request({
    url: '/api/user-service/role',
    method: 'get'
  })

export const getUser = (id: number) =>
  request({
    url: `/api/user-service/user/${id}`,
    method: 'get'
  })

export const createUser = (data: UserModelView) =>
  request({
    url: '/api/user-service/user',
    method: 'post',
    data
  })

export const editUser = (id: number, data: UserModelView) =>
  request({
    url: `/api/user-service/user/${id}`,
    method: 'put',
    data
  })

export const removeUser = (id: number) =>
  request({
    url: `/api/user-service/user/${id}`,
    method: 'delete'
  })

export const searchUserWork = (params: UserWorkPageModelView) =>
  request({
    url: '/api/user-service/user/searchUserWork',
    method: 'get',
    params
  })

export const operatorList = (innerCode: String) =>
  request({
    url: `/api/user-service/user/operatorList/${innerCode}`,
    method: 'get'
  })

export const repairerList = (innerCode: String) =>
  request({
    url: `/api/user-service/user/repairerList/${innerCode}`,
    method: 'get'
  })
