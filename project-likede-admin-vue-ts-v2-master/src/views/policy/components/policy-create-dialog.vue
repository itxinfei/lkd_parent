<template>
  <el-dialog
    width="630px"
    title="新增策略"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="策略名称："
        prop="policyName"
      >
        <el-input
          v-model="form.policyName"
          autocomplete="off"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="策略方案："
        prop="discount"
      >
        <el-input-number
          v-model="form.discount"
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
import { Component, PropSync } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
import { ElForm } from 'element-ui/types/form'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { createPolicy, defaultPolicyModelView } from '@/api/policies'
import { PolicyModelView } from '@/entity/policy'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'PolicyCreateDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends mixins(MixinTools) {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  private formLabelWidth = defaultFormLabelWidth
  private form: PolicyModelView = { ...defaultPolicyModelView }

  // 验证规则
  private rules: object = {
    policyName: [{ required: true, message: '请输入', trigger: 'change' }],
    discount: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await createPolicy(this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
