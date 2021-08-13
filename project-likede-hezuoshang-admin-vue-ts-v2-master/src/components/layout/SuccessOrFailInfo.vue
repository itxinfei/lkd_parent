<template>
  <div class="success-fail">
    <el-dialog :visible.sync="dialogChangeShow" :before-close="closeChangeDialog" :close-on-click-modal="false" :show-close="false" width="435px" height="250px" top="40vh" :modal-append-to-body="false">
      <div style="width:100%;text-align:center;">
        <img v-if="infoTitle === '成功'" src="@/assets/Common/success.png" alt="成功" />
        <img v-if="infoTitle === '失败'" src="@/assets/Common/fail.png" alt="失败" />
      </div>
      <slot></slot>
      <p><span>{{ timeOut }}</span>s后自动返回首页</p>
    </el-dialog>
  </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SuccessOrFailInfo extends Vue {
  static componantName = 'SuccessOrFailInfo'
  @Prop([String]) infoTitle !: string
  @Prop([Boolean]) dialogChangeShow !: boolean
  
  private timeOut = 0
  closeChangeDialog () {
    this.$emit('closeChangeDialog')
  }

  mounted () {
    this.timeOut = 5
    const timer = setInterval(() => {
      this.timeOut--
      if (this.timeOut === 0) {
        this.$router.push('/')
        this.$emit('closeChangeDialog')
        clearInterval(timer)
      }
    },1000)
    this.$once('hook:beforeDestroy', ()=>{
      clearInterval(timer)
    })
  }
}
</script>

<style lang="scss" scoped>
  .success-fail {
    
    img {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 70px;
      height: 70px;
      display: block;
      text-align:center;
      padding-bottom: 20px;
    }
    /deep/ .el-dialog__body {
      color: #606266;
      font-size: 24px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: rgba(255,255,255,0.85);
      line-height: 32px;
    }
    /deep/ .el-dialog__header {
      padding: 0;
    }
    p {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: rgba(255,255,255,0.45);
      line-height: 22px;
    }
  }
</style>