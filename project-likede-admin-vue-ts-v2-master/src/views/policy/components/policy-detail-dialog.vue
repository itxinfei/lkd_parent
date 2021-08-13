<template>
  <el-dialog
    width="630px"
    title="策略详情"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-form
      ref="form"
      :model="policy"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="策略名称："
      >
        {{ policy.policyName }}
      </el-form-item>
      <el-form-item
        label="策略方案："
      >
        <!-- TODO: 是否要添加滚动条 -->
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
              <span>{{ scope.row.nodeName }}</span>
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
        </el-table>

        <pagination
          :total="parseInt(listData.totalCount, 10)"
          :page.sync="listQuery.pageIndex"
          :limit.sync="listQuery.pageSize"
          @pagination="vmList"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import { Policy, PolicyVm } from '@/entity/policy'
import { defaultPolicyVmPageModelView, vmList } from '@/api/policies'
import { defaultPage, Page, PageModelView } from '@/entity/page'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'PolicyDetailDialog',
  components: {
    Pagination
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Object }) private readonly policy!: Policy

  private formLabelWidth = defaultFormLabelWidth

  private listLoading = false
  private listQuery: PageModelView = { ...defaultPolicyVmPageModelView }
  private listData: Page<PolicyVm> = { ...defaultPage }

  private open() {
    this.vmList()
  }

  private async vmList() {
    const { data } = await vmList(this.policy.policyId, this.listQuery)
    this.listData = data
  }
}
</script>
