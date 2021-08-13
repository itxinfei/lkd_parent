<template>
  <el-dialog
    width="858px"
    title="智能排货"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @open="open"
  >
    <div class="wrapper">
      <div class="tips">
        该区域属于{{ businessName }}商圈适合销售一下商品：
      </div>
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in top10Skus"
          :key="index"
          :span="5"
        >
          <vm-config-channel-top10-sku
            :sku-name="item.skuName"
            :sku-image="item.image"
          />
        </el-col>
      </el-row>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <primary-button1 @handleClick="ensureDialog">
        <template v-slot>
          确认
        </template>
      </primary-button1>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  PropSync,
  Prop
} from 'vue-property-decorator'
import VmConfigChannelTop10Sku from './vm-config-channel-top10-sku.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import { businessTop10 } from '@/api/skus'
import { Top10Sku } from '@/entity/vm'
import { businessTypeName } from '@/api/vms'

@Component({
  name: 'VmConfigChannelTop10Dialog',
  components: {
    VmConfigChannelTop10Sku,
    PrimaryButton1
  }
})
export default class extends Vue {
  @PropSync('top10DialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Number }) private readonly businessId !: number

  private businessName = ''
  private top10Skus: Top10Sku[] = []

  private open() {
    this.businessTypeName()
    this.businessTop10()
  }

  private async businessTypeName() {
    const { data } = await businessTypeName(this.businessId)
    this.businessName = data
  }

  private async businessTop10() {
    // TODO: 没有推荐的情况，需要UI提供设计图
    const { data } = await businessTop10(this.businessId)
    this.top10Skus = data
  }

  async ensureDialog() {
    this.syncDialogVisible = false
    this.$emit('refreshList', this.top10Skus)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 750px;
  margin: 0 auto;

  .tips {
    margin-bottom: 16px;
  }
}

</style>
