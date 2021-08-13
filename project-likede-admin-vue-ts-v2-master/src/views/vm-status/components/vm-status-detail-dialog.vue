<template>
  <el-dialog
    width="630px"
    title="设备详情"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-row
      type="flex"
      align="middle"
      justify="space-around"
      class="sku-stats"
    >
      <el-col :span="6">
        销售量：<span class="number">{{ monthOrderCount }}</span><span class="unit">&nbsp;个</span>
      </el-col>
      <el-col :span="7">
        销售额：<template v-if="monthOrderAmount > 10000">
          <span class="number">{{ (monthOrderAmount / 10000).toFixed(2) }}</span><span class="unit">&nbsp;万元</span>
        </template>
        <template v-else>
          <span class="number">{{ monthOrderAmount.toFixed(2) }}</span><span class="unit">&nbsp;元</span>
        </template>
      </el-col>
      <el-col :span="5">
        补货次数：<span class="number">{{ monthSupplyCount }}</span><span class="unit">&nbsp;次</span>
      </el-col>
      <el-col :span="5">
        维修次数：<span class="number">{{ monthRepairCount }}</span><span class="unit">&nbsp;次</span>
      </el-col>
    </el-row>

    <div class="sku-title">
      商品销量（月）
    </div>
    <!-- TODO: 是否添加滚动条 -->
    <el-row
      v-if="monthSkuCollect.length"
      class="sku-list"
    >
      <el-col
        v-for="(item, index) in monthSkuCollect"
        :key="index"
        :span="6"
      >
        <el-row class="sku-item">
          <el-col :span="14">
            <div
              class="sku-name"
              :title="item.skuName"
            >
              {{ item.skuName }}
            </div>
          </el-col>
          <el-col :span="10">
            ：{{ item.count }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div
      v-else
      class="tips"
    >
      当前设备未销售商品
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import Moment from 'moment'
import { orderAmount, orderCount, skuCollect } from '@/api/reports'
import { repairCount, supplyCount } from '@/api/tasks'
import { SkuCollect } from '@/entity/report'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'VmStatusDetailDialog'
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: String }) private readonly innerCode!: string

  private formLabelWidth = defaultFormLabelWidth

  private monthOrderCount = 0
  private monthOrderAmount = 0
  private monthSupplyCount = 0
  private monthRepairCount = 0
  private monthSkuCollect: SkuCollect[] = []

  private async open() {
    const month = {
      start: Moment()
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
      end: Moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      innerCode: this.innerCode
    }
    const start = Moment()
      .startOf('month')
      .format('YYYY-MM-DD')
    const end = Moment()
      .endOf('day')
      .format('YYYY-MM-DD')

    const { data: monthOrderCount } = await orderCount(month)
    const { data: monthOrderAmount } = await orderAmount(month)
    const { data: monthSupplyCount } = await supplyCount(this.innerCode, start, end)
    const { data: monthRepairCount } = await repairCount(this.innerCode, start, end)
    const { data: monthSkuCollect } = await skuCollect(this.innerCode, start, end)

    this.monthOrderCount = parseInt(monthOrderCount, 10)
    this.monthOrderAmount = parseInt(monthOrderAmount, 10) / 100
    this.monthSupplyCount = monthSupplyCount
    this.monthRepairCount = monthRepairCount
    this.monthSkuCollect = monthSkuCollect
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.sku-stats {
  height: 54px;
  background: rgba(227, 233, 245, 0.39);

  .number {
    color: $--color-primary;
  }

  .unit {
    font-size: 12px;
    color: $--color-primary;
  }
}

.sku-title {
  margin: 20px 0 12px 6px;
}

.sku-list {
  border-top: 1px solid $--border-color-base;
  border-left: 1px solid $--border-color-base;

  .sku-item {
    padding: 0 10px;
    line-height: 40px;
    border-right: 1px solid $--border-color-base;
    border-bottom: 1px solid $--border-color-base;

    .sku-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.tips {
  text-align: center;
}
</style>
