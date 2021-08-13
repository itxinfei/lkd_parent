<template>
  <el-dialog
    width="630px"
    title="工单配置"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="syncDialogVisible"
    @open="open"
  >
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="补货警戒线："
        prop="alertValue"
      >
        <el-input-number
          v-model="form.alertValue"
          controls-position="right"
          :min="1"
          :max="100"
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
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Emit, Prop } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { defaultAutoSupplyConfigViewModel, supplyAlertValue, autoSupplyConfig } from '@/api/tasks'
import { AutoSupplyConfigViewModel } from '@/entity/task'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'TaskAutoSupplyConfigDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  private form: AutoSupplyConfigViewModel = { ...defaultAutoSupplyConfigViewModel }
  private formLabelWidth = defaultFormLabelWidth
  // 验证规则
  private rules: object = {
    alertValue: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private async open() {
    const { data } = await supplyAlertValue()
    this.form.alertValue = data
  }

  /**
   * 补货工单
   */
  async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await autoSupplyConfig(this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
