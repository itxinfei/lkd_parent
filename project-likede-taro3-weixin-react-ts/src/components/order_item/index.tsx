import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { OrderEntity } from '../../interfaces/order'

import './index.scss'

type IProps = {
  order: OrderEntity
}

interface OrderItem {
  props: IProps
}

enum OrderStatus {
  '未支付' = 0,
  '支付完成' = 1,
  '出货成功' = 2,
  '出货失败' = 3,
  '已失效' = 4
}

class OrderItem extends Component {
  // eslint-disable-next-line react/sort-comp
  current = getCurrentInstance()

  handleNavigate = (order: OrderEntity) => {
    const path = this.current.router?.path
    if (path === '/pages/order_detail/index') {
      return
    }
    Taro.navigateTo({
      url: `/pages/order_detail/index?order=${JSON.stringify(order)}`
    })
  }

  render() {
    const { order } = this.props
    // 后台老师说未支付订单不允许发起重新支付，所以需要将未支付0合并到已失效4状态里
    const orderStatus = order.status == 0 ? 4 : order.status

    return (
      <View
        className='order-item'
        onClick={this.handleNavigate.bind(this, order)}
      >
        <View className='at-row at-row__justify--between at-row__align--center title'>
          <Text className='addr'>{order.addr}</Text>
          <Text className='status'>{OrderStatus[orderStatus]}</Text>
        </View>

        <View className='at-row'>
          <View className='at-col at-col-1 at-col--auto'>
            <View className='at-row at-row__direction--column at-row__justify--between left'>
              <Text>订单号</Text>
              <Text>订单商品</Text>
              <Text>订单金额</Text>
            </View>
          </View>
          <View className='at-col'>
            <View className='at-row at-row__direction--column at-row__justify--between right'>
              <Text>{order.orderNo}</Text>
              <Text>{order.skuName}</Text>
              <Text className='amount'>¥{(order.amount / 100).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default OrderItem
