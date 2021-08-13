<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="策略搜索：">
          <el-input
            v-model="listQuery.policyName"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchPolicy">
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
        <primary-button1 @handleClick="openPolicyCreateDialog">
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
          label="策略名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.policyName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="策略方案"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.discount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建日期"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openPolicyDetailDialog(scope.row)">
              <template v-slot>
                查看详情
              </template>
            </primary-text-button>
            <primary-text-button @handleClick="openPolicyEditDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
            <danger-text-button @handleClick="openPolicyRemoveConfirm(scope.row.policyId)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchPolicy"
      />
    </div>

    <policy-create-dialog
      :dialog-visible.sync="createDialogVisible"
      @refreshList="searchPolicy"
    />

    <policy-edit-dialog
      :dialog-visible.sync="editDialogVisible"
      :policy="policy"
      @refreshList="searchPolicy"
    />

    <policy-detail-dialog
      :dialog-visible.sync="detailDialogVisible"
      :policy="policy"
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
import PolicyCreateDialog from './components/policy-create-dialog.vue'
import PolicyEditDialog from './components/policy-edit-dialog.vue'
import PolicyDetailDialog from './components/policy-detail-dialog.vue'
import { defaultPage, Page } from '@/entity/page'
import { Policy, PolicyPageModelView } from '@/entity/policy'
import { defaultPolicy, searchPolicy, removePolicy, defaultPolicyPageModelView } from '@/api/policies'

@Component({
  name: 'PolicyList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    PrimaryTextButton,
    DangerTextButton,
    PolicyCreateDialog,
    PolicyEditDialog,
    PolicyDetailDialog
  }
})
export default class extends mixins(MixinTools) {
  private listLoading = false
  private listQuery:PolicyPageModelView = { ...defaultPolicyPageModelView }
  private listData: Page<Policy> = { ...defaultPage }
  private createDialogVisible = false
  private editDialogVisible = false
  private detailDialogVisible = false
  private policy: Policy = { ...defaultPolicy }

  created() {
    this.searchPolicy()
  }

  private async searchPolicy() {
    this.listLoading = true
    this.listQuery.policyName = this.listQuery.policyName || undefined

    const { data } = await searchPolicy(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private openPolicyCreateDialog() {
    this.createDialogVisible = true
  }

  private openPolicyDetailDialog(policy: Policy) {
    this.policy = policy
    this.detailDialogVisible = true
  }

  private openPolicyEditDialog(policy: Policy) {
    this.policy = policy
    this.editDialogVisible = true
  }

  private async openPolicyRemoveConfirm(policyId: string) {
    try {
      await this.showDeleteConfirm()
      await removePolicy(policyId)
      this.showMessage('删除成功')
      this.searchPolicy()
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
