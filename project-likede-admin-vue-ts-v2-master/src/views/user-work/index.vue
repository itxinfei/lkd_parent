<template>
  <div class="app-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item label="人员搜索：">
          <el-input
            v-model="listQuery.userName"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item
          label="角色："
          prop="roleId"
        >
          <el-select
            v-model="listQuery.isRepair"
            placeholder="请选择"
            :filterable="true"
            clearable
            @change="resetPageIndex"
          >
            <el-option
              label="运营员"
              :value="false"
            />
            <el-option
              label="维修员"
              :value="true"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchUserWork">
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
            <span>{{ (listQuery.pageIndex - 1) * listQuery.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="人员名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="角色"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
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
          align="center"
          label="完成工单(本月）"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.workCount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="进行中工单"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.progressTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="拒绝工单(本月）"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cancelCount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openUserWorkDetailDialog(scope.row)">
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
        @pagination="searchUserWork"
      />
    </div>

    <user-work-detail-dialog
      :dialog-visible.sync="detailDialogVisible"
      :user-work="userWork"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import UserWorkDetailDialog from './components/user-work-detail-dialog.vue'
import { defaultPage, Page } from '@/entity/page'
import { UserWork, UserWorkPageModelView } from '@/entity/user'
import { searchUserWork, defaultUserWorkPageModelView, defaultUserWork } from '@/api/users'

@Component({
  name: 'UserWorkList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryTextButton,
    UserWorkDetailDialog
  }
})
export default class extends Vue {
  private listLoading = false
  private listQuery: UserWorkPageModelView = { ...defaultUserWorkPageModelView }
  private listData: Page<UserWork> = { ...defaultPage }
  private userWork: UserWork = { ...defaultUserWork }
  private detailDialogVisible = false

  created() {
    this.searchUserWork()
  }

  private async searchUserWork() {
    this.listLoading = true
    this.listQuery.userName = this.listQuery.userName || undefined
    if (typeof this.listQuery.isRepair === 'string') {
      this.listQuery.isRepair = undefined
    }

    const { data } = await searchUserWork(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private openUserWorkDetailDialog(userWork: UserWork) {
    this.userWork = userWork
    this.detailDialogVisible = true
  }
}
</script>
