<template>
  <div class="home-card">
    <!-- 今日/今周总收入 -->
    <div class="card-top">
      <img class="img-top" src="@/assets/Index/light-red-Shading.png" alt="" />
      <!-- 上部分-总收入 -->
      <div class="income">
        <div class="income-left">
          <h2>今日总收入</h2>
          <p>
            <span class="money">{{ cardInfo.dayMoney ? cardInfo.dayMoney / 100 : 0 }}</span>
            <span class="company">元</span>
          </p>
        </div>
        <div class="income-right">
          <h2>本周总收入</h2>
          <p>
            <span class="money">{{ cardInfo.weekMoney ? cardInfo.weekMoney / 100 : 0 }}</span>
            <span class="company">元</span>
          </p>
        </div>
      </div>
      <!-- 下部分-百分比 -->
      <div class="percent">
        <h3>
          <!-- <img src="@/assets/Index/up-arrow.png" alt=""/> -->
          <img v-if="Number(cardInfo.percentMoney) >= 0" src="@/assets/Index/up.png" alt=""/>
          <img v-else src="@/assets/Index/down.png" alt=""/>
          <span class="percent-span">{{ cardInfo.percentMoney ? cardInfo.percentMoney : 0 }}%</span>
          <span class="second-span">同比上周</span>
        </h3>
      </div>
      <img class="img-bottom" src="@/assets/Index/red-Shading.png" alt="" />
    </div>
    <!-- 今日/今周订单数 -->
    <div class="card-bottom">
      <img class="img-top" src="@/assets/Index/light-blue-Shading.png" alt="" />
      <!-- 上部分-总收入 -->
      <div class="income">
        <div class="income-left">
          <h2>今日订单数</h2>
          <p>
            <span class="money">{{ cardInfo.dayOrderNumber ? cardInfo.dayOrderNumber : 0 }}</span>
            <span class="company">个</span>
          </p>
        </div>
        <div class="income-right">
          <h2>本周订单数</h2>
          <p>
            <span class="money">{{ cardInfo.currentAmount ? cardInfo.currentAmount : 0 }}</span>
            <span class="company">个</span>
          </p>
        </div>
      </div>
      <!-- 下部分-百分比 -->
      <div class="percent">
        <h3>
          <img v-if="Number(cardInfo.percent) >= 0" src="@/assets/Index/up.png" alt=""/>
          <img v-else src="@/assets/Index/down.png" alt=""/>
          <!-- <i v-if="Number(cardInfo.percent) > 0" class="iconfont iconlujing2x1" style="color: #fff;"></i> -->
          <!-- <i v-else class="iconfont iconxiangxia"></i> -->
          <span class="percent-span">{{ cardInfo.percent }}%</span>
          <span class="second-span">同比上周</span>
        </h3>
      </div>
      <img class="img-bottom" src="@/assets/Index/blue-Shading.png" alt="" />
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { startToday, endToday, getWeekStartDate } from '@/utils/formValidate'
import Cookies from 'js-cookie'
import Moment from 'moment'
import { CardInfo, HomeCardRes } from '@/types/home/HomeCard'
import { getReportOrderAmount, getReportOrderCount, getReportAmountInfo, getRerportOrderCountInfo } from '@/api/index.ts'

@Component
export default class HomeCard extends Vue {
  static componentName = 'HomeCard'
  private cardInfo: CardInfo = {
    dayMoney: '',
    weekMoney: '',
    percentMoney: '',
    dayOrderNumber: '',
    currentAmount: '',
    percent: ''
  }
  private getUserInfo = JSON.parse(Cookies.get('setUserInfo'))

  created () {
    this.getReportOrderAmount()
    this.getReportOrderAmountWeek()
  }

  // 获取当天时间的订单和收入查询
  getReportOrderAmount () {
    const params = {
      partnerId: this.getUserInfo.userId,
      start: startToday(),
      end: endToday()
    }
    // 优化抽离请求接口
    Promise.all([ getReportOrderAmount(params), getReportOrderCount(params) ]).then(res => {
      if (res && res !== null) {
        this.cardInfo = {
          ...this.cardInfo,
          dayMoney: res[0] ? res[0] : '',
          dayOrderNumber: res[1] ? res[1] : ''
        } as CardInfo
      }
    })
  }

  // 获取本周时间的订单和收入查询
  getReportOrderAmountWeek () {
    const params = {
      id: this.getUserInfo.userId,
      weekStartDate: Moment().startOf('week').format('YYYY-MM-DD HH:mm:ss'),
      startToday
    } as {
      id: string;
      startToday: Function;
      weekStartDate: string;
    }
    Promise.all([ getReportAmountInfo(params), getRerportOrderCountInfo(params) ]).then(res => {
      if (res && res !== null) {
        this.cardInfo = {
          ...this.cardInfo,
          weekMoney: res[0] ? (res[0] as HomeCardRes).currentAmount : '',
          percentMoney: res[0] ? (res[0] as HomeCardRes).percent : '',
          currentAmount: res[1] ? (res[1] as HomeCardRes).currentAmount : '',
          percent: res[1] ? (res[1] as HomeCardRes).percent : ''
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  // 左边部分
  .home-card {
    width: 390px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // 今日/今周总收入
    .card-top {
      width: 100%;
      height: 178px;
      background: linear-gradient(166deg,rgba(255,144,144,1) 5%, rgba(255,87,87,1) 98%);
      // background-color: #ffffff;
      box-shadow: 0px 3px 24px 0px rgba(0,0,0,0.15);
    }
    .card-top, .card-bottom {
      overflow: hidden;
      position: relative;
      .img-top {
        position: absolute;
        top: 0;
        left: 0;
        width: 142px;
      }
      .img-bottom {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 122px;
      }
      .income {
        margin-top: 24px;
        width: 100%;
        height: 80px;
        display: flex;
        .income-left, .income-right {
          flex: 1;
          h2 {
            margin: 0;
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #ffffff;
            margin-left: 40px;
          }
          p {
            margin: 0;
            margin-left: 40px;
            .money {
              font-size: 30px;
              font-family: PingFangSC, PingFangSC-Semibold;
              font-weight: 600;
              color: #ffffff;
            }
            .company {
              margin-left: 8px;
              font-size: 14px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
        .income-right {
          flex: 1;
        }
      }
      .percent {
        width: 100%;
        height: 40px;
        margin-top: 10px;
        // margin-left: 28px;
        // 改变下部分百分比对齐位置
        padding-left: 40px;
        box-sizing: border-box;
        overflow: hidden;
        h3 {
          margin: 0;
          img {
            width: 8px;
            height: 13px;
            vertical-align: middle;
            margin-right: 4px;
            margin-bottom: 2px;
          }
          .percent-span {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 400;
            color: #ffffff;
            display: inline-block;
            padding-top: 10px;
          }
          .second-span {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            margin-left: 25px;
          }
        }
      }
    }
    // 今日/今周订单数
    .card-bottom {
      position: relative;
      width: 100%;
      height: 178px;
      // background: linear-gradient(166deg,#3b447b 5%, #2e3564 36%, #191e41 98%);
      // background: linear-gradient(166deg,#3b447b 5%, #2e3564 36%, #2e3564 98%);
      background: linear-gradient(166deg, #8596F6, #4849CD 100%);
      box-shadow: 0px 3px 24px 0px rgba(0,0,0,0.15);
    }


    /deep/ .iconfont {
      color: #fff;
    }
  }
</style>