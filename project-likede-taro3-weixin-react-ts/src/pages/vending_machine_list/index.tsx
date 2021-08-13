import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Map, ScrollView } from '@tarojs/components'

import markerIcon from '../../assets/images/marker_icon.png'

import './index.scss'
import { VmEntity } from '../../interfaces/vm'
import { vmSearch } from '../../actions/vm'
import VendingMachineItem from './components/vending_machine_item'
import VendingMachineDetail from './components/vending_machine_detail'

const INIT_MAP = {
  latitude: 40.060584,
  longitude: 116.344116,
  scale: 13
}

interface IState {
  distance: number
  init: {
    latitude: number
    longitude: number
    scale: number
  }
  map: {
    latitude: number
    longitude: number
    scale: number
  }
  markers: any[]
  isMulti: boolean
  vms: VmEntity[]
  vm: VmEntity
}

class Index extends Component<{}, IState> {
  // eslint-disable-next-line react/sort-comp
  current = getCurrentInstance()

  state = {
    distance: 5,
    init: INIT_MAP,
    map: INIT_MAP,
    markers: [],
    // 区分是列表还是单个售货机
    isMulti: true,
    vms: [],
    vm: {
      location: '',
      innerCode: '',
      nodeName: '',
      addr: '',
      distance: 0,
      typeName: ''
    }
  }

  async componentDidMount() {
    // TODO: 需要添加异常处理
    const { latitude, longitude } = await Taro.getLocation({ type: 'wgs84' })

    // 搜索附近售货机
    const { data: vms } = await vmSearch(
      latitude,
      longitude,
      this.state.distance
    )
    let markers: any = []

    // 地图标记点
    vms.forEach((vm: VmEntity, i: number) => {
      let arr = vm.location.split(',')
      markers.push({
        id: i,
        latitude: arr[0],
        longitude: arr[1],
        iconPath: markerIcon,
        width: 23,
        height: 25
      })
    })
    const vmStr = this.current.router?.params?.vm_str

    // 显示附近所有售货机
    // TODO: 这个地方有个bug，首页点击单个售货机时，地图坐标显示不对
    if (!vmStr) {
      this.setState({
        init: {
          latitude: latitude,
          longitude: longitude,
          scale: 13
        },
        map: {
          latitude: latitude,
          longitude: longitude,
          scale: 13
        },
        markers: markers,
        vms: vms
      })
    }
    // 显示指定单个售货机
    else {
      const vm: VmEntity = JSON.parse(vmStr)
      const location = vm.location.split(',')

      this.setState({
        init: {
          latitude: latitude,
          longitude: longitude,
          scale: 13
        },
        map: {
          latitude: Number(location[0]),
          longitude: Number(location[1]),
          scale: 15
        },
        markers: markers,
        isMulti: false,
        vms: vms,
        vm: vm
      })
    }
  }

  /**
   * 显示售货机的详情
   * @param innerCode 设备编号
   */
  showVmDetail = (innerCode: string) => {
    const { vms } = this.state

    const vm = vms.find((item: VmEntity) => {
      return innerCode == item.innerCode
    })
    if (!vm) {
      return
    }

    const arr = vm.location.split(',')
    this.setState({
      map: {
        latitude: Number(arr[0]),
        longitude: Number(arr[1]),
        scale: 15
      },
      isMulti: false,
      vm: vm
    })
  }

  /**
   * 隐藏售货机的详情
   */
  hideVmDetail = () => {
    const { init } = this.state
    this.setState({
      map: init,
      isMulti: true
    })
  }

  render() {
    const { map, markers, isMulti, vms, vm } = this.state
    console.log(map)

    const vmItems = vms.map((item: VmEntity) => (
      <VendingMachineItem
        key={item.innerCode}
        vm={item}
        onClick={this.showVmDetail.bind(this, item.innerCode)}
      />
    ))

    const scrollTop = 0
    const Threshold = 20

    return (
      <View className='vending-machine-list'>
        <Map
          id='myMap'
          className='map'
          latitude={map.latitude}
          longitude={map.longitude}
          scale={map.scale}
          markers={markers}
          showLocation
        />
        <ScrollView
          className={isMulti ? 'scroll' : 'scroll hide'}
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
        >
          {vmItems}
        </ScrollView>
        <View className={!isMulti ? 'detail' : 'detail hide'}>
          <VendingMachineDetail vm={vm} onClick={this.hideVmDetail} />
        </View>
      </View>
    )
  }
}

export default Index
