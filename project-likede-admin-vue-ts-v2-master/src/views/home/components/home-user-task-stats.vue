<template>
  <div :class="boxClass">
    <div class="header">
      <div class="title">
        工单统计<span class="sub-title">{{ start }} ~ {{ end }}</span>
      </div>
    </div>
    <div
      v-if="userTaskStats.length"
      class="body"
    >
      <div class="stats">
        <div class="item">
          <div :class="numClass">
            {{ userTaskStats[0].total + userTaskStats[1].total }}
          </div>
          <div :class="textClass">
            工单总数（个）
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div :class="numClass">
            {{ userTaskStats[0].completedTotal + userTaskStats[1].completedTotal }}
          </div>
          <div :class="textClass">
            完成工单（个）
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div :class="numClass">
            {{ userTaskStats[0].progressTotal + userTaskStats[1].progressTotal }}
          </div>
          <div :class="textClass">
            进行工单（个）
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div :class="numClass">
            {{ userTaskStats[0].cancelTotal + userTaskStats[1].cancelTotal }}
          </div>
          <div :class="textClass">
            取消工单（个）
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import { taskReportInfo } from '@/api/tasks'
import { UserTaskStats } from '@/entity/task'

@Component({
  name: 'HomeUserTaskStats'
})
export default class extends Vue {
  private repair!: boolean
  private userTaskStats: UserTaskStats[] =[]
  private start = Moment()
    .startOf('month')
    .format('YYYY.MM.DD')
  private end = Moment()
    .endOf('day')
    .format('YYYY.MM.DD')

  created() {
    this.taskReportInfo()
  }

  private async taskReportInfo() {
    const start = Moment()
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss')
    const end = Moment()
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss')
    const { data } = await taskReportInfo(start, end)
    this.userTaskStats = data
  }

  get boxClass() {
    return 'box home-user-task-stats bgc1'
  }

  get numClass() {
    return 'num color1 text-shadow1'
  }

  get textClass() {
    return 'text color2'
  }
}
</script>

<style lang="scss" scoped>
// TODO: 首页、人效统计、对账统计样式抽出组件
.home-user-task-stats {
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
