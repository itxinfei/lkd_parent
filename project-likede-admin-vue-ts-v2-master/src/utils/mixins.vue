<script lang="ts">
import { ElForm } from 'element-ui/types/form'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Mixin'
})
export default class extends Vue {
  // 删除确认
  // TODO: UI还原
  public async showDeleteConfirm() {
    // eslint-disable-next-line no-return-await
    return await this.$confirm('', '确认要删除这条信息吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    })
  }

  // Confirm
  public async showConfirm(msg: string) {
    // eslint-disable-next-line no-return-await
    return await this.$confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    })
  }

  // 显示提示框
  public showMessageBox(message: string, title: string) {
    this.$alert(message, title)
  }

  // 弹消息
  public showMessage(message: string, type: any = 'success') {
    this.$message({ message, type: type, duration: 1000 })
  }

  // 关闭对话框前清空表单
  // TODO：https://www.jianshu.com/p/6ec1cecd1545
  public closeDialog() {
    this.$nextTick(() => {
      (this.$refs['form'] as ElForm).resetFields()
    })
  }
}
</script>
