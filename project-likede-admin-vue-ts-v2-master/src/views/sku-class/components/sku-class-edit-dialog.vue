<template>
  <el-dialog
    width="630px"
    title="修改商品类型"
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
        label="商品类型名称："
        prop="className"
      >
        <el-input
          v-model="form.className"
          autocomplete="off"
          placeholder="请输入"
          maxlength="10"
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
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { defaultSkuClassModelView, editSkuClass } from '@/api/sku-classes'
import { SkuClass, SkuClassModelView } from '@/entity/sku-class'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'SkuClassEditDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Object }) private readonly skuClass!: SkuClass

  private formLabelWidth = defaultFormLabelWidth
  private form: SkuClassModelView = { ...defaultSkuClassModelView }

  // 验证规则
  private rules: object = {
    className: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private open() {
    this.form = {
      className: this.skuClass.className
    }
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await editSkuClass(this.skuClass.classId, this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
