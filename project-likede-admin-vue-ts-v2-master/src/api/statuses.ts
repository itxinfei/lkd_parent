import request from '@/utils/request'

export const statusTop10 = () =>
  request({
    url: `/api/status-service/status/top10`,
    method: 'get'
  })
