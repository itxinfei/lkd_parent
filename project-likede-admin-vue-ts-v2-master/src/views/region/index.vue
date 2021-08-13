<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="区域搜索：">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchRegion">
            <template v-slot>
              <svg-icon name="search" />&nbsp;&nbsp;查询
            </template>
          </primary-button2>
        </el-form-item>
      </el-form>
    </div>

    <div class="result">
      <el-row
        type="flex"
        class="operation"
      >
        <primary-button1 @handleClick="openRegionCreateDialog">
          <template v-slot>
            <svg-icon name="create" />&nbsp;&nbsp;新建
          </template>
        </primary-button1>
      </el-row>

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
            <span>{{ (listQuery.pageIndex - 1) * listQuery.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="区域名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="点位数"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nodeCount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备注说明"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openRegionDetailDialog(scope.row)">
              <template v-slot>
                查看详情
              </template>
            </primary-text-button>
            <primary-text-button @handleClick="openRegionEditDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
            <danger-text-button @handleClick="openRegionRemoveConfirm(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchRegion"
      />
    </div>

    <region-create-dialog
      :dialog-visible.sync="createDialogVisible"
      @refreshList="searchRegion"
    />

    <region-edit-dialog
      :dialog-visible.sync="editDialogVisible"
      :region="region"
      @refreshList="searchRegion"
    />

    <region-detail-dialog
      :dialog-visible.sync="detailDialogVisible"
      :region="region"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
import Pagination from '@/components/pagination/index.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import DangerTextButton from '@/components/buttons/danger-text-button.vue'
import RegionCreateDialog from './components/region-create-dialog.vue'
import RegionEditDialog from './components/region-edit-dialog.vue'
import RegionDetailDialog from './components/region-detail-dialog.vue'
import { defaultPage, Page } from '@/entity/page'
import { Region, RegionPageModelView } from '@/entity/region'
import { defaultRegion, defaultRegionPageModelView, removeRegion, searchRegion } from '@/api/regions'

@Component({
  name: 'RegionList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    PrimaryTextButton,
    DangerTextButton,
    RegionCreateDialog,
    RegionEditDialog,
    RegionDetailDialog
  }
})
export default class extends mixins(MixinTools) {
  private listData: Page<Region> = { ...defaultPage }
  private listLoading = false
  private listQuery: RegionPageModelView = { ...defaultRegionPageModelView }
  private createDialogVisible = false
  private editDialogVisible = false
  private detailDialogVisible = false
  private region: Region = { ...defaultRegion }

  created() {
    this.searchRegion()
  }

  private async searchRegion() {
    this.listLoading = true
    this.listQuery.name = this.listQuery.name || undefined

    const { data } = await searchRegion(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private openRegionCreateDialog() {
    this.createDialogVisible = true
  }

  private openRegionDetailDialog(region: Region) {
    this.region = region
    this.detailDialogVisible = true
  }

  private openRegionEditDialog(region: Region) {
    this.region = region
    this.editDialogVisible = true
  }

  private async openRegionRemoveConfirm(id: string) {
    try {
      await this.showDeleteConfirm()
      await removeRegion(id)
      this.showMessage('删除成功')
      this.searchRegion()
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
