<template>
  <el-dialog
    width="630px"
    title="区域详情"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-form
      ref="form"
      :model="region"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="区域名称："
      >
        {{ region.name }}
      </el-form-item>
      <el-form-item
        label="包含点位："
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
              <span>{{ scope.row.name }}</span>
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
        </el-table>

        <pagination
          :total="parseInt(listData.totalCount, 10)"
          :page.sync="listQuery.pageIndex"
          :limit.sync="listQuery.pageSize"
          @pagination="searchNode"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import { defaultPage, Page } from '@/entity/page'
import { Region } from '@/entity/region'
import { defaultNodePageModelView, searchNode } from '@/api/nodes'
import { NodePageModelView, Nodes } from '@/entity/node'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'RegionDetailDialog',
  components: {
    Pagination
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean
  @Prop({ type: Object })
  private readonly region!: Region

  private formLabelWidth = defaultFormLabelWidth
  private listData: Page<Nodes> = { ...defaultPage }
  private listLoading = false
  private listQuery: NodePageModelView = { ...defaultNodePageModelView }

  private open() {
    this.listQuery.regionId = this.region.id
    this.searchNode()
  }

  private async searchNode() {
    this.listLoading = true
    const { data } = await searchNode(this.listQuery)
    this.listData = data
    this.listLoading = false
  }
}
</script>
