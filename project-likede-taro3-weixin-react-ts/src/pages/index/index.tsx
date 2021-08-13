import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import HeaderSwiper from '../../components/header_swiper'
import VmItem from './components/vm_item'
import OrderItem from '../../components/order_item'
import api from '../../services/api'
// import { Page } from '../../interfaces/page'
import { vmSearch } from '../../actions/vm'
import { VmEntity } from '../../interfaces/vm'
import { orderSearch } from '../../actions/order'
import { OrderEntity } from '../../interfaces/order'

import './index.scss'
import scanImg from '../../assets/images/scan.png'

interface IState {
  distance: number
  vms: VmEntity[]
  orders: OrderEntity[]
}

class Index extends Component<{}, IState> {
  state = {
    distance: 5,
    vms: [],
    orders: []
  }

  async componentDidMount() {
    // 附近售货机
    const { latitude, longitude } = await Taro.getLocation({ type: 'wgs84' })
    const { data: vms } = await vmSearch(
      latitude,
      longitude,
      this.state.distance
    )
    const { code } = await Taro.login()

    // 最近订单
    const { data: openId } = await api.get(`/order/openid/${code}`)
    const {
      data: { currentPageRecords: orders }
    } = await orderSearch({
      pageIndex: 1,
      pageSize: 10,
      openId: openId,
      startDate: '2020-01-01',
      endDate: '2020-12-31'
    })

    this.setState({
      vms: vms,
      orders: orders
    })
  }

  handleScanCode = async () => {
    const { result } = await Taro.scanCode({})
    const arr = result.split('?')[1].split('&')
    const innerCode = arr[0].split('=')[1]
    Taro.navigateTo({
      url: `/pages/sku_list/index?innerCode=${innerCode}`
    })
  }

  handleSearchAround = () => {
    Taro.navigateTo({
      url: '/pages/vending_machine_list/index'
    })
  }

  handleNavigate = () => {
    Taro.navigateTo({
      url: '/pages/order_list/index'
    })
  }

  render() {
    const vmItems = this.state.vms
      .slice(0, 3)
      .map((vm: VmEntity) => <VmItem key={vm.innerCode} vm={vm} />)

    const orderItems = this.state.orders
      .slice(0, 10)
      .map((order: OrderEntity) => <OrderItem key={order.id} order={order} />)

    const scrollLeft = 0
    const Threshold = 20

    return (
      <View>
        <HeaderSwiper />

        {/* 扫描区 */}
        <View
          className='at-row at-row__direction--column at-row__justify--center at-row__align--center scan'
          onClick={this.handleScanCode}
        >
          <Image className='img' src={scanImg} />
          <Text className='text'>扫一扫</Text>
        </View>

        {/* 附近售货机 */}
        <View className='vending-machine'>
          <View onClick={this.handleSearchAround}>
            <View className='title'>
              附近售货机
              <View className='at-icon at-icon-chevron-right' />
            </View>
          </View>
          <ScrollView
            className='scroll'
            scrollX
            scrollWithAnimation
            scrollLeft={scrollLeft}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
          >
            {vmItems}
          </ScrollView>
        </View>

        {/* 最近订单 */}
        <View className='order'>
          <View className='at-row at-row__justify--between header'>
            <Text>最近订单</Text>
            <Text onClick={this.handleNavigate}>查看历史</Text>
          </View>
          <View>
            <View>{orderItems}</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
