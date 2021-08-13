<template>
  <div class="box bgc3 user-task-rank">
    <div class="header">
      <div class="title">
        人效排名（月度）
      </div>
      <el-select
        v-model="regionId"
        placeholder="请选择"
        size="small"
        class="regions"
        :filterable="true"
        @change="userWorkTop10"
      >
        <el-option
          v-for="(item, index) in regions"
          :key="index"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="role-group">
      <div class="role-list">
        <div
          v-for="(item, index) in groupList"
          :key="index"
          :class="'item ' + (isRepair === item.value ? 'is-checked' : '')"
          @click="handleClick(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div
      v-if="userTaskRank.length"
      class="list"
    >
      <el-row
        v-for="(item, index) in userTaskRank"
        :key="index"
      >
        <el-col :span="4">
          <div :class="'top top' + (index + 1)">
            {{ index + 1 }}
          </div>
        </el-col>
        <el-col
          :span="12"
          class="user-name"
        >
          {{ item.userName }}
        </el-col>
        <el-col
          :span="4"
          class="work-count"
        >
          {{ item.workCount }}单
        </el-col>
      </el-row>
    </div>
    <div
      v-else
      class="empty"
    >
      <img
        src="@/assets/home/empty.png"
      >
      <div class="tips">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import { userWorkTop10 } from '@/api/tasks'
import { Region } from '@/entity/region'
import { UserTaskRank } from '@/entity/task'
import { searchRegion } from '@/api/regions'
import { loadAllParams } from '@/entity/page'

const start = Moment()
  .startOf('month')
  .format('YYYY-MM-DD')
const end = Moment()
  .endOf('day')
  .format('YYYY-MM-DD')

type GroupItem = {
  label: string
  value: boolean
}

@Component({
  name: 'UserTaskRankChart'
})
export default class extends Vue {
  private regions: Region[] = [
    {
      id: '0',
      name: '全部',
      nodeCount: 0,
      remark: ''
    }
  ]
  private userTaskRank: UserTaskRank[] = []
  private isRepair = false
  private regionId = '0'
  private groupList: GroupItem[] = [{ label: '运营人员', value: false }, { label: '运维人员', value: true }]

  created() {
    this.searchRegion()
    this.userWorkTop10()
  }

  private async searchRegion() {
    const { data } = await searchRegion(loadAllParams)
    this.regions = this.regions.concat(data.currentPageRecords)
  }

  private async userWorkTop10() {
    const { data } = await userWorkTop10(start, end, this.isRepair, this.regionId)
    this.userTaskRank = data
  }

  private handleClick(isRepair: boolean) {
    if (this.isRepair === isRepair) {
      return
    }
    this.isRepair = isRepair
    this.userWorkTop10()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.user-task-rank {
  display: flex;
  flex-direction: column;
  height: calc((100vh - 120px) * 0.75);
  min-height: 542px;
  margin-top: 20px;
  background: #FFFFFF;

  .list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }

  .regions {
    width: 88px;
  }

  .role-group {
    width: 177px;
    margin: 15px auto 0;

    .role-list {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 34px;
      background: rgba(233, 243, 255, 0.37);
      border-radius: 10px;

      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 78px;
        height: 25px;
        font-size: 14px;
        color: #9CA3B4;
        cursor: pointer;
      }

      .is-checked {
        background: #FFFFFF;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.11);
        border-radius: 7px;
        font-weight: 600px;
        color: $--color-text-primary;
      }
    }
  }

  .top {
    display: inline-block;
    width: 16px;
    height: 20px;
    background: url('~@/assets/user-task-stats/top.png');
    text-align: center;
    font-size: 12px;
    font-family: zihun143-zhengkuchaojihei, zihun143;
    font-weight: normal;
    color: #E9B499;
    line-height: 14px;
  }

  .top1 {
    width: 21px;
    height: 20px;
    background: url('~@/assets/user-task-stats/top1.png');
    color: #8E5900;
  }

  .top2 {
    width: 21px;
    height: 20px;
    background: url('~@/assets/user-task-stats/top2.png');
    color: #494949;
  }

  .top3 {
    width: 21px;
    height: 20px;
    background: url('~@/assets/user-task-stats/top3.png');
    color: #CF6D3D;
  }

  .user-name {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $--color-text-primary;
    line-height: 20px;
  }

  .work-count {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #737589;
    line-height: 20px;
  }

  .empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .tips {
      margin-top: 25px;
      color: #20232A;
      font-size: 14px;
    }
  }
}
</style>
