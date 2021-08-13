import React, { Component } from 'react'
import Taro, { requirePlugin } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import locationIcon from '../../../../assets/images/location_icon.png'
import mapImg from '../../../../assets/images/map_go.png'

import './index.scss'

import { VmEntity } from '../../../../interfaces/vm'

type IProps = {
  showDetail: boolean
  vm: VmEntity
}

class VendingMachineRow extends Component<IProps, {}> {
  handleRoutePlan = (nodeName: string, location: string) => {
    const plugin = requirePlugin('routePlan')
    const key = 'BPXBZ-EPL3U-AN7VA-2BBFX-TAZ7V-7TF34' //使用在腾讯位置服务申请的key
    const referer = '立可得智能零售' //调用插件的app的名称
    const endPoint = JSON.stringify({
      //终点
      name: nodeName,
      latitude: location.split(',')[0],
      longitude: location.split(',')[1]
    })
    Taro.navigateTo({
      url: `plugin://routePlan/index?key=${key}&referer=${referer}&endPoint=${endPoint}`
    })
  }

  render() {
    const { showDetail, vm } = this.props

    return (
      <View className='at-row at-row__align--center vending-machine-row'>
        {/* 左侧区 */}
        <View className='at-col'>
          <View className='at-row at-row__align--center'>
            <Text className='name'>{vm.nodeName}</Text>
            {/* TODO: 有的分割线不显示 */}
            <View className='split'></View>
            <Image className='icon' src={locationIcon} />
            <View className='distance'>
              {(vm.distance / 1000).toFixed(1)}km
            </View>
          </View>
          <View className='at-row addr'>{vm.addr}</View>
          {showDetail && (
            <View className='at-row code'>
              设备编号：{vm.innerCode}
              <View className='type'>{vm.typeName}</View>
            </View>
          )}
        </View>
        {/* 右侧区 */}
        <View className='at-col at-col-1 at-col--auto go'>
          <View className='at-row at-row__direction--column at-row__align--center'>
            <Image
              className='img'
              src={mapImg}
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
    )
  }
}

export default VendingMachineRow
