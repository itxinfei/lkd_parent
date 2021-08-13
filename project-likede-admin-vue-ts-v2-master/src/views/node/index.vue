<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="点位搜索：">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item label="区域搜索：">
          <el-select
            v-model="listQuery.regionId"
            placeholder="请选择"
            :filterable="true"
            clearable
            @change="resetPageIndex"
          >
            <el-option
              v-for="(item, index) in regions"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchNode">
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
        <primary-button1 @handleClick="openNodeCreateDialog">
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
          label="点位名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="所在区域"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.region.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商圈类型"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.businessType.name }}</span>
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
          label="详细地址"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.addr.substring(scope.row.addr.lastIndexOf('-') + 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openNodeDetailDialog(scope.row)">
              <template v-slot>
                查看详情
              </template>
            </primary-text-button>
            <primary-text-button @handleClick="openNodeEditDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
            <danger-text-button @handleClick="openNodeRemoveConfirm(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchNode"
      />
    </div>

    <node-create-dialog
      :dialog-visible.sync="createDialogVisible"
      @refreshList="searchNode"
    />

    <node-edit-dialog
      :dialog-visible.sync="editDialogVisible"
      :node="node"
      @refreshList="searchNode"
    />

    <node-detail-dialog
      :dialog-visible.sync="detailDialogVisible"
      :node-id="nodeId"
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
import NodeCreateDialog from './components/node-create-dialog.vue'
import NodeEditDialog from './components/node-edit-dialog.vue'
import NodeDetailDialog from './components/node-detail-dialog.vue'
import { defaultNode, defaultNodePageModelView, removeNode, searchNode } from '@/api/nodes'
import { defaultPage, loadAllParams, Page } from '@/entity/page'
import { NodePageModelView, Nodes } from '@/entity/node'
import { searchRegion } from '@/api/regions'
import { Region } from '@/entity/region'

@Component({
  name: 'NodeList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    PrimaryTextButton,
    DangerTextButton,
    NodeCreateDialog,
    NodeEditDialog,
    NodeDetailDialog
  }
})
export default class extends mixins(MixinTools) {
  // 所在区域
  private regions: Region[] = []

  // 分页相关
  private listLoading = false
  private listQuery: NodePageModelView = { ...defaultNodePageModelView }
  private listData: Page<Nodes> = { ...defaultPage }

  // 对话框相关
  private createDialogVisible = false
  private editDialogVisible = false
  private detailDialogVisible = false
  private nodeId = ''
  private node: Nodes = { ...defaultNode }

  created() {
    this.searchRegion()
    this.searchNode()
  }

  private async searchRegion() {
    const { data } = await searchRegion(loadAllParams)
    this.regions = data.currentPageRecords
  }

  private openNodeDetailDialog(value: any) {
    this.nodeId = value.id
    this.detailDialogVisible = true
  }

  private async searchNode() {
    this.listLoading = true
    this.listQuery.name = this.listQuery.name || undefined
    this.listQuery.regionId = this.listQuery.regionId || undefined

    const { data } = await searchNode(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private openNodeCreateDialog() {
    this.createDialogVisible = true
  }

  private openNodeEditDialog(node: Nodes) {
    this.editDialogVisible = true
    this.node = node
  }

  private async openNodeRemoveConfirm(id: string) {
    try {
      await this.showDeleteConfirm()
      await removeNode(id)
      this.showMessage('删除成功')
      this.searchNode()
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
