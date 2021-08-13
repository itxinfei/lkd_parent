<template>
  <div :class="boxClass">
    <div class="title">
      {{ type }}销售统计
    </div>
    <el-row
      v-if="reportOrderStats"
      class="stats"
    >
      <el-col :span="8">
        <div class="list">
          <div class="item">
            <div :class="numClass">
              {{ reportOrderStats.orderCount }}
            </div>
            <div :class="textClass">
              当{{ type }}销售量（个）
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="list">
          <div class="item">
            <!-- TODO: 元转成万元 -->
            <div :class="numClass">
              {{ parseInt(reportOrderStats.orderAmount, 10) / 100 }}
            </div>
            <div :class="textClass">
              当{{ type }}销售额（元）
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="list">
          <div class="item">
            <!-- TODO: 元转成万元 -->
            <div :class="numClass">
              {{ parseInt(reportOrderStats.totalBill, 10) / 100 }}
            </div>
            <div :class="textClass">
              当{{ type }}分成（元）
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ReportOrderStats } from '@/entity/report'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SkuSaleStatsChart'
})
export default class extends Vue {
  @Prop({ type: String, default: '' }) private readonly type!: string
  @Prop({ type: Object, default: () => {} }) private readonly reportOrderStats!: ReportOrderStats

  get boxClass() {
    return 'box sku-sale-stats-chart ' + (this.type === '日' ? 'bgc1' : 'bgc2')
  }

  get numClass() {
    return 'num ' + (this.type === '日' ? 'color1 text-shadow1' : 'color3 text-shadow2')
  }

  get textClass() {
    return 'text ' + (this.type === '日' ? 'color2' : 'color4')
  }
}
</script>

<style lang="scss" scoped>
.sku-sale-stats-chart {
  height: calc((100vh - 120px) * 0.25);
  min-height: 166px;

  .stats {
    margin-top: 29px;
    margin-left: 38px;

    .list {
      display: flex;
      justify-content: center; // 关键点

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
  background-image: url('~@/assets/home/circle.png'), url('~@/assets/sku-sale-stats/day.png');
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
}

.bgc2 {
  background: #FBEFE8 url('~@/assets/sku-sale-stats/month.png') no-repeat calc(100% - 12px) 100%;
}
</style>
