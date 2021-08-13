import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, ITouchEvent } from '@tarojs/components'
import { VmEntity } from '../../../../interfaces/vm'

import './index.scss'
import locationIcon from '../../../../assets/images/location_icon.png'
import locationImg from '../../../../assets/images/location_go.png'

type IProps = {
  vm: VmEntity
}

interface VmItem {
  props: IProps
}

class VmItem extends Component {
  handleRoutePlan = (nodeName: string, location: string, e: ITouchEvent) => {
    e.stopPropagation()
    const key = 'BPXBZ-EPL3U-AN7VA-2BBFX-TAZ7V-7TF34' //使用在腾讯位置服务申请的key
    const referer = '立可得智能零售' //调用插件的app的名称
    const endPoint = JSON.stringify({
      //终点
      name: nodeName,
      latitude: location.split(',')[0],
      longitude: location.split(',')[1]
    })
    Taro.navigateTo({
      url:
        'plugin://routePlan/index?key=' +
        key +
        '&referer=' +
        referer +
        '&endPoint=' +
        endPoint
    })
  }

  handleNavigate = (vm: VmEntity) => {
    Taro.navigateTo({
      url: `/pages/vending_machine_list/index?vm_str=${JSON.stringify(vm)}`
    })
  }

  render() {
    const { vm } = this.props

    return (
      <View
        className='location_item'
        onClick={this.handleNavigate.bind(this, vm)}
      >
        <View className='at-row at-row__align--center inner'>
          {/* TODO: 字数长的时候的处理 */}
          {/* 左侧区 */}
          <View className='at-col'>
            <View className='at-row at-row__align--center'>
              <Text className='name'>{vm.nodeName}</Text>
              <Image className='icon' src={locationIcon} />
              <View className='distance'>
                {(vm.distance / 1000).toFixed(1)}km
              </View>
            </View>
            <View className='at-row addr'>{vm.addr}</View>
            <View className='at-row code'>设备编号：{vm.innerCode}</View>
          </View>
          {/* 右侧区 */}
          <View className='at-col at-col-1 at-col--auto go'>
            <View className='at-row at-row__direction--column at-row__align--center'>
              <Image
                className='img'
                src={locationImg}
                onClick={this.handleRoutePlan.bind(
                  this,
                  vm.nodeName,
                  vm.location
                )}
              />
              <Text className='tips'>去这里</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default VmItem
