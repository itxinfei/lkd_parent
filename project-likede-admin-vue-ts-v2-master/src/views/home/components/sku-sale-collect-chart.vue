<template>
  <div class="box sku-sale-collect">
    <div class="header">
      <div class="title">
        销售数据<span class="sub-title">{{ datePickerFormat[0] }} ~ {{ datePickerFormat[1] }}</span>
      </div>
      <common-week-month-year @handleChange="handleRadioGroupSelChange" />
    </div>
    <div class="charts">
      <!-- TODO: 数据为空的情况 -->
      <sku-sale-collect-line-chart
        id="amount-collect"
        width="50%"
        height="100%"
        title="销售额趋势图"
        :chart-option="lineChartOption"
      />
      <!-- TODO: 数据为空的情况 -->
      <sku-sale-collect-bar-chart
        id="region-collect"
        width="50%"
        height="100%"
        title="销售额分布"
        :chart-option="barChartOption"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CommonWeekMonthYear from '@/components/week-month-year/index.vue'
import Moment from 'moment'
import SkuSaleCollectLineChart from './sku-sale-collect-line-chart.vue'
import SkuSaleCollectBarChart from './sku-sale-collect-bar-chart.vue'
import { UserTaskStatus } from '@/entity/task'
import { amountCollect, regionCollect } from '@/api/reports'

@Component({
  name: 'SkuSaleCollectChart',
  components: {
    CommonWeekMonthYear,
    SkuSaleCollectLineChart,
    SkuSaleCollectBarChart
  }
})
export default class extends Vue {
  private datePickerSel: string[] = []
  private datePickerFormat: string[] = []
  private radioGroupSel: string = 'week'
  private userTaskStatus: UserTaskStatus[] = []
  private lineChartOption: any = {
    xAxisData: [],
    seriesData: [],
    yAxisName: '单位：元'
  }
  private collectType = 1 // 统计时间类型，1:按日统计，2:按月统计
  private barChartOption: any = {
    xAxisData: [],
    seriesData: [],
    yAxisName: '单位：元'
  }

  created() {
    this.handleRadioGroupSelChange(this.radioGroupSel)
  }

  private handleRadioGroupSelChange(radioGroupSel: string) {
    if (radioGroupSel === 'week' || radioGroupSel === 'month') {
      this.collectType = 1
    } else {
      this.collectType = 2
    }
    this.radioGroupSel = radioGroupSel

    const start = Moment()
      .startOf(this.radioGroupSel as Moment.unitOfTime.StartOf)
      .format('YYYY-MM-DD')
    const end = Moment()
      .endOf('day')
      .format('YYYY-MM-DD')
    const startFormat = Moment()
      .startOf(this.radioGroupSel as Moment.unitOfTime.StartOf)
      .format('YYYY.MM.DD')
    const endFormat = Moment()
      .endOf('day')
      .format('YYYY.MM.DD')

    this.datePickerSel = [start, end]
    this.datePickerFormat = [startFormat, endFormat]
    this.amountCollect()
    this.regionCollect()
  }

  private async amountCollect() {
    const { data: { xAxis, series } } = await amountCollect(this.collectType, this.datePickerSel[0], this.datePickerSel[1])

    // 根据周、月、年显示不同的横轴
    this.lineChartOption.xAxisData = xAxis.map((item: string) => {
      if (this.radioGroupSel === 'week') {
        return Moment(item).format('dddd')
      }
      if (this.radioGroupSel === 'month') {
        return Moment(item).format('M月D日')
      }
      return Moment(item).format('YYYY年M月')
    })
    this.lineChartOption.seriesData = series.map((item: number) => { return item / 100 })
  }

  private async regionCollect() {
    const { data: { xAxis, series } } = await regionCollect(this.datePickerSel[0], this.datePickerSel[1])
    // TODO: 当区域大于10个时，显示前5个和后5个区域，中间显示一个柱子
    this.barChartOption.xAxisData = xAxis
    this.barChartOption.seriesData = series.map((item: number) => { return item / 100 })
  }
}
</script>

<style lang="scss" scoped>
.sku-sale-collect {
  display: flex;
  flex-direction: column;
  // TODO: 临时解决方案，当前页面的横纵布局需要重新思考
  height: calc((100vh - 120px) * 0.4 - 20px);
  min-height: 352px;
  margin-top: 20px;
  background: #FFFFFF;
  border-radius: 20px;

  .charts {
    flex: 1;
    display: flex;
  }
}
</style>
