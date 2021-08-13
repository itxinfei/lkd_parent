import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import OrderItem from '../../components/order_item'
import { OrderEntity } from '../../interfaces/order'

import './index.scss'
import wechatPayImg from '../../assets/images/wechat_pay.png'

interface IState {
  order: OrderEntity
}

class Index extends Component<{}, IState> {
  // eslint-disable-next-line react/sort-comp
  current = getCurrentInstance()

  state = {
    order: {
      id: '',
      orderNo: '',
      innerCode: '',
      addr: '',
      skuId: '',
      skuName: '',
      status: 0,
      amount: 0,
      payType: 0,
      payStatus: 0,
      cancelDesc: '',
      createTime: ''
    }
  }

  componentWillMount() {
    const orderStr = this.current.router?.params.order
    if (!orderStr) {
      return
    }
    this.setState({
      order: JSON.parse(orderStr)
    })
  }

  render() {
    const { order } = this.state

    // 支付完成、出货成功和出货失败的订单显示支付方式
    const payType = [1, 2, 3].includes(order.status) && (
      <View className='at-row at-row__justify--between at-row__align--center item'>
        <Text className='left'>支付方式</Text>
        {/* 现在只有微信支付 */}
        <View>
          <View className='at-row at-row__align--center right'>
            <Image className='wechat-pay-img' src={wechatPayImg} />
            微信
          </View>
        </View>
      </View>
    )

    // 未支付和已失效的订单显示取消原因
    const cancelDesc = [0, 4].includes(order.status) && (
      <View className='at-row at-row__justify--between at-row__align--center item'>
        <Text className='left'>取消原因</Text>
        <Text className='right'>{order.cancelDesc}</Text>
      </View>
    )

    // 支付完成、出货成功和出货失败的订单显示申请退款
    const tips = [1, 2, 3].includes(order.status) && (
      <View className='at-row at-row__direction--column at-row__align--center tips'>
        <Text>申请退款,请拨打客服电话</Text>
        <View className='telephone'>
          <View className='at-icon at-icon-phone' />
          <Text>&nbsp;400-1234556</Text>
        </View>
      </View>
    )

    return (
      <View className='order-detail'>
        <View>{order && <OrderItem order={order} />}</View>
        {/* 订单信息 */}
        <View className='order-title'>订单信息</View>
        <View className='order-content'>
          <View className='at-row at-row__justify--between at-row__align--center item'>
            <Text className='left'>设备号</Text>
            <Text className='right'>{order.innerCode}</Text>
          </View>
          <View className='at-row at-row__justify--between at-row__align--center item'>
            <Text className='left'>设备地址</Text>
            <Text className='right'>{order.addr}</Text>
          </View>
          <View className='at-row at-row__justify--between at-row__align--center item'>
            <Text className='left'>订单时间</Text>
            <Text className='right'>{order.createTime}</Text>
          </View>
          <View className='at-row at-row__justify--between at-row__align--center item'>
            <Text className='left'>交易单号</Text>
            <Text className='right'>{order.orderNo}</Text>
          </View>
          {payType}
          {cancelDesc}
        </View>
        {tips}
      </View>
    )
  }
}

export default Index
