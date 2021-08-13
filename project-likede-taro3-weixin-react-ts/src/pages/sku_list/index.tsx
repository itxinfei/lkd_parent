import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import HeaderSwiper from '../../components/header_swiper'
import { vmSkuList } from '../../actions/vm'
import { SkuEntity } from '../../interfaces/sku'

import './index.scss'
import selloutImg from '../../assets/images/sell_out.png'
import baselineImg from '../../assets/images/ku.png'

interface IState {
  innerCode: string
  skus: SkuEntity[]
}

class Index extends Component<{}, IState> {
  // eslint-disable-next-line react/sort-comp
  current = getCurrentInstance()

  state = {
    innerCode: '',
    skus: []
  }

  async componentDidMount() {
    let innerCode: string | undefined
    // 微信扫一扫进入的
    let q = this.current.router?.params.q
    if (q) {
      q = decodeURIComponent(q)

      let arr = q.split('?')[1].split('&')
      innerCode = arr[0].split('=')[1]
    }
    // 小程序扫码进入的
    else {
      innerCode = this.current.router?.params.innerCode
    }

    if (!innerCode) {
      Taro.showToast({
        title: '参数异常',
        icon: 'none',
        duration: 2000
      })
      return
    }

    const { data } = await vmSkuList(innerCode)
    this.setState({
      innerCode: innerCode,
      skus: data
    })
  }

  handleNavigate = (skuId: string, capacity: number) => {
    const { innerCode } = this.state
    if (!capacity) {
      Taro.showToast({
        title: '已售罄',
        icon: 'none',
        duration: 2000
      })
      return
    }
    Taro.navigateTo({
      url: `/pages/sku_detail/index?innerCode=${innerCode}&skuId=${skuId}`
    })
  }

  render() {
    const { skus } = this.state

    // Taro.showModal({
    //   title: '获取权限',
    //   content: '首次进入需要获取您的基础信息',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    // TODO: 考虑是否拆出组件
    const skuItems = skus.map((sku: SkuEntity) => (
      <View
        key={sku.skuId}
        className={`at-col product-item ${
          !sku.capacity ? 'product-sellout' : ''
        }`}
        onClick={this.handleNavigate.bind(this, sku.skuId, sku.capacity)}
      >
        {!sku.capacity && <Image className='sellout-img' src={selloutImg} />}
        <View className='at-row at-row__justify--center'>
          <Image className='product-img' src={sku.image} />
        </View>
        <View className='at-row at-row__justify--center'>
          <Text className='product-name'>{sku.skuName}</Text>
        </View>
        <View className='at-row at-row__justify--center'>
          <Text className='product-price'>
            ¥{(sku.realPrice / 100).toFixed(2)}
          </Text>
        </View>
      </View>
    ))

    return (
      <View className='index'>
        {/* TODO: home按钮 */}
        <HeaderSwiper />

        {/* TODO: 商品间距不正确 */}
        <View className='at-row at-row--wrap at-row__justify--between product-list'>
          {skuItems}
        </View>
        {/* TODO: 使用 AtLoadMore */}
        <View className='at-row at-row__justify--center at-row__align--center baseline'>
          <Image className='img' src={baselineImg} />
          <Text className='text'>我是有底线的哦~</Text>
        </View>
      </View>
    )
  }
}

export default Index
