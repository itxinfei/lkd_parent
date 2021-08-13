<template>
<div class="change-pass">
  <el-dialog :title="title" :visible.sync="dialogShowPass" :before-close="closeDialog" :close-on-click-modal="false" :show-close="true" width="660px" top="22vh">
    <m-form :formData="diaFormData" :columns="diaFormColumns" ref="mform" />
    <div slot="footer" style="text-align:center;">
      <el-button @click="closeDialog" class="pass-btn-c">取消</el-button>
      <el-button type="primary" class="pass-btn-s" @click="updatePassWord">确认</el-button>
    </div>
  </el-dialog>
  <!-- 定时返回主页 -->
  <SuccessOrFailInfo v-if="dialogChangeShow" :infoTitle="infoTitle" :dialogChangeShow='dialogChangeShow' @closeChangeDialog="closeChangeDialog">{{ `修改密码${infoTitle}` }}</SuccessOrFailInfo>
</div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SuccessOrFailInfo from './SuccessOrFailInfo.vue'
import Cookies from 'js-cookie'
import { DiaFormData } from '@/types/layout/ChangePassword'
import { putPartnerPpdatePwd } from '@/api/index.ts'

@Component({
  components: {
    SuccessOrFailInfo
  }
})
export default class ChangePassword extends Vue {
  static componantName = 'ChangePassword'

  @Prop([String]) title !: string
  @Prop([Boolean]) dialogShowPass !: boolean
  private dialogChangeShow = false
  private infoTitle = '成功'
  private getUserInfo = JSON.parse(Cookies.get('setUserInfo'))
  private diaFormData: DiaFormData = {
    password: '',
    newPassword: '',
    confirmNewPaw: ''
  }

  $refs!: {
    mform: HTMLFormElement;
  }

  get diaFormColumns () {
    return [
      {
        label: '旧密码:',
        prop: 'password',
        span: 22,
        el: 'input',
        labelWidth: '120px',
        type: 'password',
        'auto-complete': 'off',
        placeholder: '限制输入6-12位',
        rules: {
          required: true,
          trigger: 'blur',
          validator: (rule: unknown, value: string, callback: Function) => {
            if (value === '') {
              callback(new Error('请输入旧密码'))
            } else {
              if (this.diaFormData.confirmNewPaw) {
                this.$refs.mform.validateField('confirmNewPaw')
              }
              callback()
            }
          }
        }
      },
      {
        label: '新密码:',
        prop: 'newPassword',
        span: 22,
        el: 'input',
        labelWidth: '120px',
        type: 'password',
        placeholder: '限制输入6-12位',
        rules: {
          required: true,
          trigger: 'blur',
          validator: (rule: unknown, value: string, callback: Function) => {
            if (value === '') {
              callback(new Error('请输入新密码'))
            } else {
              if (this.diaFormData.confirmNewPaw !== '') {
                this.$refs.mform.validateField('confirmNewPaw')
              }
              callback()
            }
          }
        }
      },
      {
        label: '确认密码:',
        prop: 'confirmNewPaw',
        span: 22,
        el: 'input',
        labelWidth: '120px',
        type: 'password',
        placeholder: '限制输入6-12位',
        rules: {
          required: true,
          trigger: 'blur',
          validator: (rule: unknown, value: string, callback: Function) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.diaFormData.newPassword) {
              callback(new Error('两次输入密码不一致!'))
            } else if (value === this.diaFormData.password) {
              callback(new Error('新密码与旧密码不能一致!'))
            } else {
              callback()
            }
          }
        }
      }
    ]
  }

  closeDialog () {
    this.resetForm()
    this.$emit('closeDialogPass')
  }

  resetForm () {
    this.$refs.mform.resetFields()
  }

  updatePassWord () {
    this.$refs.mform.validate().then((value: boolean) => {
      if (value) {
        const params ={
          ...this.diaFormData
        }
        delete params.confirmNewPaw
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        putPartnerPpdatePwd(this.getUserInfo.userId, params).then((res: any) => {
            if (res && res === true) {
            this.infoTitle = '成功'
            // 关闭弹框
            this.$emit('closeDialogPass')
            // 调用定时器弹框
            // 更新token退出登录
            this.resetForm()
            this.dialogChangeShow = true
          } else {
            this.$message.error(res)
          }
        })
        // putListAndParams(`${baseUrl}/user-service/partner/updatePwd/${this.getUserInfo.userId}`, params).then((res: any) => {
        //   // const msg = ''
        //   if (res && res === true) {
        //     this.infoTitle = '成功'
        //     // msg = '修改密码成功'
        //     // 关闭弹框
        //     this.$emit('closeDialogPass')
        //     // 调用定时器弹框
        //     // 更新token退出登录
        //     this.resetForm()
        //     this.dialogChangeShow = true
        //     // this.$message.success(msg)
        //     // this.$store.commit('updateToken')
        //     // this.$store.commit('updateUserInfo')
        //     // Cookies.remove('setUserInfo')
        //     // Cookies.remove('creditechToken')
        //   } else {
        //     this.$message.error(res)
        //   }
        // })
      }
    })
  }
  // 定时器关闭
  closeChangeDialog () {
    this.dialogChangeShow = false
  }
}
</script>

<style lang="scss" scoped>
.change-pass {
  /deep/ .el-dialog {
    background: #2c315d;
    box-shadow: 0px 6px 16px 0px rgba(0,0,0,0.32), 0px 3px 6px -4px rgba(0,0,0,0.48);
  }
  /deep/ .el-dialog__title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: #e3e6ff;
    line-height: 22px;
  }

  /deep/ .el-dialog__body {
    padding-bottom: 20px;
  }

  /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }

  /deep/ .el-input__inner {
    border-radius: 0px;
    background: #2c3260;
    border: 1px solid #727cad;
    line-height: 36px;
    height: 36px;
  }
  /deep/ .el-input__inner::placeholder {
    color: rgba(114, 124, 173, 1);
  }
  
  /deep/ .el-form-item--small .el-form-item__content, /deep/ .el-form-item--small .el-form-item__label {
    line-height: 36px;
    height: 36px;
  }

  /deep/ .el-form-item__label {
    color: #e3e6ff;
  }

  .pass-btn-c {
    width: 80px;
    height: 36px;
    font-size: 14px;
    border-radius: 0;
    background: linear-gradient(145deg,rgba(140,140,169,1), rgba(36,39,75,1));
    margin-left:40px;
    border: none;
    color:#fff;
    margin-bottom: 20px;
  }

  .pass-btn-s {
    width: 80px;
    height: 36px;
    font-size: 14px;
    border-radius: 0;
    background: linear-gradient(145deg,#ff9090 8%, #ff5757 88%);
    margin-left:40px;
    border: none;
    margin-bottom: 20px;
  }
}
  
</style>