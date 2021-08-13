import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { vmSku } from '../../actions/vm'
import { SkuEntity } from '../../interfaces/sku'

import './index.scss'
import wechatPayImg from '../../assets/images/wechat_pay.png'
import selectedImg from '../../assets/images/selected.png'
import { requestPay, cancelPay } from '../../actions/order'

interface IState {
  innerCode: string
  skuId: string
  sku: SkuEntity
}

class Index extends Component<{}, IState> {
  // eslint-disable-next-line react/sort-comp
  current = getCurrentInstance()

  state = {
    innerCode: '',
    skuId: '',
    sku: {
      skuId: '',
      skuName: '',
      price: 0,
      realPrice: 0,
      capacity: 0,
      image: '',
      unit: '',
      addr: '',
      innerCode: ''
    }
  }

  async componentDidMount() {
    const { router } = this.current
    if (!router) {
      return
    }
    const { innerCode, skuId } = router.params
    if (!innerCode || !skuId) {
      return
    }
    const res = await vmSku(innerCode, skuId)
    this.setState({
      innerCode: innerCode,
      skuId: skuId,
      sku: res.data
    })
  }

  /**
   * 去支付
   */
  handleRequestPay = () => {
    // TODO：更改yapi对应接口
    // timeStamp: "1605842385"
    // package: "prepay_id=wx20112315990751c24e2100979cc67c0000"
    // orderNo: "0100000117955819279666889"
    // paySign: "C4FAC83940468E4378D13C19B4A5DB96"
    // appId: ""
    // signType: "MD5"
    // nonceStr: "rgmszeDZCD0Zfhid8622OxrxD9HWShse"

    const { innerCode, skuId } = this.state

    // TODO: 使用await/async方式
    // 调用接口获取登录凭证（code）
    Taro.login({
      success: async (loginRes) => {
        const { code: jsCode } = loginRes

        console.log(jsCode);
        

        // 登录失败
        if (!jsCode) {
          // 消息提示
          Taro.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
          return
        }

        // 请求支付
        // TODO: 这个地方还需要思考下异常情况（机器出货中请稍后再试）
        // TODO: 或者api.ts加一个全局判断500错误
        // TODO: 库存没有的情况的考虑
        const { data } = await requestPay(innerCode, jsCode, skuId)
        if (data === '机器出货中请稍后再试') {
          // 消息提示
          Taro.showToast({
            title: '机器出货中请稍后再试',
            icon: 'none',
            duration: 2000
          })
          return
        }

        // 发起微信支付
        Taro.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success: () => {
            Taro.redirectTo({
              url: '/pages/pay_success/index'
            })
          },
          fail: async (payFailRes) => {
            if (payFailRes.errMsg == 'requestPayment:fail cancel') {
              // 取消支付
              await cancelPay(innerCode, data.orderNo)
              // 消息提示
              Taro.showToast({
                title: '您已取消支付',
                icon: 'none',
                duration: 2000
              })
              return
            }
            // 消息提示
            Taro.showToast({
              title: `取消支付失败`,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  }

  render() {
    const { sku } = this.state
    const realPrice = (sku.realPrice / 100).toFixed(2)

    return (
      <View>
        {/* 商品详情 */}
        <View className='at-row at-row__align--center sku'>
          <View className='at-col at-col-1 at-col--auto'>
            <Image className='product-img' src={sku.image} />
          </View>
          <View className='at-col'>
            <View className='at-row'>
              <Text className='sku-name'>
                {sku.skuName}&nbsp;&nbsp;&nbsp;&nbsp;{sku.unit}
              </Text>
            </View>
            <View className='at-row at-row__justify--between at-row__align--end space'>
              <View>
                <Text className='unit'>¥</Text>
                <Text className='price'>{realPrice}</Text>
              </View>
              <Text className='quantity'>数量：1</Text>
            </View>
          </View>
        </View>
        <View className='box-wrapper'>
          <View className='at-row at-row__justify--between at-row__align--center inner-code'>
            <Text className='left'>设备编号</Text>
            <Text className='right'>{sku.innerCode}</Text>
          </View>
          <View className='at-row at-row__justify--between at-row__align--center addr'>
            <Text className='left'>设备地址</Text>
            <Text className='right'>{sku.addr}</Text>
          </View>
          <View className='at-row at-row__justify--between at-row__align--center pay-mode'>
            <View className='at-row at-row__align--center'>
              <Image className='wechat-pay-img' src={wechatPayImg} />
              <Text className='left'>微信支付</Text>
            </View>
            <Image className='selected-img' src={selectedImg} />
          </View>
        </View>

        {/* 实付余额、去支付 */}
        <View className='at-row at-row__align--center pay'>
          <View className='at-col real-price'>
            <Text className='title'>实付余额：</Text>
            <Text className='unit'>¥</Text>
            <Text className='price'>{realPrice}</Text>
          </View>
          <View className='at-col at-col-1 at-col--auto'>
            <View className='pay-button' onClick={this.handleRequestPay}>
              去支付
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
