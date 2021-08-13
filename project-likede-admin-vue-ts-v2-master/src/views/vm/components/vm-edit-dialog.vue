<template>
  <el-dialog
    width="630px"
    title="设备详情"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-form
      :label-width="formLabelWidth"
    >
      <el-form-item label="机器编号：">
        {{ vm.innerCode }}
      </el-form-item>
      <el-form-item label="供货时间：">
        {{ vm.lastSupplyTime | dateTimeFormat }}
      </el-form-item>
      <el-form-item label="设备类型：">
        {{ vm.type.name }}
      </el-form-item>
      <el-form-item label="设备容量：">
        {{ vm.type.channelMaxCapacity }}
      </el-form-item>
      <el-form-item
        label="设备点位："
        prop="nodeId"
      >
        <el-select
          v-model="nodeId"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in nodes"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合作商：">
        {{ vm.ownerName }}
      </el-form-item>
      <el-form-item label="所属区域：">
        {{ vm.region.name }}
      </el-form-item>
      <el-form-item label="设备地址：">
        {{ vm.node.addr.substring(vm.node.addr.lastIndexOf('-') + 1) }}
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
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { editVm } from '@/api/vms'
import { searchNode } from '@/api/nodes'
import { Nodes } from '@/entity/node'
import { Vm } from '@/entity/vm'
import { loadAllParams } from '@/entity/page'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'VmEditDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Object }) private readonly vm !: Vm

  private nodeId = ''
  private nodes: Nodes[] = []
  private formLabelWidth = defaultFormLabelWidth

  private open() {
    this.nodeId = this.vm.nodeId
    this.searchNode()
  }

  private async searchNode() {
    let { data } = await searchNode(loadAllParams)
    this.nodes = data.currentPageRecords
  }

  async ensureDialog() {
    // 提交表单
    await editVm(this.vm.id, this.nodeId)
    this.syncDialogVisible = false
    this.$emit('refreshList')
  }
}
</script>
