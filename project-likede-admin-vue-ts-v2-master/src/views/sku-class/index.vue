<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="商品类型搜索：">
          <el-input
            v-model="listQuery.className"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchSkuClass">
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
        <primary-button1 @handleClick="openSkuClassCreateDialog">
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
          label="商品类型名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openSkuClassEditDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
            <danger-text-button @handleClick="openSkuClassRemoveConfirm(scope.row.classId)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchSkuClass"
      />
    </div>

    <sku-class-create-dialog
      :dialog-visible.sync="createDialogVisible"
      @refreshList="searchSkuClass"
    />

    <sku-class-edit-dialog
      :dialog-visible.sync="editDialogVisible"
      :sku-class="skuClass"
      @refreshList="searchSkuClass"
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
import { defaultPage, Page } from '@/entity/page'
import { SkuClass, SkuClassPageModelView } from '@/entity/sku-class'
import { defaultSkuClass, searchSkuClass, removeSkuClass, defaultSkuClassPageModelView } from '@/api/sku-classes'
import SkuClassCreateDialog from './components/sku-class-create-dialog.vue'
import SkuClassEditDialog from './components/sku-class-edit-dialog.vue'

@Component({
  name: 'SkuClassList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    PrimaryTextButton,
    DangerTextButton,
    SkuClassCreateDialog,
    SkuClassEditDialog
  }
})
export default class extends mixins(MixinTools) {
  private listData: Page<SkuClass> = { ...defaultPage }
  private listLoading: boolean = false
  private listQuery: SkuClassPageModelView = { ...defaultSkuClassPageModelView }
  private createDialogVisible: boolean = false
  private editDialogVisible: boolean = false
  private skuClass: SkuClass = { ...defaultSkuClass }

  created() {
    this.searchSkuClass()
  }

  private async searchSkuClass() {
    this.listLoading = true
    this.listQuery.className = this.listQuery.className || undefined

    const { data } = await searchSkuClass(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private openSkuClassCreateDialog() {
    this.createDialogVisible = true
  }

  private openSkuClassEditDialog(skuClass: SkuClass) {
    this.skuClass = skuClass
    this.editDialogVisible = true
  }

  private async openSkuClassRemoveConfirm(classId: number) {
    try {
      await this.showDeleteConfirm()
      await removeSkuClass(classId)
      this.showMessage('删除成功')
      this.searchSkuClass()
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
