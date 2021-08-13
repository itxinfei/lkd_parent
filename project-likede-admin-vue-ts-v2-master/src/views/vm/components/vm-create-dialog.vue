<template>
  <el-dialog
    width="630px"
    title="新增设备"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
    @close="closeDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="formLabelWidth"
    >
      <el-form-item label="设备编号：">
        系统自动生成
      </el-form-item>
      <el-form-item
        label="选择型号："
        prop="vmType"
      >
        <el-select
          v-model="form.vmType"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in vmTypes"
            :key="index"
            :label="item.name"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="选择点位："
        prop="nodeId"
      >
        <el-select
          v-model="form.nodeId"
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
import { ElForm } from 'element-ui/types/form'
import MixinTools from '@/utils/mixins.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { searchNode } from '@/api/nodes'
import { createVm, defaultVmModelView } from '@/api/vms'
import { searchVmType } from '@/api/vm-types'
import { VmType } from '@/entity/vm-type'
import { Nodes } from '@/entity/node'
import { loadAllParams } from '@/entity/page'
import { VmModelView } from '@/entity/vm'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'VmCreateDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends mixins(MixinTools) {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean

  private formLabelWidth = defaultFormLabelWidth
  private form: VmModelView = { ...defaultVmModelView }
  private vmTypes: VmType[] = []
  private nodes: Nodes[] = []

  // 验证规则
  private rules: object = {
    vmType: [{ required: true, message: '请输入', trigger: 'change' }],
    nodeId: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  open() {
    // 型号列表
    this.getVmTypeList()
    // 点位列表
    this.getNodeList()
  }

  /**
   * 型号列表
   */
  private async getVmTypeList() {
    const { data } = await searchVmType(loadAllParams)
    this.vmTypes = data.currentPageRecords
  }

  /**
   * 点位列表
   */
  private async getNodeList() {
    const { data } = await searchNode(loadAllParams)
    this.nodes = data.currentPageRecords
  }

  /**
   * 售货机新增
   */
  async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await createVm(this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
