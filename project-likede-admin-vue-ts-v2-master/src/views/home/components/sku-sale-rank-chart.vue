<template>
  <div class="box bgc3 sku-sale-rank">
    <!-- TODO: 分辨大怎么展示问UI -->
    <div class="header">
      <div class="title">
        商品热榜<span class="sub-title">{{ start }} ~ {{ end }}</span>
      </div>
    </div>
    <div class="body">
      <el-row
        v-for="(item, index) in skuSaleRank"
        :key="index"
      >
        <el-col :span="5">
          <div :class="'top top' + (index + 1)">
            {{ index + 1 }}
          </div>
        </el-col>
        <el-col :span="13">
          <div
            class="sku-name"
            :title="item.skuName"
          >
            {{ item.skuName }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="count">
            {{ item.count }}单
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import { skuTop } from '@/api/reports'
import { SkuSaleRank } from '@/entity/report'

@Component({
  name: 'SkuSaleRankChart'
})
export default class extends Vue {
  private skuSaleRank: SkuSaleRank[] = []
  private start = Moment()
    .startOf('month')
    .format('YYYY.MM.DD')
  private end = Moment()
    .endOf('day')
    .format('YYYY.MM.DD')

  created() {
    this.userWorkTop10()
  }

  private async userWorkTop10() {
    const start = Moment()
      .startOf('month')
      .format('YYYY-MM-DD')
    const end = Moment()
      .endOf('day')
      .format('YYYY-MM-DD')
    const { data } = await skuTop(10, start, end)
    this.skuSaleRank = data
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.sku-sale-rank {
  display: flex;
  flex-direction: column;
  height: calc((100vh - 120px) * 0.6);
  min-height: 538px;
  background: #FFFFFF;
  border-radius: 20px;

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20px;

    .top {
      display: inline-block;
      width: 16px;
      height: 20px;
      margin-left: 10px;
      background: url('~@/assets/user-task-stats/top.png');
      text-align: center;
      font-size: 12px;
      font-family: zihun143-zhengkuchaojihei, zihun143;
      font-weight: normal;
      color: #E9B499;
      line-height: 14px;
    }

    .top1 {
      width: 21px;
      height: 20px;
      background: url('~@/assets/user-task-stats/top1.png');
      color: #8E5900;
    }

    .top2 {
      width: 21px;
      height: 20px;
      background: url('~@/assets/user-task-stats/top2.png');
      color: #494949;
    }

    .top3 {
      width: 21px;
      height: 20px;
      background: url('~@/assets/user-task-stats/top3.png');
      color: #CF6D3D;
    }

    .sku-name {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: $--color-text-primary;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .count {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #737589;
      line-height: 20px;
      text-align: right;
    }
  }
}
</style>
