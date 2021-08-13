<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="商品搜索：">
          <el-input
            v-model="listQuery.skuName"
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
    </div>

    <div class="result">
      <el-row
        type="flex"
        class="operation"
      >
        <primary-button1 @handleClick="openSkuCreateDialog">
          <template v-slot>
            <svg-icon name="create" />&nbsp;&nbsp;新建
          </template>
        </primary-button1>
        <secondary-button
          @handleClick="openSkuImportDialog"
        >
          <template v-slot>
            导入数据
          </template>
        </secondary-button>
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
          label="商品名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.skuName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品图片"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.skuImage"
              width="50"
              height="50"
              style="width:50px;height:50px;object-fit:cover;"
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="品牌"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.brandName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="规格"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品价格"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.price / 100 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品类型"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.skuClass.className }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建日期"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateTimeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openSkuEditDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchSku"
      />
    </div>

    <sku-create-dialog
      :dialog-visible.sync="createDialogVisible"
      @refreshList="searchSku"
    />

    <sku-edit-dialog
      :dialog-visible.sync="editDialogVisible"
      :sku="sku"
      @refreshList="searchSku"
    />

    <sku-import-dialog
      :dialog-visible.sync="importDialogVisible"
      @refreshList="searchSku"
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
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import SkuCreateDialog from './components/sku-create-dialog.vue'
import SkuEditDialog from './components/sku-edit-dialog.vue'
import SkuImportDialog from './components/sku-import-dialog.vue'
import { defaultPage, Page } from '@/entity/page'
import { Sku, SkuPageModelView } from '@/entity/sku'
import { defaultSku, searchSku, defaultSkuPageModelView } from '@/api/skus'

@Component({
  name: 'SkuList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    SecondaryButton,
    PrimaryTextButton,
    SkuCreateDialog,
    SkuEditDialog,
    SkuImportDialog
  }
})
export default class extends mixins(MixinTools) {
  private listLoading = false
  private listQuery: SkuPageModelView = { ...defaultSkuPageModelView }
  private listData: Page<Sku> = { ...defaultPage }
  private createDialogVisible = false
  private editDialogVisible = false
  private importDialogVisible = false
  private sku: Sku = { ...defaultSku }

  created() {
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
  }

  private openSkuCreateDialog() {
    this.createDialogVisible = true
  }

  private openSkuImportDialog() {
    this.importDialogVisible = true
  }

  private openSkuEditDialog(sku: Sku) {
    this.sku = sku
    this.editDialogVisible = true
  }
}
</script>
