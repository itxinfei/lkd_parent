<template>
  <el-dialog
    width="858px"
    title="选择商品"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @open="open"
  >
    <el-form
      ref="form"
      :model="listQuery"
      :inline="true"
      size="medium"
    >
      <el-form-item
        label="商品名称："
        prop="skuName"
      >
        <el-input
          v-model="listQuery.skuName"
          style="width:314px;"
          placeholder="请输入"
          clearable
          @input="resetPageIndex"
        />
      </el-form-item>
      <el-form-item>
        <primary-button2 @handleClick="searchSku">
          <template v-slot>
            <svg-icon name="search" />&nbsp;&nbsp;查询
          </template>
        </primary-button2>
      </el-form-item>
    </el-form>

    <!-- TODO: 货道大于10个时显示swiper，不是10的倍数的货道显示异常了 -->
    <swiper
      ref="mySwiper"
      v-loading="listLoading"
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide
        v-for="pageIndex in parseInt(listData.totalPage, 10)"
        :key="pageIndex"
      >
        <!-- TODO: swiper-slide动态加载 -->
        <el-row v-if="listQuery.pageIndex === pageIndex">
          <el-col
            v-for="(item, index) in listData.currentPageRecords"
            :key="index"
            :span="spanSize"
          >
            <vm-config-channel-sku-item
              :sku-name="item.skuName"
              :sku-image="item.skuImage"
              :selected="selectedIndex === index"
              @handleCurrentChange="handleCurrentChange(index)"
            />
          </el-col>
        </el-row>
      </swiper-slide>
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

    <div
      slot="footer"
      class="dialog-footer"
    >
      <primary-button1
        :disabled="selectedIndex === -1 ? true : false"
        @handleClick="ensureDialog"
      >
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
  PropSync
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
// TODO: Global Registration
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import VmConfigChannelSkuItem from './vm-config-channel-sku-item.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import { defaultSku, defaultSkuPageModelView, searchSku } from '@/api/skus'
import { Sku, SkuPageModelView } from '@/entity/sku'
import { defaultPage, Page } from '@/entity/page'

@Component({
  name: 'VmConfigChannelSkuDialog',
  components: {
    Swiper,
    SwiperSlide,
    VmConfigChannelSkuItem,
    PrimaryButton1,
    PrimaryButton2
  }
})
export default class extends mixins(MixinTools) {
  @PropSync('skuDialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  private listData: Page<Sku> = { ...defaultPage }
  private listLoading = false
  private listQuery: SkuPageModelView = { ...defaultSkuPageModelView }
  private currentRow: Sku = { ...defaultSku }
  private pageSize = 10
  private spanSize = 5
  // TODO: https://github.com/surmon-china/vue-awesome-swiper/issues/398
  private swiperOption = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      // TODO: https://swiperjs.com/api/#events
      slideChange: () => {
        // TODO: 1.this.selectedIndex没有更新 2.动态更新数据正确用法
        this.selectedIndex = -1
        this.listQuery.pageIndex = this.swiper.activeIndex + 1
        this.searchSku()
        // this.swiper.update()
      }
    }
  }
  private selectedIndex = -1

  // Declared as computed property getter
  get swiper() {
    // TODO: 判断this.$refs.mySwiper的类型
    return (this.$refs.mySwiper as any).$swiper
  }

  // TODO: 1.关闭对话框需要重置listQuery和listData吗？2.切换SwiperSlide需要重置selectedIndex吗？现在默认是保持上一次的检索状态
  private open() {
    this.selectedIndex = -1
    this.searchSku()
  }

  private async searchSku() {
    this.listLoading = true
    this.listQuery.skuName = this.listQuery.skuName || undefined

    const { data } = await searchSku(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
    this.searchSku()
  }

  handleCurrentChange(index: number) {
    this.selectedIndex = index
    this.currentRow = this.listData.currentPageRecords[index]
  }

  async ensureDialog() {
    this.syncDialogVisible = false
    this.$emit('refreshList', this.currentRow)
  }
}
</script>
