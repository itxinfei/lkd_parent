import request from '@/utils/request'
import { ChannelModelView } from '@/entity/channel'

export const defaultChannelModelView: ChannelModelView = {
  innerCode: '',
  channelList: []
}

export const channelList = (innerCode: string) =>
  request({
    url: `/api/vm-service/channel/channelList/${innerCode}`,
    method: 'get'
  })

export const channelConfig = (data: ChannelModelView) =>
  request({
    url: '/api/vm-service/channel/channelConfig',
    method: 'put',
    data
  })
