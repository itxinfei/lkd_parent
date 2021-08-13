<template>
  <div class="ms-title">
    <img src="@/assets/Common/logo.png" alt="" />
    <el-divider direction="vertical"></el-divider>
    <h3>{{ title }}</h3>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class LogoTitle extends Vue {
    @Prop([String]) title!: string
  }
</script>

<style lang="scss" scoped>
  .ms-title {
    img {
      vertical-align: middle;
      width: 92px;
      height: 38px;
      padding-right: 6px;
    }
    h3 {
      margin: 0;
      height: 35px;
      padding-left: 6px;
      font-size: 22px;
      font-weight: 400;
      text-align: left;
      color: #e3e6ff;
      line-height: 22px;
      letter-spacing: 2px;
      display: inline-block;
    }
    /deep/ .el-divider {
      opacity: 0.35;
      background: #6e7fff;
    }
  }
</style>