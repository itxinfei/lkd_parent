import request from '@/utils/request'

import { AutoSupplyConfigViewModel, Task, TaskCancelModelView, TaskModelView, TaskPageModelView, UserWork, UserWorkModelView } from '@/entity/task'
import { UserModule } from '@/store/modules/user'

export const defaultTaskModelView: TaskModelView = {
  userId: UserModule.userId,
  createType: 1,
  innerCode: '',
  assignorId: undefined,
  productType: undefined,
  desc: '',
  details: []
}
export const defaultAutoSupplyConfigViewModel: AutoSupplyConfigViewModel = {
  alertValue: 10
}

export const defaultTask: Task = {
  taskId: '',
  taskCode: '',
  taskStatus: 0,
  innerCode: '',
  createType: 0,
  addr: '',
  assignorId: 0,
  userName: '',
  desc: '',
  regionId: '',
  createTime: '',
  taskType: {
    typeName: '',
    type: 0,
    typeId: 0
  },
  updateTime: ''
}

export const defaultTaskPageModelView: TaskPageModelView = {
  pageIndex: 1,
  pageSize: 10,
  taskCode: undefined,
  status: undefined,
  isRepair: false
}

export const defaultUserWork: UserWork = {
  userId: 0,
  workCount: 0,
  progressTotal: 0,
  cancelCount: 0,
  total: 0
}

export const defaultUserWorkModelView: UserWorkModelView = {
  userId: 0,
  start: '',
  end: ''
}

export const getAllTaskStatus = () =>
  request({
    url: '/api/task-service/task/allTaskStatus',
    method: 'get'
  })

export const getTaskTypeList = () =>
  request({
    url: '/api/task-service/taskType/list',
    method: 'get'
  })

export const searchTask = (params: any) =>
  request({
    url: '/api/task-service/task/search',
    method: 'get',
    params
  })

export const createTask = (data: TaskModelView) =>
  request({
    url: '/api/task-service/task/create',
    method: 'post',
    data
  })

export const taskDetails = (taskId: string) =>
  request({
    url: `/api/task-service/taskDetails/${taskId}`,
    method: 'get'
  })

export const autoSupplyConfig = (data: AutoSupplyConfigViewModel) =>
  request({
    url: '/api/task-service/task/autoSupplyConfig',
    method: 'post',
    data
  })

export const supplyAlertValue = () =>
  request({
    url: '/api/task-service/task/supplyAlertValue',
    method: 'get'
  })

export const taskInfo = (taskId: string) =>
  request({
    url: `/api/task-service/task/taskInfo/${taskId}`,
    method: 'get'
  })

export const cancelTask = (taskId: string, data: TaskCancelModelView) =>
  request({
    url: `/api/task-service/task/cancel/${taskId}`,
    method: 'post',
    data
  })

export const taskReportInfo = (start: string, end: string) =>
  request({
    url: `/api/task-service/task/taskReportInfo/${start}/${end}`,
    method: 'get'
  })

export const collectReport = (start: string, end: string) =>
  request({
    url: `/api/task-service/task/collectReport/${start}/${end}`,
    method: 'get'
  })

export const userWorkTop10 = (start: string, end: string, isRepair: boolean, regionId: string) =>
  request({
    url: `/api/task-service/task/userWorkTop10/${start}/${end}/${isRepair}/${regionId}`,
    method: 'get'
  })

export const userWork = (params: UserWorkModelView) =>
  request({
    url: '/api/task-service/task/userWork',
    method: 'get',
    params
  })

export const supplyCount = (innerCode: string, start: string, end: string) =>
  request({
    url: `/api/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
    method: 'get'
  })

export const repairCount = (innerCode: string, start: string, end: string) =>
  request({
    url: `/api/task-service/task/repairCount/${innerCode}/${start}/${end}`,
    method: 'get'
  })
