<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <sku-sale-stats-chart
          type="日"
          :report-order-stats="dayReportOrderStats"
        />
      </el-col>
      <el-col :span="12">
        <sku-sale-stats-chart
          type="月"
          :report-order-stats="monthReportOrderStats"
        />
      </el-col>
    </el-row>

    <sku-sale-stats-table />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import SkuSaleStatsChart from './components/sku-sale-stats-chart.vue'
import SkuSaleStatsTable from './components/sku-sale-stats-table.vue'
import { orderCount, orderAmount, totalBill, defaultReportOrderStats } from '@/api/reports'
import { ReportOrderStats } from '@/entity/report'

@Component({
  name: 'SkuSaleStats',
  components: {
    SkuSaleStatsChart,
    SkuSaleStatsTable
  }
})
export default class extends Vue {
  private dayReportOrderStats: ReportOrderStats = { ...defaultReportOrderStats }
  private monthReportOrderStats?: ReportOrderStats = { ...defaultReportOrderStats }

  created() {
    this.orderCount()
  }

  private async orderCount() {
    const day = {
      start: Moment()
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      end: Moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    }
    const month = {
      start: Moment()
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
      end: Moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    }

    const { data: dayOrderCount } = await orderCount(day)
    const { data: dayOrderAmount } = await orderAmount(day)
    const { data: dayTotalBill } = await totalBill(day)

    const { data: monthOrderCount } = await orderCount(month)
    const { data: monthOrderAmount } = await orderAmount(month)
    const { data: monthTotalBill } = await totalBill(month)

    this.dayReportOrderStats = {
      orderCount: dayOrderCount,
      orderAmount: dayOrderAmount,
      totalBill: dayTotalBill
    }
    this.monthReportOrderStats = {
      orderCount: monthOrderCount,
      orderAmount: monthOrderAmount,
      totalBill: monthTotalBill
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.box {
  padding: 20px;
  border-radius: 20px;

  .title {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $--color-text-primary;
    line-height: 22px;
  }
}
</style>
