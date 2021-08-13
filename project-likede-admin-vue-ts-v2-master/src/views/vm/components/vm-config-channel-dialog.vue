<template>
  <el-dialog
    width="940px"
    title="货道设置"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <div class="wrapper">
      <div class="channel-basic">
        <span class="vm-row">货道行数：{{ vmType.vmRow }}</span>
        <span class="vm-col">货道列数：{{ vmType.vmCol }}</span>
        <span class="channel-max-capacity">货道容量（个）：{{ vmType.channelMaxCapacity }}</span>
        <primary-button2
          class="business-top10"
          @handleClick="openBusinessTop10Dialog"
        >
          <template v-slot>
            智能排货
          </template>
        </primary-button2>
      </div>
      <!-- TODO: 1.逻辑理解和设计不一致 2.货道大于10个时显示swiper，不是10的倍数的货道显示异常了 -->
      <swiper
        v-loading="listLoading"
        class="swiper"
        :options="swiperOption"
      >
        <swiper-slide
          v-for="pageIndex in totalPage"
          :key="pageIndex"
        >
          <!-- TODO: 样式和UI图稍微有冲突 -->
          <el-row>
            <el-col
              v-for="itemIndex in pageSize"
              :key="itemIndex"
              :span="spanSize"
              :class="itemIndex <= spanSize ? 'space' : ''"
            >
              <vm-config-channel-sku
                :current-index="computedCurrentIndex(pageIndex, itemIndex)"
                :channel="channels[computedCurrentIndex(pageIndex, itemIndex)]"
                @openSetSkuDialog="openSetSkuDialog"
                @openRemoveSkuDialog="openRemoveSkuDialog"
              />
            </el-col>
          </el-row>
        </swiper-slide>
        <div
          slot="pagination"
          class="swiper-pagination"
        />
        <!-- TODO：前进后退按钮放在container外面 -->
        <div
          slot="button-prev"
          class="swiper-button-prev"
        />
        <div
          slot="button-next"
          class="swiper-button-next"
        />
      </swiper>
    </div>

    <vm-config-channel-sku-dialog
      :sku-dialog-visible.sync="skuDialogVisible"
      @refreshList="handleSkuAdd"
    />

    <vm-config-channel-top10-dialog
      :top10-dialog-visible.sync="top10DialogVisible"
      :business-id="vm.businessId"
      @refreshList="handleTop10Add"
    />

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
  PropSync,
  Prop
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import VmConfigChannelSku from './vm-config-channel-sku.vue'
import VmConfigChannelSkuDialog from './vm-config-channel-sku-dialog.vue'
import VmConfigChannelTop10Dialog from './vm-config-channel-top10-dialog.vue'
import { channelConfig, channelList, defaultChannelModelView } from '@/api/channels'
import { Top10Sku, Vm } from '@/entity/vm'
import { defaultVmType, getVmType } from '@/api/vm-types'
import { Channel, ChannelModelView } from '@/entity/channel'
import { Sku } from '@/entity/sku'
import { VmType } from '@/entity/vm-type'

@Component({
  name: 'VmConfigChannelDialog',
  components: {
    Swiper,
    SwiperSlide,
    VmConfigChannelSku,
    PrimaryButton1,
    PrimaryButton2,
    VmConfigChannelSkuDialog,
    VmConfigChannelTop10Dialog
  }
})
export default class extends mixins(MixinTools) {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean
  @Prop({ type: Object }) private readonly vm !: Vm

  private listLoading = false
  private channels: Channel[] = []
  private channelCode = ''
  private skuDialogVisible = false
  private top10DialogVisible = false
  private vmType: VmType = { ...defaultVmType }
  private currentIndex = 0
  private channelModelView: ChannelModelView = { ...defaultChannelModelView }
  private pageSize = 10
  private spanSize = 5
  private swiperOption = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
      progressbarOpposite: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  get totalPage() {
    return Math.ceil(this.vmType.vmRow * this.vmType.vmCol / 10)
  }

  private computedCurrentIndex(pageIndex: number, itemIndex: number) {
    return (pageIndex - 1) * this.pageSize + itemIndex - 1
  }

  // TODO: 1.关闭对话框需要重置listQuery和listData吗？2.切换SwiperSlide需要重置selectedIndex吗？现在默认是保持上一次的检索状态
  private open() {
    this.getVmType()
    this.channelList()
  }

  /**
   * 货道基本信息
   */
  private async getVmType() {
    const { data } = await getVmType(this.vm.vmType)
    this.vmType = data
  }

  /**
   * 查询货道列表
   */
  private async channelList() {
    this.listLoading = true
    const { data } = await channelList(this.vm.innerCode)
    this.channels = data
    this.listLoading = false
  }

  /**
   * 智能排货弹窗
   */
  private openBusinessTop10Dialog() {
    this.top10DialogVisible = true
  }

  /**
   * 采纳智能排货
   */
  private async handleTop10Add(top10Skus: Top10Sku[]) {
    top10Skus.forEach((item, index) => {
      this.channels[index].skuId = item.skuId
      this.channels[index].sku = {
        skuName: item.skuName,
        skuImage: item.image
      }
    })
  }

  /**
   * 商品列表弹窗
   */
  private openSetSkuDialog(currentIndex: number, channelCode: string) {
    this.currentIndex = currentIndex
    this.channelCode = channelCode
    this.skuDialogVisible = true
  }

  /**
   * 添加货道商品
   */
  private async handleSkuAdd(sku: Sku) {
    this.channels[this.currentIndex].skuId = sku.skuId
    this.channels[this.currentIndex].sku = {
      skuName: sku.skuName,
      skuImage: sku.skuImage
    }
  }

  /**
   * 移除货道商品
   */
  private openRemoveSkuDialog(currentIndex: number, channelCode: string) {
    this.currentIndex = currentIndex
    this.channelCode = channelCode
    this.channels[this.currentIndex].skuId = '0'
    this.channels[this.currentIndex].sku = undefined
  }

  /**
   * 提交货道配置
   */
  private async ensureDialog() {
    this.channelModelView.innerCode = this.vm.innerCode
    this.channelModelView.channelList = this.channels.map((item) => {
      return {
        channelCode: item.channelCode,
        skuId: item.skuId
      }
    })
    await channelConfig(this.channelModelView)
    this.syncDialogVisible = false
    this.$emit('refreshList')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';
.wrapper {
  width: 847px;
  margin: 0 auto;

  .channel-basic {
    display: flex;
    align-items: center;
    width: 847px;
    height: 56px;
    margin-bottom: 16px;
    background: $--color-function3;

    .vm-row {
      margin-left: 43px;
    }

    .vm-col {
      margin-left: 55px;
    }

    .channel-max-capacity {
      flex: 1;
      margin-left: 54px;
    }

    .business-top10 {
      margin-right: 22px;
    }
  }

  // TODO: 可以参考swiper.css写的更优雅些
  .swiper-container {
    width: 100%;
    height: 385px;

    .swiper-slide {
      display: flex;
      justify-content: center;
      // align-items: center;
      text-align: center;
    }

    .swiper-pagination-progressbar {
      left: unset;
      right: 0;
      width: 3px;
      background: #F0F0F0;
      border-radius: 3px;
    }

    --swiper-pagination-color: #B6B9C6;
  }

  .space {
    margin-bottom: 20px;
  }
}
</style>
