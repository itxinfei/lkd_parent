<template>
  <div class="box partner-node-collect">
    <div class="header">
      <div class="title">
        合作商点位数Top5
      </div>
      <svg-icon
        name="more"
        class="more"
        @click="handleMoreClick"
      />
    </div>
    <el-row
      :gutter="20"
      type="flex"
      align="middle"
      class="body"
    >
      <el-col :span="17">
        <partner-node-collect-pie-chart :chart-option="pieChartOption" />
      </el-col>
      <el-col :span="7">
        <div class="collect">
          <div class="count">
            {{ nodeCountFormat }}
          </div>
          <div class="name">
            点位数
          </div>
          <div class="count count2">
            {{ partnerCountFormat }}
          </div>
          <div class="name">
            合作商数
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PartnerNodeCollectPieChart from './partner-node-collect-pie-chart.vue'
import { nodeCollect, nodeCount } from '@/api/nodes'
import { partnerCount } from '@/api/partners'

@Component({
  name: 'PartnerNodeCollectChart',
  components: {
    PartnerNodeCollectPieChart
  }
})
export default class extends Vue {
  private pieChartOption = {
    seriesData: []
  }
  private nodeCountFormat = 0
  private partnerCountFormat = 0

  created() {
    this.nodeCollect()
    this.nodeCount()
    this.partnerCount()
  }

  private async nodeCollect() {
    const { data } = await nodeCollect()
    this.pieChartOption.seriesData = data
  }

  private async nodeCount() {
    const { data } = await nodeCount()
    this.nodeCountFormat = data
  }

  private async partnerCount() {
    const { data } = await partnerCount()
    this.partnerCountFormat = data
  }

  private handleMoreClick() {
    this.$router.push('/node/partner')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.partner-node-collect {
  display: flex;
  flex-direction: column;
  height: calc((100vh - 120px) * 0.4);
  min-height: 353px;
  background: #FFFFFF;
  border-radius: 20px;

  .body {
    flex: 1;
    margin-top: 10px;

    .collect {
      width: 154px;
      height: 230px;
      padding-top: 47px;
      padding-left: 38px;
      background: linear-gradient(135deg, transparent 0, #F8F8F9 0) top left,
                  linear-gradient(-135deg, transparent 12px, #F8F8F9 0) top right,
                  linear-gradient(-45deg, transparent 0, #F8F8F9 0) bottom right,
                  linear-gradient(45deg, transparent 12px, #F8F8F9 0) bottom left;
      background-size: 50% 50%;
      background-repeat: no-repeat;

      .count {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #072074;
        line-height: 33px;
      }

      .count2 {
        margin-top: 20px;
      }

      .name {
        height: 17px;
        margin-top: 6px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000412;
        line-height: 17px;
      }
    }
  }
  .more {
    color: $--color-primary;
    cursor: pointer;
  }
}
</style>
