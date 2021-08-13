<template>
  <div class="box abnormal-equipment">
    <div class="header">
      <div class="title">
        异常设备监控
      </div>
      <svg-icon
        name="more"
        class="more"
        @click="handleMoreClick"
      />
    </div>
    <el-scrollbar
      v-if="listData.length"
      class="scrollbar body"
    >
      <el-table
        :data="listData"
        fit
        highlight-current-row
        style="width: 100%"
        :header-cell-style="{'padding': '7px 0 6px', 'background': '#EFF0F2', 'font-weight': '400', 'text-align': 'left', 'color': '#333333'}"
        :cell-style="{'padding': '15px 0', 'text-align': 'left', 'color': '#999999'}"
      >
        <el-table-column
          align="center"
          label="故障时间"
          width="160px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.time | dateTimeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设备地址"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.address.substring(scope.row.address.lastIndexOf('-') + 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设备编号"
          width="120px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.innerCode }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div
      v-else
      class="empty"
    >
      <img
        src="@/assets/home/empty.png"
      >
      <div class="tips">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { statusTop10 } from '@/api/statuses'
import { StatusTop10 } from '@/entity/status'

@Component({
  name: 'AbnormalEquipmentTable'
})
export default class extends Vue {
  private listData: StatusTop10[] = []
  created() {
    this.statusTop10()
  }

  private async statusTop10() {
    const { data } = await statusTop10()
    this.listData = data
  }

  private handleMoreClick() {
    window.open('http://ykk-java.itheima.net')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.abnormal-equipment {
  display: flex;
  flex-direction: column;
  height: calc((100vh - 120px) * 0.4);
  min-height: 353px;
  background: #FFFFFF;
  border-radius: 20px;

  .more {
    color: $--color-primary;
    cursor: pointer;
  }

  .empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .tips {
      margin-top: 25px;
      color: #20232A;
      font-size: 14px;
    }
  }

  .body {
    flex: 1;
    margin-top: 20px;
  }
}
</style>
