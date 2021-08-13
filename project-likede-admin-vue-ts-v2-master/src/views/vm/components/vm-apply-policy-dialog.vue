<template>
  <el-dialog
    width="630px"
    title="策略管理"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="form"
      :inline="false"
      :model="vmPolicy"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="机器编号："
      >
        <span>{{ innerCode }}</span>
      </el-form-item>
      <el-form-item
        label="策略名称："
      >
        <span>{{ vmPolicy.policyName }}</span>
      </el-form-item>
      <el-form-item
        label="策略方案："
      >
        <span>{{ vmPolicy.discount }}%</span>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <secondary-button
        @handleClick="cancelPolicy"
      >
        <template v-slot>
          取消策略
        </template>
      </secondary-button>
      <!-- TODO: 添加策略 -->
      <!-- <primary-button1 @handleClick="ensureDialog">
        <template v-slot>
          确认
        </template>
      </primary-button1> -->
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { cancelPolicy } from '@/api/vms'
import { VmPolicy } from '@/entity/policy'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'VmApplyPolicyDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop(String) private readonly innerCode !: string
  @Prop(Object) private readonly vmPolicy !: VmPolicy

  private formLabelWidth = defaultFormLabelWidth

  private async cancelPolicy() {
    await cancelPolicy(this.innerCode, this.vmPolicy.policyId)
    this.syncDialogVisible = false
    this.$emit('refreshList')
  }
}
</script>
