<template>
  <el-dialog
    width="483px"
    title="数据导入"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
  >
    <el-form
      ref="form"
      :label-width="formLabelWidth"
    >
      <el-form-item label="标题：">
        <el-upload
          ref="upload"
          action
          :accept="suffixes.toString()"
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
          :before-upload="handleBeforeUpload"
          :http-request="handleHttpRequest"
        >
          <div
            slot="tip"
            class="el-upload__tip"
            style="line-height: 20px;"
          >
            <slot />支持扩展名：xls、xlsx，文件不得大于1M
          </div>
          <primary-button2
            slot="trigger"
            style="width: 221px;"
          >
            <template v-slot>
              <svg-icon name="upload" />&nbsp;&nbsp;上传文件
            </template>
          </primary-button2>
        </el-upload>
      </el-form-item>
    </el-form>
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
import { Component, Vue, PropSync } from 'vue-property-decorator'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import PrimaryButton2 from '@/components/buttons/primary-button2.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { skuUpload } from '@/api/skus'
import { ElUpload, ElUploadInternalRawFile, FileListItem } from 'element-ui/types/upload'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'SkuImportDialog',
  components: {
    PrimaryButton1,
    PrimaryButton2,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  private formLabelWidth = defaultFormLabelWidth
  // 文档后缀名列表
  private suffixes: string[] = [
    '.xls',
    '.xlsx'
  ]
  private fileList: FileListItem[] = []

  /**
   * 上传文件之前的钩子
   */
  private handleBeforeUpload(file: ElUploadInternalRawFile) {
    const filename = file.name
    const index = filename.lastIndexOf('.')
    const suffix = filename.substr(index)

    const isValid = this.suffixes.indexOf(suffix) !== -1
    const isLt1M = file.size / 1024 / 1024 < 1
    if (!isValid) {
      this.$message.error(`上传文件只能是${this.suffixes.toString()}格式`)
    }
    if (!isLt1M) {
      this.$message.error('上传文件大小不能超过1M')
    }
    return isValid && isLt1M
  }

  /**
   * 覆盖默认的上传行为
   */
  private async handleHttpRequest(options: any) {
    const formData = new FormData()
    formData.append('fileName', options.file)
    await skuUpload(formData)
    this.syncDialogVisible = false
  }

  /**
   * 手动上传
   */
  private async ensureDialog() {
    (this.$refs.upload as ElUpload).submit()
  }

  private close() {
    this.fileList = []
  }
}
</script>
