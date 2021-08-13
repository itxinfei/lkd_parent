<template>
  <el-dialog
    width="630px"
    title="新增区域"
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
        label="区域名称："
        prop="regionName"
      >
        <el-input
          v-model="form.regionName"
          autocomplete="off"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="备注说明："
        prop="remark"
      >
        <el-input
          v-model="form.remark"
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
  </el-dialog>
</template>

<script lang="ts">
import { Component, PropSync } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { ElForm } from 'element-ui/types/form'
import MixinTools from '@/utils/mixins.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { createRegion, defaultRegionModelView } from '@/api/regions'
import { RegionModelView } from '@/entity/region'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'RegionCreateDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends mixins(MixinTools) {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  private formLabelWidth = defaultFormLabelWidth
  private form: RegionModelView = { ...defaultRegionModelView }

  // 验证规则
  private rules: object = {
    regionName: [{ required: true, message: '请输入', trigger: 'change' }],
    remark: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await createRegion(this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
