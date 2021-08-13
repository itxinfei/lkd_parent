import React, { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import { VmEntity } from '../../../../interfaces/vm'
import VendingMachineRow from '../vending_machine_row'

type IProps = {
  vm: VmEntity
  onClick: any
}

interface VendingMachineItem {
  props: IProps
}

class VendingMachineItem extends Component {
  handleNavigate = (innerCode: string) => {
    this.props.onClick(innerCode)
  }

  render() {
    const { vm } = this.props
    const showDetail = false
    return (
      <View
        className='vending-machine-item'
        onClick={this.handleNavigate.bind(this, vm.innerCode)}
      >
        <VendingMachineRow showDetail={showDetail} vm={vm} />
      </View>
    )
  }
}

export default VendingMachineItem
