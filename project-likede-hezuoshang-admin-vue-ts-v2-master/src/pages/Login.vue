<template>
  <div class="login-wrap">
    <div class="continer">
      <div class="continer-left">
        <div class="ms-logo"></div>
      </div>
      <div class="ms-logo"></div>
      <div class="ms-login">
        <!-- 登录框 -->
        <div class="login-frame">
          <!-- logo分离出来 -->
          <div class="logo">
            <LogoTitle title="合作商后台" />
          </div>
          <!-- 密码框 -->
          <m-form :formData="ruleForm" :columns="formColumns" ref="ruleForm" size="medium">
            <div slot="code" class="login-img">
              <el-input :maxlength="4" class="img-input" v-model="ruleForm.code" placeholder="请输入验证码" prefix-icon="iconfont iconxingzhuang2x1" :offset="1" @keyup.enter.native="submitForm"></el-input>
              <img @click="getNewLoginImg" :src="showloginImg" alt="验证码" />
            </div>
          </m-form>
          <el-button slot="btn" class="login-btn" size="medium" type="danger" @click="submitForm">登<span style="margin-left:10px;">录</span></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import LogoTitle from '@/components/layout/LogoTitle.vue'
import { baseUrl } from '@/config.json'
import { randomWord } from '@/utils/formValidate'

@Component({
  components: {
    LogoTitle
  }
})
export default class Login extends Vue {
  private showloginImg = ''
  private ruleForm = {
    account: '13800000000',
    password: 'admin',
    code: '',
    loginType: 2,
    clientToken: ''
  }

  private getTimeCoken = new Date().getTime() * Math.random() * 10000
  $refs!: {
    ruleForm: HTMLFormElement;
  }

  get formColumns () {
    return [
      {
        prop: 'account',
        el: 'input',
        labelWidth: '2px',
        span: 22,
        offset: 1,
        placeholder: '请输入账号',
        prefixIcon: 'iconfont iconshouji2x',
        rules: {
          required: true,
          trigger: 'blur',
          validator: (rule: unknown, value: string, callback: Function) => {
            if (value === '' || value === null) {
              callback(new Error('账号不能为空'))
            } else {
              callback()
              // const reg = /^[1][3,4,5,7,8][0-9]{9}$/
              // if (!reg.test(value)) {
              //   callback(new Error('手机号格式数据有误'))
              // } else {
              //   callback()
              // }
            }
          }
        }
      },
      {
        prop: 'password',
        el: 'input',
        type: 'password',
        labelWidth: '2px',
        span: 22,
        offset: 1,
        placeholder: '请输入密码',
        prefixIcon: 'iconfont iconmima2x',
        showPassword: true,
        rules: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      },
      {
        prop: 'code',
        labelWidth: '2px',
        span: 22,
        offset: 1,
        prefixIcon: 'iconfont iconxingzhuang2x1',
        placeholder: '请输入验证码',
        rules: {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      }
    ]
  }

  created () {
    this.getImageCode()
  }

  getNewLoginImg () {
    this.getImageCode()
  }

  getImageCode () {
    this.ruleForm.clientToken = randomWord(false, 32, 32)
    this.showloginImg = `https://lkd2-java.itheima.net${baseUrl}/user-service/user/imageCode/${this.ruleForm.clientToken}`
  }

  submitForm () {
    this.$refs.ruleForm.validate().then(() => {
      this.ruleForm = {
        ...this.ruleForm,
        clientToken: String(this.ruleForm.clientToken)
      }
      this.$store.dispatch('login', this.ruleForm)
    })
  }
}
</script>

<style lang="scss" scoped>
  .login-wrap {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    background: url(~@/assets/Login/login-background.png);
    background-size: cover;
    justify-content: center;
    align-items: center;
    .continer {
      width: 1600px;
      height: 773px;
      border-radius: 2px;
      z-index: 1;
      display: flex;
      box-shadow: 0px 2px 82px 0px rgba(25,30,65,1);
      .continer-left {
        width: 890px;
        height: 773px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .ms-logo {
          width: 662px;
          height: 596px;
          background: url(~@/assets/Login/login-center.png);
          background-size: cover;
          justify-content: center;
        }
      }
      .ms-login {
        border-radius: 2px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(rgba(73,84,150,1), rgba(46,53,100,1), rgba(25,30,65,1));
        .login-frame {
          text-align: center;
          width: 450px;
          height: 384px;
          .logo {
            padding-top: 18px;
            padding-bottom: 37px;
          }
          .login-img {
            width: 100%;
            display: flex;
            .img-input {
              flex: 1;
              margin-right: 10px;
            }
            img {
              cursor: pointer;
              width: 95px;
              // height:48px;
              // border: 1px solid #727cad;
            }
          }
          .login-btn {
            margin-top: 10px;
          }
        }
      }
    }

    // 重绘el-input
    /deep/ .el-input--medium .el-input__inner {
			height: 50px;
			line-height: 50px;
		}

    // 去除el-input的圆角
    /deep/ .el-input__inner {
      border-radius: 0px;
    }

    // 修改el-input的placeholder颜色
    /deep/ .el-input__inner::placeholder {
      color: #727cad;
      // placeholder往右便宜4像素
      padding-left: 4px;
    }

		/deep/ .el-button {
			width: 91.5%;
			border-radius: 2px;
			padding: 18px 20px;
			box-sizing: border-box;
			font-size: 18px;
			background: linear-gradient(145deg,#ff9090 8%, #ff5757 88%);
		}

		/deep/ .el-input--medium .el-input__icon {
			line-height: 50px;
		}

    /deep/ .el-input__inner {
      background: #2c3260;
      border: 1px solid #727cad;
    }

    // 更改el-input中图标大小
    /deep/.el-input__icon {
      font-size: 20px !important;
    }
  }
</style>