<template>
  <!-- 头部信息部分 -->
  <div class="list-title">
    <!-- 左边 -->
    <div class="title-left">
      <img src="@/assets/Index/title.png" alt="" />
      <h3>分账信息</h3>
    </div>
    <!-- 右边 -->
    <div class="title-right">
      <h3 @click="goCardList">更多<i class="el-icon-arrow-right"></i></h3>
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TableListTitle extends Vue {
  static componentName = 'TableListTitle'

  goCardList () {
    this.$router.push('/Partner/PartnerList')
  }
}
</script>

<style lang="scss" scoped>
  .list-title {
    width: 100%;
    // height: 50px;
    // line-height: 50px;
    padding-top: 14px;
    position: relative;
    display: flex;
    .title-left {
      flex: 1;
      text-align: left;
      img {
        width: 60px;
        vertical-align: middle;
      }
      h3 {
        margin: 0;
        display: inline-block;
        position: absolute;
        left: 30px;
        top: 32px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #ffffff;
      }
    }
    .title-right {
      flex: 1;
      text-align: right;
      h3 {
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #ffffff;
        margin-top: 20px;
        margin-left: 8px;
      }
    }
  }
</style>