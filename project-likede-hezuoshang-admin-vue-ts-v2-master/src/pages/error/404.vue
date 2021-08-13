<template>
  <div class="no-found">
    <div class="error">
      <div class="error-word">
        <h1>很抱歉，您的页面迷路了~</h1>
        <el-button type="danger" style="margin-top: 10px;width: 132px;height: 40px;font-size: 14px;font-weight: 400;background: linear-gradient(145deg,#ff9090 8%, #ff5757 88%);border-radius: 0;border: none;" @click="$router.push('/')">返回首页</el-button>
      </div>
      <div class="error-img">
        <img src="@/assets/404/404.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class extends Vue {}
</script>

<style lang="scss" scoped>
  .no-found {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .error {
      display: flex;
      width: 850px;
      height: 386px;
      
      .error-word {
        flex: 1;
        height: 100%;
        h1 {
          margin-top: 80px;
        }
      }
      .error-img {
        width: 390px;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    
  }
</style>