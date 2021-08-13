import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtCalendar } from 'taro-ui'

import './index.scss'

class CalendarSelect extends Component {
  render() {
    return (
      <View className='calendar-select'>
        <AtCalendar
          isMultiSelect
          currentDate={{ start: '2020/10/01', end: '2020/10/31' }}
        />
      </View>
    )
  }
}

export default CalendarSelect
