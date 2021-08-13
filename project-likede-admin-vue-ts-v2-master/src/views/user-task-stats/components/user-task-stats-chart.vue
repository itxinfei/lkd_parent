<template>
  <div :class="boxClass">
    <div class="title">
      {{ type }}人员（当天）
    </div>
    <el-row
      v-if="stats"
      class="stats"
    >
      <el-col :span="6">
        <div class="list">
          <div class="item">
            <div :class="numClass">
              {{ stats.total }}
            </div>
            <div :class="textClass">
              工单总数（个）
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="list">
          <div class="item">
            <div :class="numClass">
              {{ stats.completedTotal }}
            </div>
            <div :class="textClass">
              完成工单（个）
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="list">
          <div class="item">
            <div :class="numClass">
              {{ stats.cancelTotal }}
            </div>
            <div :class="textClass">
              拒绝工单（个）
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="list">
          <div class="item">
            <div :class="numClass">
              {{ stats.workerCount }}
            </div>
            <div :class="textClass">
              {{ type }}人员数（个）
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { UserTaskStats } from '@/entity/task'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'UserTaskStatsChart'
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) private readonly repair!: boolean
  @Prop({ type: Array, default: () => [] }) private readonly userTaskStats!: UserTaskStats[]

  get stats() {
    return this.userTaskStats.find((item) => {
      return this.repair === item.repair
    })
  }

  get type() {
    return !this.repair ? '运营' : '运维'
  }

  get boxClass() {
    return 'box user-task-stats-chart ' + (!this.repair ? 'bgc1' : 'bgc2')
  }

  get numClass() {
    return 'num ' + (!this.repair ? 'color1 text-shadow1' : 'color3 text-shadow2')
  }

  get textClass() {
    return 'text ' + (!this.repair ? 'color2' : 'color4')
  }
}
</script>

<style lang="scss" scoped>
.user-task-stats-chart {
  height: calc((100vh - 120px) * 0.25);
  min-height: 166px;

  .stats {
    margin-top: 30px;

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
  background-color: #e9f3ff;
  background-image: url('~@/assets/home/circle.png'), url('~@/assets/user-task-stats/truck.png');
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
}

.bgc2 {
  background: #FBEFE8 url('~@/assets/user-task-stats/operation.png') no-repeat calc(100% - 12px) 100%;
}
</style>
