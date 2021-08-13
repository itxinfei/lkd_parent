<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <user-task-stats-chart
          :repair="false"
          :user-task-stats="userTaskStats"
        />
      </el-col>
      <el-col :span="12">
        <user-task-stats-chart
          :repair="true"
          :user-task-stats="userTaskStats"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <user-task-status-chart />
      </el-col>
      <el-col :span="6">
        <user-task-rank-chart />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import UserTaskStatsChart from './components/user-task-stats-chart.vue'
import UserTaskStatusChart from './components/user-task-status-chart.vue'
import UserTaskRankChart from './components/user-task-rank-chart.vue'
import { taskReportInfo } from '@/api/tasks'
import { UserTaskStats } from '@/entity/task'

@Component({
  name: 'UserTaskStats',
  components: {
    UserTaskStatsChart,
    UserTaskStatusChart,
    UserTaskRankChart
  }
})
export default class extends Vue {
  private userTaskStats: UserTaskStats[] = []

  created() {
    this.taskReportInfo()
  }

  private async taskReportInfo() {
    const start = Moment()
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss')
    const end = Moment()
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss')
    const { data } = await taskReportInfo(start, end)
    this.userTaskStats = data
  }
}
</script>

<style lang="scss">
@import '@/styles/element-variables.scss';

.box {
  padding: 20px;
  border-radius: 20px;

  .header {
    display: flex;

    .title {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: $--color-text-primary;
    }

    .date-picker {
      width: 230px;
      margin-right: 21px;
    }
  }
}
</style>
