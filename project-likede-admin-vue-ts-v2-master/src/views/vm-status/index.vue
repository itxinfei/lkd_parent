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
          label="运营状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.vmStatus === 0">未投放</span>
            <span v-if="scope.row.vmStatus === 1">运营</span>
            <span v-if="scope.row.vmStatus === 3">撤机</span>
          </template>
        </el-table-column>
        <!-- TODO: 样式还原 -->
        <el-table-column
          align="center"
          label="设备状态"
        >
          <template slot-scope="scope">
            <div class="tag-group">
              <el-tag
                v-for="(item, index) in transformVmStatus(scope.row.status)"
                :key="index"
                :type="item.type"
                effect="dark"
              >
                {{ item.label }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openVmStatusDetailDialog(scope.row)">
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
        @pagination="searchVm"
      />
    </div>

    <vm-status-detail-dialog
      :dialog-visible.sync="detailDialogVisible"
      :inner-code="innerCode"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import VmStatusDetailDialog from './components/vm-status-detail-dialog.vue'
import { defaultVmPageModelView, searchVm } from '@/api/vms'
import { defaultPage, Page } from '@/entity/page'
import { Status, Vm, VmPageModelView } from '@/entity/vm'

const VM_STATUS = [{
  key: '10001',
  value: '在线'
}, {
  key: '10002',
  value: '货道'
}, {
  key: '10003',
  value: '传动轴'
}]

@Component({
  name: 'VmStatusList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryTextButton,
    VmStatusDetailDialog
  }
})
export default class extends Vue {
  private listData: Page<Vm> = { ...defaultPage }
  private listLoading = false
  private listQuery: VmPageModelView = { ...defaultVmPageModelView }
  private detailDialogVisible = false
  private innerCode = ''

  private transformVmStatus(status: Status) {
    let vmStatus: any = []
    const keys = Object.keys(status)

    keys.forEach(key => {
      let temp = VM_STATUS.find(item => {
        return key === item.key
      })
      if (temp) {
        vmStatus.push({
          type: status[key] ? 'success' : 'danger',
          label: temp.value
        })
      }
    })
    return vmStatus
  }

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

  private openVmStatusDetailDialog(vm: Vm) {
    this.innerCode = vm.innerCode
    this.detailDialogVisible = true
  }
}
</script>

<style>
.tag-group .el-tag + .el-tag {
  margin-left: 10px;
}
</style>
