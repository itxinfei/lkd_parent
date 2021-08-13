<template>
  <div>
    <!-- TODO: 添加关闭按钮， 样式细节还原 -->
    <el-upload
      class="common-upload"
      action
      accept=".jpg,.png"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      :http-request="handleHttpRequest"
      :on-remove="handleOnRemove"
    >
      <img
        v-if="syncImageUrl"
        :src="syncImageUrl"
        class="image"
      >
      <i
        v-else
        class="el-icon-plus common-upload-icon"
      />
    </el-upload>
    <!-- <svg-icon name="upload" />
    <div
      slot="tip"
      class="el-upload__tip"
      style="line-height: 20px;"
    >
      <slot />支持扩展名：jpg、png，文件不得大于100kb
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator'
import { ElUploadInternalRawFile, ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { fileUpload } from '@/api/skus'

@Component({
  name: 'CommonUpload'
})
export default class extends Vue {
  @PropSync('imageUrl', { type: String, required: false, default: '' })
  syncImageUrl!: string

  /**
   * 上传文件之前的钩子
   */
  private handleBeforeUpload(file: ElUploadInternalRawFile) {
    const isJPG =
      file.type === 'image/jpeg' ||
      file.type === 'image/png'
    const isLt100KB = file.size / 1024 < 100

    if (!isJPG) {
      this.$message.error('上传图片只能是jpg/png格式')
    }
    if (!isLt100KB) {
      this.$message.error('上传图片大小不能超过100kb')
    }
    return isJPG && isLt100KB
  }

  /**
   * 覆盖默认的上传行为
   */
  private async handleHttpRequest(options: any) {
    const formData = new FormData()
    formData.append('fileName', options.file)
    const { data } = await fileUpload(formData)
    this.syncImageUrl = data
  }

  /**
   * 文件列表移除文件时的钩子
   */
  private handleOnRemove(file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) {
    this.syncImageUrl = ''
  }
}
</script>

<style lang="scss">
.common-upload .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.common-upload .el-upload:hover {
  border-color: #409EFF;
}

.common-upload-icon {
  font-size: 28px;
  color: #8c939d;
  width: 84px;
  height: 84px;
  line-height: 84px;
  text-align: center;
}

.image {
  width: 84px;
  height: 84px;
  display: block;
  object-fit: contain;
}
</style>
