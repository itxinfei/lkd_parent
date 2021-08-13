<template>
  <el-dialog
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
        :data="channelList"
        :header-cell-style="{'padding': '10px 0 9px', 'background': '#F3F6FB', 'font-weight': '500', 'text-align': 'left', 'color': '#666666'}"
        :cell-style="{'padding': '6px 0', 'text-align': 'left', 'color': '#666666'}"
      >
        <el-table-column
          width="100"
          align="center"
          label="货道编号"
        >
          <template slot-scope="scope">
            {{ scope.row.channelCode }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="商品名称"
        >
          <template slot-scope="scope">
            {{ scope.row.sku ? scope.row.sku.skuName : '-' }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="当前数量"
        >
          <template slot-scope="scope">
            {{ scope.row.sku ? scope.row.currentCapacity : '-' }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="还可添加"
        >
          <template slot-scope="scope">
            {{ scope.row.sku ? getAvailableCapacity(scope.row) : '-' }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="补满数量"
        >
          <template slot-scope="scope">
            <el-input-number
              v-if="scope.row.sku"
              v-model="scope.row.expectCapacity"
              controls-position="right"
              :min="0"
              :max="getAvailableCapacity(scope.row)"
              label="补满数量"
            />
            <span v-else>货道暂无商品</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>

    <div
      slot="footer"
      class="dialog-footer"
    >
      <secondary-button
        @handleClick="syncDialogVisible = false"
      >
        <template v-slot>
          取消
        </template>
      </secondary-button>
      <primary-button1 @handleClick="ensureDialog">
        <template v-slot>
          确认
        </template>
      </primary-button1>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { channelList } from '@/api/channels'
import { Channel } from '@/entity/vm'
import { TaskDetail } from '@/entity/task'

@Component({
  name: 'TaskCreateChannelDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('channelVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop(String) private readonly innerCode!: string

  // 货道列表
  private channelList: Channel[] = []
  // 补货列表
  private detailList: TaskDetail[] = []

  /**
   * 还可添加
   */
  getAvailableCapacity(channel: Channel) {
    let availableCapacity = channel.maxCapacity - channel.currentCapacity
    return availableCapacity > 0 ? availableCapacity : 0
  }

  private open() {
    this.getChannelList()
  }

  /**
   * 货道列表
   */
  private async getChannelList() {
    // TODO：考虑重新创建工单的情况，上一次的补货信息需要回显
    const { data } = await channelList(this.innerCode)
    this.channelList = data.map((channel: any) => {
      let expectCapacity = channel.sku !== null ? channel.maxCapacity - channel.currentCapacity : 0
      this.$set(channel, 'expectCapacity', expectCapacity) // https://vuejs.org/v2/guide/reactivity.html
      return channel
    })
  }

  async ensureDialog() {
    this.syncDialogVisible = false
    // TODO: 货道数量改为0后，emit后不正确，没有变为0
    this.channelList.forEach((channel: Channel) => {
      if (channel.expectCapacity > 0) {
        this.detailList.push({
          channelCode: channel.channelCode,
          expectCapacity: channel.expectCapacity,
          skuId: channel.skuId,
          skuName: channel.sku ? channel.sku.skuName : '',
          skuImage: channel.sku ? channel.sku.skuImage : ''
        })
      }
    })
    this.$emit('getDetailList', this.detailList)
  }
}
</script>
