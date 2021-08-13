<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="合作商：">
          <el-select
            v-model="partnerId"
            placeholder="请选择"
            :filterable="true"
            clearable
            @change="resetPageIndex"
          >
            <el-option
              v-for="(item, index) in partners"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="datePickerSel"
            class="date-picker"
            style="width:100%"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :clearable="false"
            :picker-options="pickerOptions"
            @change="resetPageIndex"
          />
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="partnerCollect">
            <template v-slot>
              <svg-icon name="search" />&nbsp;&nbsp;查询
            </template>
          </primary-button2>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="stats">
      <el-col :span="4">
        <span class="label">笔数统计：</span>&nbsp;&nbsp;<span class="value">{{ reportOrderStats.orderCount }}</span>&nbsp;&nbsp;<span class="unit">个</span>
      </el-col>
      <el-col :span="4">
        <span class="label">收入统计：</span>&nbsp;&nbsp;<span class="value">{{ parseInt(reportOrderStats.orderAmount, 10) / 100 }}</span>&nbsp;&nbsp;<span class="unit">元</span>
      </el-col>
      <el-col :span="4">
        <span class="label">分成统计：</span>&nbsp;&nbsp;<span class="value">{{ parseInt(reportOrderStats.totalBill, 10) / 100 }}</span><span class="unit">元</span>
      </el-col>
    </el-row>

    <div class="result">
      <el-table
        v-loading="listLoading"
        :data="listData.currentPageRecords"
        fit
        highlight-current-row
        style="width: 100%"
        :header-cell-style="{'padding': '10px 0 9px', 'background': '#F3F6FB', 'font-weight': '500', 'text-align': 'left', 'color': '#666666'}"
        :cell-style="{'padding': '6px 0', 'text-align': 'left', 'color': '#666666'}"
      >
        <el-table-column
          align="center"
          label="订单日期"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="合作商"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ownerName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="分成比例"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ratio }}%</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="收入（元）"
        >
          <template slot-scope="scope">
            <span>+{{ scope.row.orderTotalMoney / 100 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="笔数"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.orderCount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="分成金额（元）"
        >
          <template slot-scope="scope">
            <span>+{{ scope.row.totalBill / 100 }}</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="partnerCollect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import Pagination from '@/components/pagination/index.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import { defaultReportOrderStats, defaultReportPageModelView, orderAmount, orderCount, partnerCollect, totalBill } from '@/api/reports'
import { defaultPage, loadAllParams, Page } from '@/entity/page'
import { PartnerCollect, ReportOrderStats, ReportPageModelView } from '@/entity/report'
import { searchPartner } from '@/api/partners'
import { Partner } from '@/entity/partner'

@Component({
  name: 'SkuSaleStatsTable',
  components: {
    Pagination,
    PrimaryButton2
  }
})
export default class extends Vue {
  private partnerId: number | string = ''
  private reportOrderStats: ReportOrderStats = { ...defaultReportOrderStats }
  private partners: Partner[] = []
  private listLoading = false
  private listQuery: ReportPageModelView = { ...defaultReportPageModelView }
  private listData: Page<PartnerCollect> = { ...defaultPage }
  private datePickerSel: string[] = [
    Moment()
      .startOf('month')
      .format('YYYY-MM-DD'),
    Moment()
      .endOf('day')
      .format('YYYY-MM-DD')
  ]
  private pickerOptions: any = {
    disabledDate(time: any) {
      return time.getTime() > Date.now() - 8.64e6 // - 8.64e7 表示可选择当天时间
    }
  }

  created() {
    this.searchPartner()
    this.partnerCollect()
  }

  private async searchPartner() {
    const { data } = await searchPartner(loadAllParams)
    this.partners = data.currentPageRecords
  }

  private async partnerCollect() {
    this.listLoading = true

    const partner = this.partners.find((partner: Partner) => { return partner.id === this.partnerId })
    this.listQuery.partnerName = partner ? partner.name : undefined

    const params = {
      partnerId: partner ? partner.id : undefined,
      start: this.datePickerSel[0] + ' 00:00:00',
      end: this.datePickerSel[1] + ' 23:59:59'
    }

    const { data: tempOrderCount } = await orderCount(params)
    const { data: tempOrderAmount } = await orderAmount(params)
    const { data: tempTotalBill } = await totalBill(params)

    this.reportOrderStats = {
      orderCount: tempOrderCount,
      orderAmount: tempOrderAmount,
      totalBill: tempTotalBill
    }

    this.listQuery.start = this.datePickerSel[0]
    this.listQuery.end = this.datePickerSel[1]
    const { data } = await partnerCollect(this.listQuery)
    this.listData = data

    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.app-container {
  .search {
    margin-top: 20px;
    margin-bottom: 0;
  }

  .stats {
    background-color: #ffffff;
    padding: 10px 0 0 18px;

    .label {
      font-size: 14px;
      color: $--color-text-primary;
      font-weight: 500;
    }

    .value {
      font-size: 20px;
      color: #FF5757;
      font-weight: 500;
    }

    .unit {
      font-size: 12px;
      color: #000000;
    }
  }

}
</style>
