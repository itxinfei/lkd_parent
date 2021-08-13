<template>
  <el-dialog
    width="630px"
    title="新增工单"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="syncDialogVisible"
    @open="open"
    @close="closeDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="设备编号："
        prop="innerCode"
      >
        <el-input
          v-model="form.innerCode"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="工单类型："
        prop="productType"
      >
        <el-select
          v-model="form.productType"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in taskTypeList"
            :key="index"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <!-- TODO: 补货数量是空的时候， 添加校验 -->
      <el-form-item
        v-if="!isRepair"
        label="补货数量："
        prop="details"
      >
        <primary-text-button @handleClick="channelDetails">
          <template v-slot>
            <div class="replenishment">
              <svg-icon name="detailed-list" />&nbsp;<span>补货清单</span>
            </div>
          </template>
        </primary-text-button>
      </el-form-item>
      <el-form-item
        :label="!isRepair ? '运营人员：' : '运维人员：'"
        prop="assignorId"
      >
        <el-select
          v-model="form.assignorId"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in userList"
            :key="index"
            :label="item.userName"
            :value="item.userId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="备注："
        prop="desc"
      >
        <el-input
          v-model="form.desc"
          type="textarea"
          placeholder="请输入备注（不超过40字）"
          maxlength="40"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <secondary-button
        @handleClick="syncDialogVisible = false"
      >
        <template v-slot>
          取消
        </template>
      </secondary-button>
      <primary-button1 @handleClick="ensureDialog">
        <template v-slot>
          确认
        </template>
      </primary-button1>
    </div>

    <task-create-channel-dialog
      :channel-visible.sync="channelVisible"
      :inner-code="form.innerCode"
      @getDetailList="getDetailList"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { ElForm } from 'element-ui/types/form'
import MixinTools from '@/utils/mixins.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import TaskCreateChannelDialog from './task-create-channel-dialog.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import { createTask, defaultTaskModelView, taskDetails, taskInfo } from '@/api/tasks'
import { TaskDetail, TaskModelView, TaskType } from '@/entity/task'
import { TaskUser } from '@/entity/user'
import { operatorList, repairerList } from '@/api/users'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'TaskCreateDialog',
  components: {
    PrimaryButton1,
    SecondaryButton,
    TaskCreateChannelDialog,
    PrimaryTextButton
  }
})
export default class extends mixins(MixinTools) {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean
  @Prop(Array) readonly taskTypeList!: TaskType[]
  @Prop(String) readonly taskId!: string
  @Prop(Boolean) readonly isRepair!: boolean
  @Watch('form.innerCode')
  onInnerCodeChanged(newInnerCode: string, oldInnerCode: string) {
    this.getUserList()
  }

  private formLabelWidth = defaultFormLabelWidth
  // 工单新增表单
  private form: TaskModelView = { ...defaultTaskModelView }
  // 区域人员列表
  private userList: TaskUser[] = []
  // 验证规则
  private rules: object = {
    innerCode: [{ required: true, message: '请输入', trigger: 'change' }],
    productType: [{ required: true, message: '请选择', trigger: 'change' }],
    assignorId: [{ required: true, message: '请选择', trigger: 'change' }],
    desc: [{ required: true, message: '请输入', trigger: 'change' }]
  }
  private channelVisible = false

  private open() {
    // 重新创建数据回显
    if (this.taskId) {
      this.taskInfo()
    }
  }

  private async taskInfo() {
    // 工单详情回显
    const { data: task } = await taskInfo(this.taskId)
    // TODO: 这个地方偶尔会出现form值未清空的情况，需要排查问题原因
    this.form.innerCode = task.innerCode
    this.form.assignorId = task.assignorId
    this.form.productType = task.taskType.typeId
    this.form.desc = task.desc
    // 补货详情回显
    if (task.taskType.typeId === 2) {
      const { data } = await taskDetails(this.taskId)
      this.form.details = data.map((taskDetail: TaskDetail) => {
        return {
          channelCode: taskDetail.channelCode,
          expectCapacity: taskDetail.expectCapacity,
          skuId: taskDetail.skuId,
          skuName: taskDetail.skuName,
          skuImage: taskDetail.skuImage
        }
      })
    }
  }

  /**
   * 补货详情
   */
  private async channelDetails() {
    (this.$refs['form'] as ElForm).validateField('innerCode', async(errorMessage: string) => {
      if (errorMessage) {
        return
      }
      this.channelVisible = true
    })
  }

  /**
   * 货道详情
   */
  private getDetailList(detailList: TaskDetail[]) {
    this.form.details = detailList
  }

  private async getUserList() {
    const innerCode = this.form.innerCode
    if (!innerCode) {
      this.userList = []
      return
    }
    const { data } = this.isRepair ? await repairerList(innerCode) : await operatorList(innerCode)
    if (!data) {
      this.userList = []
      return
    }
    this.userList = data
  }

  /**
   * 工单新增
   */
  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await createTask(this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.replenishment {
  display: inline-flex;
  align-items: center;

  .svg-icon {
    color: $--color-primary;
  }
}
</style>
