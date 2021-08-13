<template>
  <el-dialog
    width="630px"
    title="新增设备类型"
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
        label="型号名称："
        prop="name"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="型号编码："
        prop="model"
      >
        <el-input
          v-model="form.model"
          autocomplete="off"
          placeholder="请输入（限制数字、字母、中划线、下划线）"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="货道行数："
        prop="vmRow"
      >
        <el-input-number
          v-model="form.vmRow"
          controls-position="right"
          :min="1"
          :max="10"
        />
      </el-form-item>
      <el-form-item
        label="货道列数："
        prop="vmCol"
      >
        <el-input-number
          v-model="form.vmCol"
          controls-position="right"
          :min="1"
          :max="10"
        />
      </el-form-item>
      <el-form-item
        label="货道容量："
        prop="channelMaxCapacity"
      >
        <el-input-number
          v-model="form.channelMaxCapacity"
          controls-position="right"
          :min="1"
          :max="10"
        />
      </el-form-item>
      <el-form-item
        label="设备图片："
        prop="image"
      >
        <common-upload :image-url.sync="form.image" />
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
import { Component, Vue, PropSync } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
import { ElForm } from 'element-ui/types/form'
import CommonUpload from '@/components/upload/index.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { createVmType, defaultVmTypeModelView } from '@/api/vm-types'
import { validateModel } from '@/utils/validate'
import { VmTypeModelView } from '@/entity/vm-type'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'VmTypeCreateDialog',
  components: {
    CommonUpload,
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends mixins(MixinTools) {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  private formLabelWidth = defaultFormLabelWidth
  private form: VmTypeModelView = { ...defaultVmTypeModelView }

  // 验证规则
  private rules: object = {
    name: [{ required: true, message: '请输入', trigger: 'change' }],
    model: [
      { required: true, message: '请输入', trigger: 'change' },
      { validator: validateModel, trigger: 'change' }
    ],
    vmRow: [{ required: true, message: '请输入', trigger: 'change' }],
    vmCol: [{ required: true, message: '请输入', trigger: 'change' }],
    channelMaxCapacity: [{ required: true, message: '请输入', trigger: 'change' }],
    image: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await createVmType(this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
