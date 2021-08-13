<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="合作商搜索：">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchPartner">
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
        <primary-button1 @handleClick="openPartnerCreateDialog">
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
          label="合作商名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="账号"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设备数量"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.vmCount }}</span>
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
          label="联系人"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.contact }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="联系电话"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openPartnerResetPwdConfirm(scope.row)">
              <template v-slot>
                重置密码
              </template>
            </primary-text-button>
            <primary-text-button @handleClick="openPartnerDetailDialog(scope.row)">
              <template v-slot>
                查看详情
              </template>
            </primary-text-button>
            <primary-text-button @handleClick="openPartnerEditDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
            <danger-text-button @handleClick="openPartnerRemoveConfirm(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchPartner"
      />
    </div>

    <partner-create-dialog
      :dialog-visible.sync="createDialogVisible"
      @refreshList="searchPartner"
    />

    <partner-edit-dialog
      :dialog-visible.sync="editDialogVisible"
      :partner="partner"
      @refreshList="searchPartner"
    />

    <partner-detail-dialog
      :dialog-visible.sync="detailDialogVisible"
      :partner="partner"
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
import PartnerCreateDialog from './components/partner-create-dialog.vue'
import PartnerEditDialog from './components/partner-edit-dialog.vue'
import PartnerDetailDialog from './components/partner-detail-dialog.vue'
import { defaultPage, Page } from '@/entity/page'
import { Partner, PartnerPageModelView } from '@/entity/partner'
import { defaultPartner, searchPartner, removePartner, defaultPartnerPageModelView, resetPwd } from '@/api/partners'

@Component({
  name: 'PartnerList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    PrimaryTextButton,
    DangerTextButton,
    PartnerCreateDialog,
    PartnerEditDialog,
    PartnerDetailDialog
  }
})
export default class extends mixins(MixinTools) {
  private listLoading = false
  private listQuery: PartnerPageModelView = { ...defaultPartnerPageModelView }
  private listData: Page<Partner> = { ...defaultPage }
  private createDialogVisible = false
  private editDialogVisible = false
  private detailDialogVisible = false
  private partner: Partner = { ...defaultPartner }

  created() {
    this.searchPartner()
  }

  private async searchPartner() {
    this.listLoading = true
    this.listQuery.name = this.listQuery.name || undefined

    const { data } = await searchPartner(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private async openPartnerResetPwdConfirm(partner: Partner) {
    try {
      await this.showConfirm('确定要重置合作商密码吗？')
      const { data } = await resetPwd(partner.id)
      this.showMessage('重置成功')
      this.searchPartner()
    } catch (err) {
      console.log('err: ' + err)
    }
  }

  private openPartnerCreateDialog() {
    this.createDialogVisible = true
  }

  private openPartnerDetailDialog(partner: Partner) {
    this.partner = partner
    this.detailDialogVisible = true
  }

  private openPartnerEditDialog(partner: Partner) {
    this.partner = partner
    this.editDialogVisible = true
  }

  private async openPartnerRemoveConfirm(id: number) {
    try {
      await this.showDeleteConfirm()
      await removePartner(id)
      this.showMessage('删除成功')
      this.searchPartner()
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
