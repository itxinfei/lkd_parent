<template>
  <div class="header-common">
    <div class="header-left">
      <!-- header左侧logo部分 -->
      <LogoTitle title="合作商后台" />
    </div>
    <div class="header-right">
      <!-- header右侧信息更改修改密码退出登录部分 -->
      <Logout />
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import LogoTitle from './LogoTitle.vue'
import Logout from './Logout.vue'

@Component({
  components: {
    LogoTitle,
    Logout
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
  .header-common {
    min-width: 1200px;
    position: relative;
    height: 88px;
    border-bottom: 2px solid #202742;
    display: flex;
    .header-left {
      // height: 100%;
      line-height: 88px;
      flex: 1;
      margin-left: 50px;
    }
    .header-right {
      flex: 1;
      // line-height: 88px;
      // text-align: right;
      margin-right: 30px;
      padding-top: 27px;
      box-sizing: border-box;
      // 修改text-align被穿透到子组件
      position: absolute;
      right: 0;
    }
  }
</style>