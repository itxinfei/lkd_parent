<template>
  <div class="login-container">
    <div class="login-form">
      <img
        class="login-logo"
        src="../../../public/img/login/logo.png"
      >
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="loginName">
          <span class="svg-container">
            <svg-icon name="phone" />
          </span>
          <el-input
            ref="loginName"
            v-model="loginForm.loginName"
            name="loginName"
            type="text"
            autocomplete="new-password"
            placeholder="请输入账号"
            maxlength="18"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon name="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            autocomplete="new-password"
            maxlength="20"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon
              :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
            />
          </span>
        </el-form-item>

        <el-form-item prop="code">
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="17">
              <span class="svg-container">
                <svg-icon name="code" />
              </span>
              <el-input
                ref="code"
                v-model="loginForm.code"
                placeholder="请输入验证码"
                name="code"
                autocomplete="new-code"
                maxlength="4"
                @keyup.enter.native="handleLogin"
              />
            </el-col>
            <el-col :span="7">
              <img
                class="code-image"
                :src="codeImage"
                @click="getCodeImage"
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-button
          :loading="loading"
          class="login-btn"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vuex'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { UserLogin } from '@/entity/user'
import { randomWord } from '@/utils'

@Component({
  name: 'Login'
})
export default class extends Vue {
  private loginForm = {
    loginName: 'admin',
    password: 'admin',
    code: '',
    clientToken: ''
  }

  private loginRules = {
    loginName: [{ required: true, message: '请输入账号', trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
  }

  private passwordType = 'password'
  private loading = false
  private showDialog = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}
  private codeImage:string = ''

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
    if (this.loginForm.loginName === '') {
      let loginNameInput: Input = this.$refs.loginName as Input
      loginNameInput.focus()
    } else if (this.loginForm.password === '') {
      let passwordInput: Input = this.$refs.password as Input
      passwordInput.focus()
    }
    this.getCodeImage()
  }

  private getCodeImage() {
    //  生成 32 位随机字符串
    this.loginForm.clientToken = randomWord(false, 32, 32) // 例如：fjpnWj29Bb8boiXbLeDF0nxkR4aYcLRl
    this.codeImage = `https://lkd2-java.itheima.net/api/user-service/user/imageCode/${this.loginForm.clientToken}`
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      let passwordInput: Input = this.$refs.password as Input
      passwordInput.focus()
    })
  }

  private async handleLogin() {
    // 表单验证
    let isValid: boolean = true
    let form: ElForm = this.$refs.loginForm as ElForm
    form.validate((valid: boolean) => {
      isValid = valid
    })
    if (!isValid) {
      return
    }
    this.loading = true

    // 登录校验
    let result: UserLogin = await UserModule.Login(this.loginForm)
    // 服务器异常
    if (!result) {
      this.loading = false
      return
    }

    // 登录失败
    if (!result.success) {
      this.$message({
        showClose: true,
        message: result.msg,
        type: 'error'
      })
      this.loading = false
      return
    }

    // 登录成功
    this.$router.push({
      path: this.redirect || '/',
      query: this.otherQuery
    })
    this.loading = false
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: $lightGray !important;
      }
    }
  }

  .el-form-item {
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #ffffff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('../../../public/img/login/background.png');
  background-repeat: no-repeat;
  background-size: cover;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #ffffff;
    box-shadow: 0px 3px 70px 0px rgba(30, 111, 72, 0.35);
    border-radius: 10px;
  }

  .login-logo {
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .code-image {
    display: block;
  }

  .login-btn {
    width: 100%;
    height: 52px;
    // margin-top: 41px;
    background: linear-gradient(
      262deg,
      rgba(46, 80, 225, 1),
      rgba(104, 120, 240, 1)
    );
    opacity: 0.91;
    border-radius: 8px;
    color: rgba(255, 255, 255, 1);
    text-shadow: 0px 7px 22px rgba(207, 207, 207, 1);
  }
}
</style>
