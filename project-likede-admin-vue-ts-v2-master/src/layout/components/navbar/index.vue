<template>
  <div class="navbar">
    <img
      src="@/assets/logo/logo.png"
      alt
      class="logo"
    >
    <div class="right-menu">
      <el-row>
        <el-col :span="5">
          <div style="height: 60px;line-height: 60px;">
            <img
              src="@/assets/logo/avatar.png"
              style="vertical-align: middle;"
            >
          </div>
        </el-col>
        <el-col :span="14">
          <div style="height: 60px;line-height: 60px;">
            <span style="vertical-align: middle;">欢迎您，{{ userName }}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <el-tooltip
            class="item"
            effect="dark"
            content="退出登录"
            placement="bottom"
          >
            <div
              style="height: 60px;line-height: 60px;"
              @click="logout"
            >
              <span style="vertical-align: middle;cursor: pointer;">退出</span>
              <svg-icon
                name="triangle"
                style="vertical-align: middle;cursor: pointer;color: #ffffff;"
              />
            </div>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Navbar'
})
export default class extends Vue {
  private userName = UserModule.userName

  private async logout() {
    await UserModule.LogOut()
    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navBarHeight;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1999;
  background-image: url('~@/assets/logo/banner.png');
  background-size: cover;
  background-repeat: no-repeat;

  .logo {
    margin-top: 6px;
    margin-left: 15px;
  }

  .right-menu {
    float: right;
    width: 240px;
    height: 100%;
    margin-right: 24px;
    color: rgba(255, 255, 255, 1);

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
