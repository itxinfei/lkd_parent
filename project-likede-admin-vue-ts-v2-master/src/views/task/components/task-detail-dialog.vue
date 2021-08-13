<template>
  <el-dialog
    width="630px"
    title="工单详情"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="syncDialogVisible"
    @open="open"
  >
    <div class="task-status">
      <img
        v-if="task.taskStatus"
        class="icon"
        :src="require('@/assets/task/icon_' + task.taskStatus + '.png')"
      >
      <!-- TODO：工单状态和工单类型可以直接从工单详情中获得 -->
      <span class="status">{{ transformTaskStatus(task.taskStatus) }}</span>
      <img
        v-if="task.taskStatus"
        class="pic"
        :src="require('@/assets/task/pic_' + task.taskStatus + '.png')"
      >
    </div>
    <el-form :label-width="formLabelWidth">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编号：">
            {{ task.innerCode }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建日期：">
            {{ task.createTime | dateTimeFormat }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            v-if="task.taskStatus === 3"
            label="取消日期："
          >
            {{ task.updateTime | dateTimeFormat }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            v-if="task.taskStatus === 4"
            label="完成日期："
          >
            {{ task.updateTime | dateTimeFormat }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="!isRepair ? '运营人员：' : '运维人员：'">
            {{ task.userName }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工单类型：">
            {{ transformProductTypeId(task.productTypeId) }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            v-if="!isRepair"
            label="补货数量："
          >
            <primary-text-button @handleClick="openTaskDetailChannelDialog">
              <template v-slot>
                补货详情
              </template>
            </primary-text-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工单方式：">
            {{ task.createType === 0 ? '自动' : '手动' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="task.taskStatus === 3 ? '取消原因：' : '备注：'"
          >
            {{ task.desc }}
          </el-form-item>
        </el-col>
        <!-- TODO: 1.投放工单有地址 2.备注有时候会显示到对话框外面 -->
      </el-row>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <secondary-button
        v-if="task.taskStatus === 1 || task.taskStatus === 2"
        @handleClick="handleCancelTask"
      >
        <template v-slot>
          取消工单
        </template>
      </secondary-button>
      <secondary-button
        v-else-if="task.taskStatus === 3"
        @handleClick="handleCreateTask"
      >
        <template v-slot>
          重新创建
        </template>
      </secondary-button>
    </div>

    <task-detail-channel-dialog
      :dialog-visible.sync="dialogVisible"
      :task-id="task.taskId"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import TaskDetailChannelDialog from './task-detail-channel-dialog.vue'
import { defaultTask, getAllTaskStatus, getTaskTypeList, taskInfo, cancelTask } from '@/api/tasks'
import { Task, TaskStatus, TaskType } from '@/entity/task'

@Component({
  name: 'TaskDetailDialog',
  components: {
    PrimaryTextButton,
    SecondaryButton,
    TaskDetailChannelDialog
  }
})
export default class extends mixins(MixinTools) {
  @PropSync('detailVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: String }) private readonly taskId!: string
  @Prop(Boolean) readonly isRepair!: boolean

  // 工单状态列表
  private taskStatusList: TaskStatus[] = []
  // 工单类型列表
  private taskTypeList: TaskType[] = []
  private task: Task = { ...defaultTask }

  private formLabelWidth = '120px'
  private dialogVisible = false

  private open() {
    // 工单详情
    this.taskInfo()
    // TODO：工单状态和工单类型可以直接从工单详情中获得
    // 工单状态列表
    this.getAllTaskStatus()
    // 工单类型列表
    this.getTaskTypeList()
  }

  private transformTaskStatus(statusId: number) {
    if (!this.taskStatusList) {
      return ''
    }
    const taskStatus:TaskStatus | undefined = this.taskStatusList.find((taskStatus: TaskStatus) => {
      return taskStatus.statusId === statusId
    })
    return taskStatus ? taskStatus.statusName : ''
  }

  private transformProductTypeId(productTypeId: number) {
    if (!this.taskTypeList) {
      return ''
    }
    const taskType:TaskType | undefined = this.taskTypeList.find((taskType: TaskType) => {
      return taskType.typeId === productTypeId
    })
    return taskType ? taskType.typeName : ''
  }

  openTaskDetailChannelDialog() {
    this.dialogVisible = true
  }

  /**
   * 工单状态列表
   */
  private async getAllTaskStatus() {
    const { data } = await getAllTaskStatus()
    this.taskStatusList = data
  }

  /**
   * 工单类型列表
   */
  private async getTaskTypeList() {
    const { data } = await getTaskTypeList()
    this.taskTypeList = data
  }

  private async taskInfo() {
    const { data } = await taskInfo(this.taskId)
    this.task = data
  }

  /**
   * 重新创建
   */
  private async handleCreateTask() {
    this.syncDialogVisible = false
    this.$emit('openTaskAddDialog', this.task.taskId)
  }

  /**
   * 取消工单
   */
  private async handleCancelTask() {
    try {
      await this.showConfirm('取消工单后，将不能恢复，是否确认取消')
      await cancelTask(this.task.taskId, {
        taskId: this.task.taskId,
        desc: ''
      })
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>

<style lang="scss" scoped>
.task-status {
  display: flex;
  align-items: center;
  height: 54px;
  margin-bottom: 30px;
  background-color: rgba(236, 236, 236, 0.39);

  .icon {
    margin-left: 22px;
  }

  .status {
    flex: 1;
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.85);
  }

  .pic {
    margin-right: 76px;
    margin-bottom: 7px;
  }
}
</style>
