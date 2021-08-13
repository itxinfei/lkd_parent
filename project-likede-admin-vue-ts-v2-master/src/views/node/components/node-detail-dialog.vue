<template>
  <el-dialog
    width="630px"
    title="点位详情"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-table
      v-loading="listLoading"
      :data="list"
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
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="机器编号"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.innerCode }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="设备状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.vmStatus===0">未投放</span>
          <span v-if="scope.row.vmStatus===1">运营</span>
          <span v-if="scope.row.vmStatus===3">撤机</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="最后一次供货时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.lastSupplyTime | dateTimeFormat }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import { nodeVmList } from '@/api/nodes'
import { NodeVmDetail } from '@/entity/node'

@Component({
  name: 'NodeDetailDialog'
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean
  @Prop({ type: String }) private readonly nodeId!: string

  private listLoading = false
  private list: NodeVmDetail[] = []

  private open() {
    this.nodeVmList()
  }

  private async nodeVmList() {
    this.listLoading = true
    const { data } = await nodeVmList(this.nodeId)
    this.list = data
    this.listLoading = false
  }
  async ensureDialog() {
    this.syncDialogVisible = false
  }
}
</script>
