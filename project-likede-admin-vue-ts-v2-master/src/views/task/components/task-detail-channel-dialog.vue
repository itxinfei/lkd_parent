<template>
  <el-dialog
    width="630px"
    title="补货详情"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="syncDialogVisible"
    append-to-body
    @open="open"
  >
    <el-scrollbar
      class="scrollbar"
      style="height: 330px;"
    >
      <el-table
        style="width: 100%"
        :data="detailData"
        :header-cell-style="{'padding': '10px 0 9px', 'background': '#F3F6FB', 'font-weight': '500', 'text-align': 'left', 'color': '#666666'}"
        :cell-style="{'padding': '6px 0', 'text-align': 'left', 'color': '#666666'}"
      >
        <el-table-column
          align="center"
          label="货道编号"
        >
          <template slot-scope="scope">
            {{ scope.row.channelCode }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="商品"
        >
          <template slot-scope="scope">
            {{ scope.row.skuName }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="补货数量"
        >
          <template slot-scope="scope">
            {{ scope.row.expectCapacity }}
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import { taskDetails } from '@/api/tasks'
import { TaskDetail } from '@/entity/task'

@Component({
  name: 'TaskDetailChannelDialog'
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean
  @Prop({ type: String }) private readonly taskId!: string

  private detailData: TaskDetail[] = []

  private open() {
    this.taskDetails()
  }

  private async taskDetails() {
    const { data } = await taskDetails(this.taskId)
    this.detailData = data
  }
}
</script>
