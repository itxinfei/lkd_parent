<template>
  <el-dialog
    width="630px"
    title="修改合作商"
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
        label="合作商名称："
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
        label="联系人："
        prop="contact"
      >
        <el-input
          v-model="form.contact"
          autocomplete="off"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="联系电话："
        prop="mobile"
      >
        <el-input
          v-model="form.mobile"
          autocomplete="off"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="分成比例(%)："
        prop="ratio"
      >
        <el-input-number
          v-model="form.ratio"
          controls-position="right"
          :min="0"
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
import { Partner, PartnerModelView } from '@/entity/partner'
import { editPartner, defaultPartnerEditModelView } from '@/api/partners'
import { validatePhone } from '@/utils/validate'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'PartnerEditDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Object }) private readonly partner!: Partner

  private formLabelWidth = defaultFormLabelWidth
  private form: PartnerModelView = { ...defaultPartnerEditModelView }

  // 验证规则
  private rules: object = {
    name: [{ required: true, message: '请输入', trigger: 'change' }],
    contact: [{ required: true, message: '请输入', trigger: 'change' }],
    mobile: [
      { required: true, message: '请输入', trigger: 'change' },
      { validator: validatePhone, trigger: 'change' }
    ],
    ratio: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private open() {
    this.form = {
      name: this.partner.name,
      contact: this.partner.contact,
      mobile: this.partner.mobile,
      ratio: this.partner.ratio,
      account: this.partner.account
    }
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      // 提交表单
      await editPartner(this.partner.id, this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
