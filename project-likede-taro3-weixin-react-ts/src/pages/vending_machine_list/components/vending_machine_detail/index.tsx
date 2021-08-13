import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'
import closeImg from '../../../../assets/images/close.png'
import { VmEntity } from '../../../../interfaces/vm'
import VendingMachineRow from '../vending_machine_row'

type IProps = {
  vm: VmEntity
  onClick: any
}

interface VendingMachineDetail {
  props: IProps
}

class VendingMachineDetail extends Component {
  handleNavigate = (id: string) => {
    this.props.onClick()
  }

  render() {
    const { vm } = this.props
    const showDetail = true

    return (
      <View className='vending-machine-detail'>
        {/* 关闭按钮 */}
        <Image
          className='close-img'
          src={closeImg}
          onClick={this.handleNavigate.bind(this, '001')}
        />
        <View className='close-line'></View>
        <VendingMachineRow showDetail={showDetail} vm={vm} />
      </View>
    )
  }
}

export default VendingMachineDetail
