import React, { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'

import './index.scss'
import paySuccessImg from '../../assets/images/pay_success.png'

class Index extends Component {
  render() {
    return (
      <View className='at-row at-row__direction--column at-row__align--center'>
        <Image className='pay-success-img' src={paySuccessImg} />
        <Text className='pay-success-msg'>支付成功，请取货</Text>
        <Text className='pay-success-tips'>3s后自动返回商品列表页</Text>
      </View>
    )
  }
}

export default Index
