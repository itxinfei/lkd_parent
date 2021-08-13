<template>
  <div class="title-index">
    <div class="month">
      <div class="title-info">
        <img src="@/assets/Index/title.png" alt="" />
        <h3>收益统计</h3>
      </div>
      
      <div class="right-info">
        <ul class="tabs">
          <li class="li-tab" v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{ active: index === nowIndex }" :key="index">
            {{item}}
          </li>
        </ul>
        <div class="date-picker">
          <el-date-picker class="data-time" align="left" v-model="value" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" @change="getArrDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
// 第一个上月、第二个第三个获取本周结束开始日期  getLastMonthStartDateAndEndDate废弃  getWeekEndDateChart废弃
import { getMonthStartAndEnd, startTodayNoHMS } from '@/utils/formValidate'

@Component
export default class TitleIndex extends Vue {
  nowIndex = 0
  // getWeekStartDateChart 废弃 2021/01/12
  value = [ this.funDate(-6), startTodayNoHMS() ]
  tabsParam = [ '近7天', '上月' ]

  private pickerOptions = {
    disabledDate(time: Date) {
      // return time.getTime() > Date.now()
      // 限定只能选择一年内的时间
      const curDate = (new Date()).getTime()
      const three = 360 * 24 * 3600 * 1000
      const threeMonths = curDate - three
      return time.getTime() > Date.now() || time.getTime() < threeMonths
    }
  }

  toggleTabs (index: number) {
    this.nowIndex = index
    this.value = []
    this.$emit('sendTitleInd', index)
    switch (index) {
      case 0:
        this.value = [ this.funDate(-6), startTodayNoHMS() ]
        break;
      case 1:
        this.value = [ ...getMonthStartAndEnd(-1) ]
        break;
      default:
        this.value = []
    }
  }

  getArrDate () {
    this.nowIndex = 2
    this.$emit('sendTitleInd', this.value)
  }

  funDate (aa: number) {
    const date1 = new Date()
    const date2 = new Date(date1)
    date2.setDate(date1.getDate() + aa )
    const tempGetMonth = (date2.getMonth() + 1) < 10 ? '0' + (date2.getMonth() + 1) : (date2.getMonth() + 1)
    // const time2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate())
    const time2 = date2.getFullYear() + '-' + tempGetMonth + '-' + (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate())
    return time2
  }

}
</script>

<style lang="scss" scoped>
  .title-index {
    width: 100%;
    height: 48px;
    border-radius: 10px;
    .month {
      width: 100%;
      display: flex;
      .title-info {
        width: 200px;
        img {
          width: 60px;
          vertical-align: middle;
        }
        h3 {
          margin: 0;
          display: inline-block;
          position: absolute;
          left: 2%;
          top: 20px;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: left;
          color: #ffffff;
        }
      }
      
      .right-info {
        text-align: right;
        flex: 1;
        margin-top: 10px;
        ul {
          display: inline-block;
          margin: 0;
          li {
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            cursor: pointer;
            display:inline-block;
            text-align: center;
            color: #94a1cb;
            padding: 4px 12px;
          }
          li:last-child {
            margin-left: 16px;
          }
          .active {
            height: 18px;
            line-height: 18px;
            text-align: center;
            color: #ffffff;
            background: #282d5c;
            border-radius: 14px;
            padding: 4px 12px;
          }
        }
        .date-picker {
          margin-left: 40px;
          display: inline-block;
        }
      }
    }

    /deep/ .el-input__inner {
      // background: #2c3260;
      background: #282d5c;
      // border: 1px solid #727cad;
      border: none;
    }
    /deep/ .el-date-editor .el-range-input {
      // background: #2c3260;
      background: #282d5c;
    }
    .date-picker {
      flex: 1;
      line-height: 48px;
      /deep/ .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
        width: 300px;
        border-radius: 40px;
      }
    }

    // /deep/ .el-date-range-picker  {
    //   left: 1247px!important;
    // }

    // 日期选择器中间横线颜色
    /deep/ .el-range-editor--small .el-range-separator {
      line-height: 26px;
      color: #bec7e7;
    }

    // /deep/ .el-picker-panel .el-date-range-picker .el-popper {
    //   left: 1247px !important;
    // }
    // /deep/ .el-date-range-picker {
    //   left: 1247px !important;
    // }
  }
</style>