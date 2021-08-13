<template>
  <div class="box user-task-status">
    <div class="header">
      <div class="title">
        工单状态
      </div>
      <!-- TODO: 时间选择器样式还原 -->
      <el-date-picker
        v-model="datePickerSel"
        class="date-picker"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        size="small"
        :clearable="false"
        :picker-options="pickerOptions"
        @change="handleDatePickerSelChange"
      />
      <common-week-month-year @handleChange="handleRadioGroupSelChange" />
    </div>

    <div class="charts">
      <user-task-status-bar-chart
        id="user-task-status-bar-chart"
        width="100%"
        height="100%"
        :chart-option="chartOption"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CommonWeekMonthYear from '@/components/week-month-year/index.vue'
import Moment from 'moment'
import UserTaskStatusBarChart from './user-task-status-bar-chart.vue'
import { collectReport } from '@/api/tasks'
import { UserTaskStatus } from '@/entity/task'

@Component({
  name: 'UserTaskStatusChart',
  components: {
    CommonWeekMonthYear,
    UserTaskStatusBarChart
  }
})
export default class extends Vue {
  private datePickerSel: string[] = []
  private radioGroupSel: string = 'week'
  private pickerOptions: any = {
    disabledDate(time: any) {
      return time.getTime() > Date.now() - 8.64e6 // - 8.64e7 表示可选择当天时间
    }
  }
  private userTaskStatus: UserTaskStatus[] = []
  private chartOption: any = {
    xAxisData: [],
    seriesData: [],
    legendData: ['完成工单', '取消工单'],
    yAxisName: '工单量：个'
  }

  created() {
    this.handleRadioGroupSelChange(this.radioGroupSel)
  }

  private async collectReport() {
    const { data } = await collectReport(this.datePickerSel[0], this.datePickerSel[1])

    let collectDateList: string[] = []
    let finishCountList: number[] = []
    let cancelCountList: number[] = []
    data.forEach(item => {
      collectDateList.push(Moment(item.collectDate).format('M月D日'))
      finishCountList.push(item.finishCount)
      cancelCountList.push(item.cancelCount)
    })

    this.chartOption.xAxisData = collectDateList
    this.chartOption.seriesData = [finishCountList, cancelCountList]
  }

  private handleDatePickerSelChange() {
    this.radioGroupSel = ''
    this.collectReport()
  }

  private handleRadioGroupSelChange(radioGroupSel: string) {
    this.radioGroupSel = radioGroupSel

    const start = Moment()
      .startOf(this.radioGroupSel as Moment.unitOfTime.StartOf)
      .format('YYYY-MM-DD')
    const end = Moment()
      .endOf('day')
      .format('YYYY-MM-DD')

    this.datePickerSel = [start, end]
    this.collectReport()
  }
}
</script>

<style lang="scss" scoped>
.user-task-status {
  display: flex;
  flex-direction: column;
  height: calc((100vh - 120px) * 0.75);
  min-height: 542px;
  margin-top: 20px;
  background: #FFFFFF;

  .charts {
    flex: 1;
    display: flex;
  }
}
</style>
