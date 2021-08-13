<template>
  <el-dialog
    width="630px"
    title="新增商品"
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
      <el-form-item
        label="商品名称："
        prop="skuName"
      >
        <el-input
          v-model="form.skuName"
          autocomplete="off"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="品牌："
        prop="brandName"
      >
        <el-input
          v-model="form.brandName"
          autocomplete="off"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="商品价格（元）："
        prop="price"
      >
        <el-input-number
          v-model="form.price"
          :precision="2"
          :step="0.5"
          controls-position="right"
          :min="0.01"
          :max="9999.99"
        />
      </el-form-item>
      <el-form-item
        label="商品类型："
        prop="classId"
      >
        <el-select
          v-model="form.classId"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in skuClasses"
            :key="index"
            :label="item.className"
            :value="item.classId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="规格："
        prop="unit"
      >
        <el-input
          v-model="form.unit"
          autocomplete="off"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="商品图片："
        prop="skuImage"
      >
        <common-upload :image-url.sync="form.skuImage" />
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
import { SkuClass, SkuModelView } from '@/entity/sku'
import { createSku, defaultSkuModelView } from '@/api/skus'
import { searchSkuClass } from '@/api/sku-classes'
import { loadAllParams } from '@/entity/page'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'SkuCreateDialog',
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
  private form: SkuModelView = { ...defaultSkuModelView }
  private skuClasses: SkuClass[] = []

  // 验证规则
  private rules: object = {
    skuName: [{ required: true, message: '请输入', trigger: 'change' }],
    brandName: [{ required: true, message: '请输入', trigger: 'change' }],
    price: [{ required: true, message: '请输入', trigger: 'change' }],
    classId: [{ required: true, message: '请输入', trigger: 'change' }],
    unit: [{ required: true, message: '请输入', trigger: 'change' }],
    skuImage: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private open() {
    this.searchSkuClass()
  }

  private async searchSkuClass() {
    const { data } = await searchSkuClass(loadAllParams)
    this.skuClasses = data.currentPageRecords
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      const data = { ...this.form }
      if (typeof data.price === 'number') {
        data.price *= 100
      }
      // 提交表单
      await createSku(data)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
