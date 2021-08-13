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
        <el-form-item>
          <primary-button2 @handleClick="searchUser">
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
        <primary-button1 @handleClick="openUserCreateDialog">
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
          label="人员名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="归属区域"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="角色"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.role.roleName }}</span>
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
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openUserEditDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
            <danger-text-button @handleClick="openUserRemoveConfirm(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchUser"
      />
    </div>

    <user-create-dialog
      :dialog-visible.sync="createDialogVisible"
      @refreshList="searchUser"
    />

    <user-edit-dialog
      :dialog-visible.sync="editDialogVisible"
      :user="user"
      @refreshList="searchUser"
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
import UserCreateDialog from './components/user-create-dialog.vue'
import UserEditDialog from './components/user-edit-dialog.vue'
import { defaultPage, Page } from '@/entity/page'
import { User, UserPageModelView } from '@/entity/user'
import { searchUser, removeUser, defaultUserPageModelView, defaultUser } from '@/api/users'

@Component({
  name: 'UserList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    PrimaryTextButton,
    DangerTextButton,
    UserCreateDialog,
    UserEditDialog
  }
})
export default class extends mixins(MixinTools) {
  private listData: Page<User> = { ...defaultPage }
  private listLoading = false
  private listQuery: UserPageModelView = { ...defaultUserPageModelView }
  private createDialogVisible = false
  private editDialogVisible = false
  private user: User = { ...defaultUser }

  created() {
    this.searchUser()
  }

  private async searchUser() {
    this.listLoading = true
    this.listQuery.userName = this.listQuery.userName || undefined

    const { data } = await searchUser(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  private openUserCreateDialog() {
    this.createDialogVisible = true
  }

  private openUserEditDialog(user: User) {
    this.user = user
    this.editDialogVisible = true
  }

  private async openUserRemoveConfirm(id: number) {
    try {
      await this.showDeleteConfirm()
      await removeUser(id)
      this.showMessage('删除成功')
      this.searchUser()
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
