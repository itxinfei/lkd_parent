<template>
  <div class="update-info">
    <el-dialog :title="title" :visible.sync="dialogShowUpdate" :before-close="closeDialog" :close-on-click-modal="false" :show-close="true" width="660px" top="22vh">
      <m-form :formData="dialogData" :columns="diaFormColumns" ref="mform">
      </m-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" class="update-btn" @click="updatePersonInfoFn">更新信息</el-button>
      </div>
    </el-dialog>
    <!-- 定时返回主页 -->
    <SuccessOrFailInfo v-if="dialogChangeShow" :infoTitle="infoTitle" :dialogChangeShow='dialogChangeShow' @closeChangeDialog="closeChangeDialog">{{ `个人信息${infoTitle}` }}</SuccessOrFailInfo>
  </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SuccessOrFailInfo from './SuccessOrFailInfo.vue'
import Cookies from 'js-cookie'
import { putPartner } from '@/api/index.ts'

@Component({
  components: {
    SuccessOrFailInfo
  }
})
export default class UpdatePersonInfo extends Vue {
  static componantName = 'UpdatePersonInfo'
  @Prop([String]) title !: string
  @Prop([Boolean]) dialogShowUpdate !: boolean
  @Prop([Object]) dialogData !: object
  private dialogChangeShow = false
  private infoTitle = '成功'
  private getUserInfo = JSON.parse(Cookies.get('setUserInfo'))

  $refs!: {
    mform: HTMLFormElement;
  }

  get diaFormColumns () {
    return [
      {
        label: '合作商名称:',
        prop: 'name',
        span: 22,
        el: 'input',
        labelWidth: '120px',
        placeholder: '请输入合作商名称',
        disabled: true
      },
      {
        label: '联系人:',
        prop: 'contact',
        span: 22,
        el: 'input',
        labelWidth: '120px',
        placeholder: '请输入联系人',
        rules: {
          required: true,
          trigger: 'blur',
          message: '联系人不能为空'
        }
      },
      {
        label: '联系电话:',
        prop: 'mobile',
        span: 22,
        el: 'input',
        labelWidth: '120px',
        placeholder: '请输入联系电话',
        rules: {
          required: true,
          trigger: 'blur',
          message: '联系电话不能为空'
        }
      },
      {
        label: '分成比例:',
        prop: 'ratio',
        span: 22,
        el: 'input',
        labelWidth: '120px',
        placeholder: '请输入分成比例',
        disabled: true
      }
    ]
  }

  resetForm () {
    this.$refs.mform.resetFields()
  }

  closeDialog () {
    this.resetForm()
    this.$emit('closeDialogUpdate')
  }

  updatePersonInfoFn () {
    this.$refs.mform.validate().then((value: boolean) => {
      if (value) {
        const params = {
          ...this.dialogData
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        putPartner(this.getUserInfo.userId, params).then((res: any) => {
          if (res && res === true) {
            this.infoTitle = '成功'
            this.$emit('closeDialogUpdate')
            this.resetForm()
            this.dialogChangeShow = true
          } else {
            this.$message.error(res)
          }
        })
        // putListAndParams(`${baseUrl}/user-service/partner/${this.getUserInfo.userId}`, params).then((res: any) => {
        //   // const msg = ''
        //   if (res && res === true) {
        //     this.infoTitle = '成功'
        //     // msg = '修改密码成功'
        //     this.$emit('closeDialogUpdate')
        //     this.resetForm()
        //     this.dialogChangeShow = true
        //     // this.$message.success(msg)
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
  .update-info {

    /deep/ .el-dialog {
      background: #2c315d;
      box-shadow: 0px 6px 16px 0px rgba(0,0,0,0.32), 0px 3px 6px -4px rgba(0,0,0,0.48);
    }

    /deep/ .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
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

    // 修改输入框禁用状态下的颜色
    /deep/ .is-disabled .el-input__inner  {
      background: #495386;
      border: 1px solid #727cad;
    }

    // 修改input必输项输入框报错状态下的样式
    // /deep/ .el-form-item.is-error .el-input__inner, /deep/ .el-form-item.is-error .el-input__inner:focus, /deep/ .el-form-item.is-error .el-textarea__inner, /deep/ .el-form-item.is-error .el-textarea__inner:focus, /deep/ .el-message-box__input input.invalid, /deep/ .el-message-box__input input.invalid:focus {
    //   border: 1px solid #727cad;
    // }
    
    /deep/ .el-form-item--small .el-form-item__content, /deep/ .el-form-item--small .el-form-item__label {
      line-height: 36px;
      height: 36px;
    }

    /deep/ .el-form-item__label {
      color: #e3e6ff;
    }

    .update-btn {
      width: 102px;
      height: 36px;
      font-size: 14px;
      border-radius: 0;
      background: linear-gradient(145deg,#ff9090 8%, #ff5757 88%);
      border: none;
      margin-bottom: 20px;
    }

  }
</style>