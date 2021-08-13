<template>
  <div class="app-container">
    <div class="search">
      <el-form
        ref="form"
        :model="listQuery"
        :inline="true"
        size="medium"
      >
        <el-form-item label="设备编号：">
          <el-input
            v-model="listQuery.innerCode"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchVm">
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
        <primary-button1 @handleClick="openCreateVmDialog">
          <template v-slot>
            <svg-icon name="create" />&nbsp;&nbsp;新建
          </template>
        </primary-button1>
        <secondary-button
          @handleClick="openBatchSettingPolicyDialog"
        >
          <template v-slot>
            批量操作
          </template>
        </secondary-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
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
          label="设备编号"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.innerCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设备型号"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.type.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="详细地址"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.node.addr.substring(scope.row.node.addr.lastIndexOf('-') + 1) }}</span>
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
          label="设备状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.vmStatus === 0">未投放</span>
            <span v-if="scope.row.vmStatus === 1">运营</span>
            <span v-if="scope.row.vmStatus === 3">撤机</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openVmConfigChannelDialog(scope.row)">
              <template v-slot>
                货道
              </template>
            </primary-text-button>
            <primary-text-button @handleClick="openApplyPolicyDialog(scope.row)">
              <template v-slot>
                策略
              </template>
            </primary-text-button>
            <primary-text-button @handleClick="openVmDetailDialog(scope.row)">
              <template v-slot>
                修改
              </template>
            </primary-text-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 售货机分页 -->
      <pagination
        :total="parseInt(listData.totalCount, 10)"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="searchVm"
      />
    </div>

    <!-- 售货机新增对话框 -->
    <vm-create-dialog
      :dialog-visible.sync="createDialogVisible"
      @refreshList="searchVm"
    />

    <!-- 售货机货道对话框 -->
    <vm-config-channel-dialog
      :dialog-visible.sync="configChannelDialogVisible"
      :vm="vm"
      @refreshList="searchVm"
    />

    <!-- 售货机批量操作对话框 -->
    <vm-batch-apply-policy-dialog
      :dialog-visible.sync="batchApplyPolicyDialogVisible"
      :inner-code-list="innerCodeList"
      @refreshList="searchVm"
    />

    <!-- 售货机策略对话框 -->
    <vm-apply-policy-dialog
      :dialog-visible.sync="applyPolicyDialogVisible"
      :inner-code="innerCode"
      :vm-policy="vmPolicy"
      @refreshList="searchVm"
    />

    <!-- 售货机详情对话框 -->
    <vm-edit-dialog
      :vm="vm"
      :dialog-visible.sync="editDialogVisible"
      @refreshList="searchVm"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import { Message } from 'element-ui'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import DangerTextButton from '@/components/buttons/danger-text-button.vue'
import VmCreateDialog from './components/vm-create-dialog.vue'
import VmEditDialog from './components/vm-edit-dialog.vue'
import VmConfigChannelDialog from './components/vm-config-channel-dialog.vue'
import VmApplyPolicyDialog from './components/vm-apply-policy-dialog.vue'
import VmBatchApplyPolicyDialog from './components/vm-batch-apply-policy-dialog.vue'
import { defaultPage, Page } from '@/entity/page'
import { Vm, VmPageModelView } from '@/entity/vm'
import { defaultVm, defaultVmPageModelView, searchVm } from '@/api/vms'
import { defalutVmPolicy, vmPolicy } from '@/api/policies'

@Component({
  name: 'VmList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    SecondaryButton,
    PrimaryTextButton,
    DangerTextButton,
    VmCreateDialog,
    VmEditDialog,
    VmConfigChannelDialog,
    VmApplyPolicyDialog,
    VmBatchApplyPolicyDialog
  }
})
export default class extends Vue {
  private listData: Page<Vm> = { ...defaultPage }
  private listLoading = false
  private listQuery: VmPageModelView = { ...defaultVmPageModelView }

  // 售货机新增对话框
  private createDialogVisible = false
  // 售货机批量操作对话框
  private batchApplyPolicyDialogVisible = false
  // 勾选的售货机列表
  private innerCodeList: string[] = []
  // 售货机货道对话框
  private configChannelDialogVisible = false
  private vm: Vm = { ...defaultVm }
  // 单个售货机详情
  private innerCode = ''
  private vmPolicy = defalutVmPolicy
  // 售货机策略对话框
  private applyPolicyDialogVisible = false
  // 售货机详情对话框
  private editDialogVisible = false

  /**
   * 初始化钩子
   */
  created() {
    this.searchVm()
  }

  /**
   * 售货机列表
   */
  private async searchVm() {
    this.listLoading = true
    this.listQuery.innerCode = this.listQuery.innerCode || undefined

    const { data } = await searchVm(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  /**
   * 售货机新增
   */
  private openCreateVmDialog() {
    this.createDialogVisible = true
  }

  /**
   * 售货机批量设置策略
   */
  private openBatchSettingPolicyDialog() {
    if (!this.innerCodeList.length) {
      // TODO: 使用共通弹窗
      Message({
        message: '请勾选售货机',
        type: 'warning',
        duration: 5 * 1000
      })
      return
    }
    this.batchApplyPolicyDialogVisible = true
  }

  /**
   * 响应售货机勾选事件
   */
  private handleSelectionChange(vms: Vm[]) {
    this.innerCodeList = vms.map(item => {
      return item.innerCode
    })
  }

  /**
   * 售货机货道
   */
  private openVmConfigChannelDialog(vm: Vm) {
    this.vm = vm
    this.configChannelDialogVisible = true
  }

  /**
   * 售货机策略
   * TODO: 页面逻辑需要调整
   */
  private async openApplyPolicyDialog(vm: Vm) {
    this.innerCode = vm.innerCode

    const { data } = await vmPolicy(this.innerCode)
    if (!data) {
      this.innerCodeList = [this.innerCode]
      this.batchApplyPolicyDialogVisible = true
    } else {
      this.vmPolicy = data
      this.applyPolicyDialogVisible = true
    }
  }

  /**
   * 售货机详情
   */
  private openVmDetailDialog(
    vm: Vm
  ) {
    this.vm = vm
    this.editDialogVisible = true
  }
}
</script>
