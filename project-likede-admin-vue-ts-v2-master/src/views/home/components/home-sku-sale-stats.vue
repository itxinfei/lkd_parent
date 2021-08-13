<template>
  <div :class="boxClass">
    <div class="header">
      <div class="title">
        销售统计<span class="sub-title">{{ start }} ~ {{ end }}</span>
      </div>
    </div>
    <div class="body">
      <div class="stats">
        <div class="item">
          <div :class="numClass">
            {{ orderCountNum }}
          </div>
          <div :class="textClass">
            订单量（个）
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div :class="numClass">
            {{ orderAmountNum > 10000 ? (orderAmountNum / 10000).toFixed(2) : orderAmountNum }}
          </div>
          <div :class="textClass">
            销售额（{{ orderAmountNum > 10000 ? '万元' : '元' }}）
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import { orderCount, orderAmount } from '@/api/reports'

@Component({
  name: 'HomeSkuSaleStats'
})
export default class extends Vue {
  private repair!: boolean
  private orderCountNum = 0
  private orderAmountNum = 0
  private start = Moment()
    .startOf('month')
    .format('YYYY.MM.DD')
  private end = Moment()
    .endOf('day')
    .format('YYYY.MM.DD')

  created() {
    this.orderCount()
    this.orderAmount()
  }

  private async orderCount() {
    const month = {
      start: Moment()
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
      end: Moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    }
    const { data } = await orderCount(month)
    this.orderCountNum = data
  }

  private async orderAmount() {
    const month = {
      start: Moment()
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
      end: Moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    }
    const { data } = await orderAmount(month)
    this.orderAmountNum = parseInt(data, 10) / 100
  }

  get boxClass() {
    return 'box home-sku-sale-stats bgc2'
  }

  get numClass() {
    return 'num color3 text-shadow2'
  }

  get textClass() {
    return 'text color4'
  }
}
</script>

<style lang="scss" scoped>
.home-sku-sale-stats {
  display: flex;
  flex-direction: column;
  height: calc((100vh - 120px) * 0.2);
  min-height: 166px;
  background: #E9F3FF;
  border-radius: 20px;

  .body {
    flex: 1;
    display: flex;

    .stats {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .item {
        display: inline-flex; // 关键点
        flex-direction: column;

        .num {
          height: 50px;
          font-size: 36px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          line-height: 50px;
          text-shadow: 2px 4px 7px rgba(85, 132, 255, 0.5);
        }

        .text {
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #91a7dc;
          line-height: 17px;
        }

        .color1 {
          color: #072074;
        }

        .color2 {
          color: #91a7dc;
        }

        .color3 {
          color: #ff5757;
        }

        .color4 {
          color: #de9690;
        }

        .text-shadow1 {
          text-shadow: 2px 4px 7px rgba(85, 132, 255, 0.5);
        }

        .text-shadow2 {
          text-shadow: 2px 4px 7px rgba(255, 99, 85, 0.5);
        }
      }
    }

  }
}

.bgc1 {
  background: #E9F3FF;
  background-image: url('~@/assets/home/circle.png'), url('~@/assets/home/task.png');
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
}

.bgc2 {
  background: #FBEFE8 url('~@/assets/home/sale.png') no-repeat calc(100% - 12px) 100%;
}
</style>
