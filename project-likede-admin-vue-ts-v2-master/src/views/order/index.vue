<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="订单编号:">
          <el-input
            v-model="listQuery.orderNo"
            placeholder="请输入订单编号"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item label="选择日期:">
          <el-date-picker
            v-model="datePickerSel"
            class="date-picker"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleDatePickerSelChange"
          />
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchOrder">
            <template v-slot>
              <svg-icon name="search" />&nbsp;&nbsp;查询
            </template>
          </primary-button2>
        </el-form-item>
      </el-form>
    </div>

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
          width="80"
          align="center"
          label="序号"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单编号"
        >
          <template slot-scope="scope">
            {{ scope.row.orderNo }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品名称"
        >
          <template slot-scope="scope">
            {{ scope.row.skuName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单金额（元）"
        >
          <template slot-scope="scope">
            {{ (scope.row.amount / 100).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设备编号"
        >
          <template slot-scope="scope">
            {{ scope.row.innerCode }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单状态"
        >
          <template slot-scope="scope">
            {{ orderStatus[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单日期"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | dateTimeFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openOrderDetailDialog(scope.row)">
              <template v-slot>
                查看详情
              </template>
            </primary-text-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchOrder"
      />
    </div>

    <order-detail-dialog
      :dialog-visible.sync="detailDialogVisible"
      :order="order"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import OrderDetailDialog from './components/order-detail-dialog.vue'
import { defaultOrder, defaultOrderPageModelView, ORDER_STATUS, searchOrder } from '@/api/orders'
import { defaultPage, Page } from '@/entity/page'
import { Order, OrderPageModelView } from '@/entity/order'

@Component({
  name: 'OrderList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryTextButton,
    OrderDetailDialog
  }
})
export default class extends Vue {
  private listLoading = false
  private listQuery: OrderPageModelView = { ...defaultOrderPageModelView }
  private listData: Page<Order> = { ...defaultPage }
  private datePickerSel: string[] = []
  private orderStatus = ORDER_STATUS

  private detailDialogVisible = false
  private order: Order = { ...defaultOrder }

  created() {
    this.searchOrder()
  }

  private async searchOrder() {
    this.listLoading = true
    this.listQuery.orderNo = this.listQuery.orderNo || undefined

    const { data } = await searchOrder(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private handleDatePickerSelChange(datePickerSel: string[] | null) {
    if (!datePickerSel) {
      this.listQuery.startDate = undefined
      this.listQuery.endDate = undefined
    } else {
      this.listQuery.startDate = datePickerSel[0]
      this.listQuery.endDate = datePickerSel[1]
    }
    this.resetPageIndex()
  }

  private openOrderDetailDialog(order: Order) {
    this.order = order
    this.detailDialogVisible = true
  }
}
</script>
