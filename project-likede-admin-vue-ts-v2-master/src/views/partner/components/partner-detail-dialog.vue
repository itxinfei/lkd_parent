<template>
  <el-dialog
    width="630px"
    title="合作商详情"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="form"
      :model="partner"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="合作商名称："
      >
        {{ partner.name }}
      </el-form-item>
      <el-form-item
        label="联系人："
      >
        {{ partner.contact }}
      </el-form-item>
      <el-form-item
        label="联系电话："
      >
        {{ partner.mobile }}
      </el-form-item>
      <el-form-item
        label="分成比例："
      >
        {{ partner.ratio }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import { Partner } from '@/entity/partner'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'PartnerDetailDialog'
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Object }) private readonly partner!: Partner

  private formLabelWidth = defaultFormLabelWidth
}
</script>
