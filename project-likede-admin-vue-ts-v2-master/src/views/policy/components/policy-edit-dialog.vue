<template>
  <el-dialog
    width="630px"
    title="修改策略"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
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
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { Policy, PolicyModelView } from '@/entity/policy'
import { editPolicy, defaultPolicyModelView } from '@/api/policies'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'PolicyEditDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Object }) private readonly policy!: Policy

  private formLabelWidth = defaultFormLabelWidth
  private form: PolicyModelView = { ...defaultPolicyModelView }

  // 验证规则
  private rules: object = {
    policyName: [{ required: true, message: '请输入', trigger: 'change' }],
    discount: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private open() {
    this.form = {
      policyName: this.policy.policyName,
      discount: this.policy.discount
    }
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await editPolicy(this.policy.policyId, this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
