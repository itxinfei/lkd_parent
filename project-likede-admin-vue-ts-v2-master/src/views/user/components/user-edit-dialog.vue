<template>
  <el-dialog
    width="630px"
    title="编辑人员"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="人员名称："
        prop="userName"
      >
        <el-input
          v-model="form.userName"
          autocomplete="off"
          placeholder="请输入"
          maxlength="5"
          show-word-limit
        />
      </el-form-item>
      <!-- TODO: 是否去掉管理员角色 -->
      <el-form-item
        label="角色："
        prop="roleId"
      >
        <el-select
          v-model="form.roleId"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in roles"
            :key="index"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="联系电话："
        prop="mobile"
      >
        <el-input
          v-model="form.mobile"
          autocomplete="off"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="负责区域："
        prop="regionId"
      >
        <el-select
          v-model="form.regionId"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in regions"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="头像："
        prop="image"
      >
        <common-upload :image-url.sync="form.image" />
      </el-form-item>
      <!-- TODO: el-checkbox颜色还原 -->
      <el-form-item
        label="状态："
        prop="status"
      >
        <el-checkbox v-model="form.status">
          是否启用
        </el-checkbox>
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
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import CommonUpload from '@/components/upload/index.vue'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { Role, User, UserModelView } from '@/entity/user'
import { editUser, defaultUserModelView, roleList } from '@/api/users'
import { searchRegion } from '@/api/regions'
import { Region } from '@/entity/vm'
import { validatePhone } from '@/utils/validate'
import { loadAllParams } from '@/entity/page'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'UserEditDialog',
  components: {
    CommonUpload,
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean
  @Prop({ type: Object }) private readonly user!: User

  private formLabelWidth = defaultFormLabelWidth
  private form: UserModelView = { ...defaultUserModelView }
  private roles: Role[] = []
  private regions: Region[] = []

  // 验证规则
  private rules: object = {
    userName: [{ required: true, message: '请输入', trigger: 'change' }],
    roleId: [{ required: true, message: '请输入', trigger: 'change' }],
    mobile: [
      { required: true, message: '请输入', trigger: 'change' },
      { validator: validatePhone, trigger: 'change' }
    ],
    regionId: [{ required: true, message: '请输入', trigger: 'change' }],
    image: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private async open() {
    this.form = {
      userName: this.user.userName,
      roleId: this.user.roleId,
      mobile: this.user.mobile,
      regionId: this.user.regionId,
      regionName: this.user.regionName,
      status: this.user.status,
      image: this.user.image
    }
    this.roleList()
    this.searchRegion()
  }

  private async roleList() {
    const { data } = await roleList()
    this.roles = data
  }

  private async searchRegion() {
    const { data } = await searchRegion(loadAllParams)
    this.regions = data.currentPageRecords
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      const regionId = this.form.regionId
      const region = this.regions.find((region) => { return region.id === regionId })
      if (region) {
        this.form.regionName = region.name
      }
      // 提交表单
      await editUser(this.user.id, this.form)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>
