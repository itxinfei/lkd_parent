import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import OrderItem from '../../components/order_item'
import api from '../../services/api'
import { orderSearch } from '../../actions/order'
import { OrderEntity } from '../../interfaces/order'

import './index.scss'
import calendarImg from '../../assets/images/calendar.png'

interface IState {
  // params: OrderPayload
  orders: OrderEntity[]
}

class Index extends Component<{}, IState> {
  state = {
    // params: {
    //   pageIndex: 0,
    //   pageSize: 0,
    //   openId: '',
    //   startDate: '',
    //   endDate: ''
    // },
    orders: []
  }

  async componentDidMount() {
    // TODO: 下拉刷新，上拉加载，动态参数
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
      orders: orders
    })
  }

  handleNavigate = () => {
    Taro.navigateTo({
      url: '/pages/calendar_select/index'
    })
  }

  render() {
    const orderItems = this.state.orders.map((order: OrderEntity) => (
      <OrderItem key={order.id} order={order} />
    ))
    // TODO: 没有订单的情况

    return (
      <View>
        {/* 时间检索 */}
        <View className='datetime at-row at-row__justify--center at-row__align--center'>
          <Image className='calendar' src={calendarImg} />
          <Text className='select' onClick={this.handleNavigate}>
            2020.06.09~2020.07.09
          </Text>
          <View className='at-icon at-icon-chevron-right' />
        </View>
        {/* 订单列表 */}
        {/* TODO: 阴影显示不对 */}
        <View>{orderItems}</View>
        {/* 下拉查看更多 */}
        <View className='loadmore'>下拉查看更多</View>
      </View>
    )
  }
}

export default Index
