<template>
  <div>
    <!-- TODO: 这个地方需要重新分析设计，用flex布局，如果用el-row，使用justify和align -->
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="13">
            <home-user-task-stats />
          </el-col>
          <el-col :span="11">
            <home-sku-sale-stats />
          </el-col>
        </el-row>
        <sku-sale-collect-chart />
      </el-col>
      <el-col :span="6">
        <sku-sale-rank-chart />
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin-top: 20px;"
    >
      <el-col :span="14">
        <partner-node-collect-chart />
      </el-col>
      <el-col :span="10">
        <abnormal-equipment-table />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomeUserTaskStats from './components/home-user-task-stats.vue'
import HomeSkuSaleStats from './components/home-sku-sale-stats.vue'
import SkuSaleRankChart from './components/sku-sale-rank-chart.vue'
import SkuSaleCollectChart from './components/sku-sale-collect-chart.vue'
import PartnerNodeCollectChart from './components/partner-node-collect-chart.vue'
import AbnormalEquipmentTable from './components/abnormal-equipment-table.vue'

@Component({
  name: 'Home',
  components: {
    HomeUserTaskStats,
    HomeSkuSaleStats,
    SkuSaleRankChart,
    SkuSaleCollectChart,
    PartnerNodeCollectChart,
    AbnormalEquipmentTable
  }
})
export default class extends Vue {}
</script>

<style lang="scss">
// TODO: 高度动态计算
@import '@/styles/element-variables.scss';

.box {
  padding: 20px;
  border-radius: 20px;

  .header {
    display: flex;
  }

  .title {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: $--color-text-primary;
  }

  .sub-title {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color:#999999;
  }
}
</style>
