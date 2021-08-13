<template>
  <el-dialog
    width="630px"
    title="人员详情"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-row class="user-info">
      <el-col :span="9">
        人员名称：{{ user.userName }}
      </el-col>
      <el-col :span="7">
        角色：{{ user.roleName }}
      </el-col>
      <el-col :span="8">
        联系电话：{{ user.mobile }}
      </el-col>
      <el-col
        :span="24"
        class="region-name"
      >
        负责区域：{{ user.regionName }}
      </el-col>
    </el-row>

    <el-row class="user-work">
      <el-col
        :span="5"
        class="item"
      >
        &nbsp;
      </el-col>
      <el-col
        v-for="(item, index) in taskStatus"
        :key="index"
        class="item"
        :span="5"
      >
        {{ item }}
      </el-col>
    </el-row>
    <el-row
      v-for="(item, index) in userWorks"
      :key="index"
      class="user-work"
    >
      <el-col
        :span="5"
        class="item"
      >
        {{ periods[index] }}
      </el-col>
      <el-col
        :span="5"
        class="item"
      >
        {{ item.total }}
      </el-col>
      <el-col
        :span="5"
        class="item"
      >
        {{ item.cancelCount }}
      </el-col>
      <el-col
        :span="5"
        class="item"
      >
        {{ item.workCount }}
      </el-col>
      <el-col
        :span="5"
        class="item"
      >
        {{ item.progressTotal }}
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import Moment from 'moment'
import { defaultUserWorkModelView, userWork } from '@/api/tasks'
import { User, UserWork } from '@/entity/user'
import { defaultUser, getUser } from '@/api/users'
import { UserWorkModelView } from '@/entity/task'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'UserWorkDetailDialog'
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean
  @Prop({ type: Object }) private readonly userWork!: UserWork

  private formLabelWidth = defaultFormLabelWidth
  private taskStatus = ['总工单数', '拒绝工单', '完成工单', '进行中工单']
  private periods = ['本周', '本月', '本年']
  private userWorkModelView: UserWorkModelView = { ...defaultUserWorkModelView }
  private userWorks: UserWork[] = []
  private user: User = { ...defaultUser }

  private async open() {
    this.userWorks = []
    this.getUser()
    await this.getUserWork('week')
    await this.getUserWork('month')
    await this.getUserWork('year')
  }

  private async getUser() {
    const { data } = await getUser(this.userWork.userId)
    this.user = data
  }

  private async getUserWork(type: string) {
    this.userWorkModelView = {
      userId: this.userWork.userId,
      start: Moment()
        .startOf(type as Moment.unitOfTime.StartOf)
        .format('YYYY-MM-DD HH:mm:ss'),
      end: Moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    }

    const { data } = await userWork(this.userWorkModelView)
    this.userWorks.push(data)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';
.user-info {
  height: 86px;
  padding: 19px 52px 0;
  background: $--color-function3;

  .region-name {
    margin-top: 15px;
  }
}

.user-work {
  border-top: 1px solid $--border-color-base;
  border-left: 1px solid $--border-color-base;

  .item {
    line-height: 40px;
    border-right: 1px solid $--border-color-base;
    text-align: center;
  }
}

.user-work:nth-child(2) {
  margin-top: 26px;
  background: #F7F8FD;
}

.user-work:last-child {
  border-bottom: 1px solid $--border-color-base;
}
</style>
