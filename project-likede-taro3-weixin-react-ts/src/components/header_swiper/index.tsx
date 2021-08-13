import React, { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'

import './index.scss'
import bannerImg1 from '../../assets/images/banner1.png'
import bannerImg2 from '../../assets/images/banner2.png'

class HeaderSwiper extends Component {
  render() {
    return (
      <View>
        <View className='header-box'></View>
        <Swiper
          className='swiper'
          indicatorColor='rgba(255,255,255,0.2)'
          indicatorActiveColor='rgba(255,255,255,1)'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image className='swiper-item' src={bannerImg1} />
          </SwiperItem>
          <SwiperItem>
            <Image className='swiper-item' src={bannerImg2} />
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}

export default HeaderSwiper
