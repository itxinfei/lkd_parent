<template>
  <div class="app-container">
    <div class="search">
      <el-form
        ref="form"
        :inline="true"
        :model="listQuery"
        size="medium"
      >
        <el-form-item
          label="工单编号:"
          prop="taskCode"
        >
          <el-input
            v-model="listQuery.taskCode"
            placeholder="请输入"
            clearable
            @input="resetPageIndex"
          />
        </el-form-item>
        <el-form-item
          label="工单状态:"
          prop="status"
        >
          <el-select
            v-model="listQuery.status"
            placeholder="请选择"
            :filterable="true"
            clearable
            @change="resetPageIndex"
          >
            <el-option
              v-for="(item, index) in taskStatusList"
              :key="index"
              :label="item.statusName"
              :value="item.statusId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <primary-button2 @handleClick="searchTask">
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
        <primary-button1 @handleClick="openTaskAddDialog('')">
          <template v-slot>
            <svg-icon name="create" />&nbsp;&nbsp;新建
          </template>
        </primary-button1>
        <secondary-button
          v-if="!listQuery.isRepair"
          @handleClick="openAutoSupplyDialog"
        >
          <template v-slot>
            工单配置
          </template>
        </secondary-button>
      </el-row>

      <!-- 分页列表 -->
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
          label="工单编号"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.taskCode }}</span>
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
          label="工单类型"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.taskType.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="工单方式"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.createType === 0 ? '自动' : '手动' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="工单状态"
        >
          <template slot-scope="scope">
            <span>{{ transformTaskStatus(scope.row.taskStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="listQuery.isRepair ? '运维人员' : '运营人员'"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建日期"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateTimeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <primary-text-button @handleClick="openTaskDetailDialog(scope.row)">
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
        @pagination="searchTask"
      />
    </div>

    <!-- 工单新增 -->
    <task-create-dialog
      :dialog-visible.sync="dialogVisible"
      :task-id="taskId"
      :task-type-list="taskTypeList"
      :is-repair="listQuery.isRepair"
      @refreshList="searchTask"
    />

    <!-- 工单配置 -->
    <task-auto-supply-config-dialog
      :dialog-visible.sync="autoSupplyDialogVisible"
      @refreshList="searchTask"
    />

    <!-- 工单查看 -->
    <task-detail-dialog
      :detail-visible.sync="detailVisible"
      :task-id="taskId"
      :is-repair="listQuery.isRepair"
      @refreshList="searchTask"
      @openTaskAddDialog="openTaskAddDialog"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import Pagination from '@/components/pagination/index.vue'
import { ElForm } from 'element-ui/types/form'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import TaskCreateDialog from './components/task-create-dialog.vue'
import TaskAutoSupplyConfigDialog from './components/task-auto-supply-config-dialog.vue'
import TaskDetailDialog from './components/task-detail-dialog.vue'
import {
  defaultTaskPageModelView,
  getAllTaskStatus,
  getTaskTypeList,
  searchTask
} from '@/api/tasks'
import {
  Task, TaskPageModelView, TaskStatus, TaskType
} from '@/entity/task'
import { defaultPage, Page } from '@/entity/page'

@Component({
  name: 'TaskList',
  components: {
    Pagination,
    PrimaryButton2,
    PrimaryButton1,
    SecondaryButton,
    PrimaryTextButton,
    TaskCreateDialog,
    TaskAutoSupplyConfigDialog,
    TaskDetailDialog
  }
})
export default class extends Vue {
  // 工单状态列表
  private taskStatusList: TaskStatus[] = []
  // 工单类型列表
  private taskTypeList: TaskType[] = []

  // 分页相关
  private listLoading = false
  private listQuery: TaskPageModelView = { ...defaultTaskPageModelView }
  private listData: Page<Task> = { ...defaultPage }

  // 对话框相关
  private dialogVisible = false
  private detailVisible = false
  private autoSupplyDialogVisible = false
  private taskId = ''

  private transformTaskStatus(statusId: number) {
    const taskStatus:TaskStatus | undefined = this.taskStatusList.find((taskStatus: TaskStatus) => {
      return taskStatus.statusId === statusId
    })
    return taskStatus ? taskStatus.statusName : ''
  }

  @Watch('$route')
  private onRouteChange(route: Route) {
    this.reset()
    const isRepair = route.meta.isRepair
    this.listQuery.isRepair = isRepair
    // 工单类型列表
    this.getTaskTypeList()
    // 工单列表
    this.searchTask()
  }

  created() {
    const isRepair = this.$route.meta.isRepair
    this.listQuery.isRepair = isRepair
    // 工单状态列表
    this.getAllTaskStatus()
    // 工单类型列表
    this.getTaskTypeList()
    // 工单列表
    this.searchTask()
  }

  /**
   * 工单状态列表
   */
  private async getAllTaskStatus() {
    const { data } = await getAllTaskStatus()
    this.taskStatusList = data
  }

  /**
   * 工单类型列表
   */
  private async getTaskTypeList() {
    const { data } = await getTaskTypeList()
    const type: number = this.listQuery.isRepair ? 1 : 2
    this.taskTypeList = data.filter((item: TaskType) => {
      return item.type === type
    })
  }

  /**
   * 工单列表
   */
  private async searchTask() {
    this.listLoading = true
    this.listQuery.taskCode = this.listQuery.taskCode || undefined
    this.listQuery.status = this.listQuery.status || undefined

    const { data } = await searchTask(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  // 重置分页pageIndex
  private resetPageIndex() {
    this.listQuery.pageIndex = 1
  }

  /**
   * 工单重置
   */
  private reset() {
    (this.$refs['form'] as ElForm).resetFields()
    this.searchTask()
  }

  /**
   * 工单新增
   */
  private openTaskAddDialog(taskId: string) {
    this.taskId = taskId
    this.dialogVisible = true
  }

  /**
   * 工单配置
   */
  private openAutoSupplyDialog() {
    this.autoSupplyDialogVisible = true
  }

  /**
   * 工单查看
   */
  private openTaskDetailDialog(task: Task) {
    this.taskId = task.taskId
    this.detailVisible = true
  }
}
</script>
