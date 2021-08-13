<template>
  <div class="logout">
    <!-- 新增返回按钮部分 -->
    <div class="go-back" v-if="showGoBack">
      <h3 @click="$router.push('/')"><i class="iconfont iconlujing2x" style="margin-right:8px;margin-bottom:4px;"></i><span>返回</span></h3>
    </div>
    <div class="logout-info">
      <el-tooltip class="item" effect="dark" :content="getUserInfo" placement="left">
        <img :src="getSrc" alt="登录头像" />
      </el-tooltip>
      <el-dropdown>
        <h3 class="el-dropdown-link" style="cursor: pointer;">
          {{ realUserName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </h3>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="updatePersonInfoFn">
            <i class="iconfont iconxingzhuangbeifen22x" style="color:rgba(255,87,87,1);"></i>
            个人信息
            </el-dropdown-item>
          <el-dropdown-item @click.native="changePasswordFn">
            <i class="iconfont iconxingzhuangjiehe2x" style="color:rgba(255,87,87,1);"></i>
            密码修改
            </el-dropdown-item>
          <el-dropdown-item @click.native="logoutFn">
            <i class="iconfont icontuichu2x" style="color:rgba(255,87,87,1);"></i>
            退出登录
            </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码弹框 -->
    <ChangePassword :dialogShowPass="dialogShowPass" @closeDialogPass="closeDialogPass" :title="diaTilePass" />
    <!-- 修改个人信息弹框 -->
    <UpdatePersonInfo :dialogShowUpdate="dialogShowUpdate" @closeDialogUpdate="closeDialogUpdate" :title="diaTileUpdate" :dialogData="diaFormData" />
    <!-- 退出动作 -->
    <el-dialog :visible.sync="centerDialogVisible" width="322px" center :show-close="false" top="40vh" :modal-append-to-body="false" class="dia-logout">
      <span class="diaLog-span" style="text-align:center;">确认退出系统?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logoutDia" class="pass-btn-c">取 消</el-button>
        <el-button type="primary" @click="clearToken" class="pass-btn-s">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator'
import UpdatePersonInfo from './UpdatePersonInfo.vue'
import ChangePassword from './ChangePassword.vue'
import Cookies from 'js-cookie'
// import { getListAndParams } from '@/utils/request'
// import { baseUrl } from '@/config.json'
import { PartnerRes, RouteObj } from '@/types/layout/Logout'
import { getPartner } from '@/api/index.ts'

@Component({
  components: {
    UpdatePersonInfo,
    ChangePassword
  }
})
export default class Logout extends Vue {
  private dialogShowPass = false
  private dialogShowUpdate = false
  private diaTilePass = '修改密码'
  private diaTileUpdate = '个人信息'
  private showGoBack = false
  private centerDialogVisible = false
  private diaFormData = {}
  private userInfo = JSON.parse(Cookies.get('setUserInfo'))

  get getSrc () {
    return this.$store.state.userInfo.avatar
  }
  get getUserInfo () {
    return `欢迎${JSON.parse(Cookies.get('setUserInfo')).userName}，登录立可得合作商系统`
  }

  get realUserName () {
    return this.$store.state.userInfo.userName !== '' ? this.$store.state.userInfo.userName : JSON.parse(Cookies.get('setUserInfo')).userName
  }

  @Watch('$route', { immediate: true })
  getRoute (route: RouteObj) {
    if (route.path === '/Partner/PartnerList') {
      this.showGoBack = true
    } else {
      this.showGoBack = false
    }
  }

  // 更新个人信息
  updatePersonInfoFn () {
    this.diaFormData = {}
    this.dialogShowUpdate = true
    // getListAndParams(`${baseUrl}/user-service/partner/${this.userInfo.userId}`).then((res) => {
    //   if (res && res !== null) {
    //     delete (res as PartnerRes).vmCount
    //     this.diaFormData = {
    //       ...(res || {})
    //     }
    //   }
    // })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPartner(this.userInfo.userId).then((res: any) => {
      if (res && res !== null) {
        delete (res as PartnerRes).vmCount
        this.diaFormData = {
          ...(res || {})
        }
      }
    })
  }

  // 修改密码
  changePasswordFn () {
    this.dialogShowPass = true
  }

  // 修改密码回调
  closeDialogPass () {
    this.dialogShowPass = false
  }

  // 更新个人信息
  closeDialogUpdate () {
    this.dialogShowUpdate = false
  }
  // 退出系统
  logoutFn () {
    this.centerDialogVisible = true
  }

  // 退出动作
  logoutDia () {
    this.centerDialogVisible = false
	}

	clearToken () {
    this.$store.dispatch('logout')
  }
}
</script>

<style lang="scss" scoped>
  .logout {
    .go-back {
      // position:absolute;
      display: inline-block;
      right: 140px;
      width:70px;
      height: 34px;
      line-height: 34px;
      border-right: 1px solid #202742;
      // opacity: 0.57;
      h3 {
        margin:0;
        color: #e3e6ff;
        font-size:14px;
        cursor: pointer;
        i {
          vertical-align: middle;
          // margin-bottom: 3px;
        }
        span {
        }
      }
    }
    .logout-info {
      // width: 100%;
      margin-left: 20px;
      display: inline-block;
      img {
        width: 36px;
        height: 36px;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 10px;
      }
      h3 {
        display: inline-block;
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: #94a1cb;
      }
      /deep/ .el-dropdown-menu {
        background: #242a59 !important;
        box-shadow: 0px 6px 16px 0px rgba(0,0,0,0.32), 0px 3px 6px -4px rgba(0,0,0,0.48);
      }
    }

    // 退出系统部分
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
      text-align: center;
    }
    .diaLog-span {
      display: block;
      width: 100%;
      font-size: 24px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: center;
      color: #fff;
      line-height: 28px;
    }
    .pass-btn-c {
      width: 80px;
      height: 36px;
      font-size: 14px;
      border-radius: 0;
      background: linear-gradient(145deg,rgba(140,140,169,1), rgba(36,39,75,1));
      // margin-left:40px;
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