<template>
  <el-dialog
    width="630px"
    title="批量策略管理"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-form
      :inline="false"
      :model="form"
    >
      <el-form-item
        label="选择策略："
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.policyId"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in policies"
            :key="index"
            :label="item.policyName"
            :value="item.policyId"
          />
        </el-select>
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
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { policyList } from '@/api/policies'
import { applyPolicy, defaultApplyPolicyModelView } from '@/api/vms'
import { Policy } from '@/entity/policy'
import { ApplyPolicyModelView } from '@/entity/vm'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'VmBatchApplyPolicyDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean

  @Prop({ type: Array }) private innerCodeList!: string[]

  private form: ApplyPolicyModelView = { ...defaultApplyPolicyModelView }
  private formLabelWidth = defaultFormLabelWidth
  private policies: Policy[] = []

  private async open() {
    const { data } = await policyList()
    this.policies = data
  }

  async ensureDialog() {
    this.form.innerCodeList = this.innerCodeList
    await applyPolicy(this.form)

    this.syncDialogVisible = false
    this.$emit('refreshList')
  }
}
</script>
