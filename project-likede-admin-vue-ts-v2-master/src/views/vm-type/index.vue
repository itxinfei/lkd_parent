<template>
  <div class="app-container">
    <div class="search">
      <el-form
        ref="form"
        :model="listQuery"
        :inline="true"
        size="medium"
      >
        <el-form-item label="型号搜索：">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchVmType">
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
        <primary-button1 @handleClick="openVmTypeCreateDialog">
          <template v-slot>
            <svg-icon name="create" />&nbsp;&nbsp;新建
          </template>
        </primary-button1>
      </el-row>
      <el-table
        ref="multipleTable"
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
          label="型号名称"
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="型号编码"
        >
          <template slot-scope="scope">
            {{ scope.row.model }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设备图片"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.image"
              width="50"
              height="50"
              style="width:50px;height:50px;object-fit:cover;"
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="货道行"
        >
          <template slot-scope="scope">
            {{ scope.row.vmRow }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="货道列"
        >
          <template slot-scope="scope">
            {{ scope.row.vmCol }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="设备容量"
        >
          <template slot-scope="scope">
            {{ scope.row.channelMaxCapacity }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openVmTypeEditDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
            <danger-text-button @handleClick="openVmTypeRemoveConfirm(scope.row.typeId)" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 售货机分页 -->
      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchVmType"
      />
    </div>

    <vm-type-create-dialog
      :dialog-visible.sync="vmTypeCreateDialogVisible"
      @refreshList="searchVmType"
    />

    <vm-type-edit-dialog
      :dialog-visible.sync="vmTypeEditDialogVisible"
      :vm-type="vmType"
      @refreshList="searchVmType"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
import Pagination from '@/components/pagination/index.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import DangerTextButton from '@/components/buttons/danger-text-button.vue'
import VmTypeCreateDialog from './components/vm-type-create-dialog.vue'
import VmTypeEditDialog from './components/vm-type-edit-dialog.vue'
import { defaultPage, Page } from '@/entity/page'
import { defaultVmType, defaultVmTypePageModelView, removeVmType, searchVmType } from '@/api/vm-types'
import { VmType, VmTypePageModelView } from '@/entity/vm-type'

@Component({
  name: 'VmTypeList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    PrimaryTextButton,
    DangerTextButton,
    VmTypeCreateDialog,
    VmTypeEditDialog
  }
})
export default class extends mixins(MixinTools) {
  private listLoading = false
  private listQuery: VmTypePageModelView = { ...defaultVmTypePageModelView }
  private listData: Page<VmType> = { ...defaultPage }

  private vmTypeCreateDialogVisible = false
  private vmTypeEditDialogVisible = false
  private vmType: VmType = { ...defaultVmType }

  created() {
    this.searchVmType()
  }

  private async searchVmType() {
    this.listLoading = true
    this.listQuery.name = this.listQuery.name || undefined
    const { data } = await searchVmType(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private openVmTypeCreateDialog() {
    this.vmTypeCreateDialogVisible = true
  }

  private async openVmTypeEditDialog(vmType: VmType) {
    this.vmType = vmType
    this.vmTypeEditDialogVisible = true
  }

  private async openVmTypeRemoveConfirm(typeId: number) {
    try {
      await this.showDeleteConfirm()
      await removeVmType(typeId)
      this.showMessage('删除成功')
      this.searchVmType()
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
