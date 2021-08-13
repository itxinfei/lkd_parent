<template>
  <div class="layout">
    <div class="main-router" :style="routeStyle" v-loading.fullscreen="$store.state.loading" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 0.7)">
      <el-scrollbar style="height:100%;">
        <div class="header-main">
          <HeaderCommon />
        </div>
        <transition name="fade-transform" mode="out-in">
          <router-view class="router"></router-view>
        </transition>
      </el-scrollbar>
      
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import HeaderCommon from '@/components/layout/HeaderCommon.vue'

@Component({
  components: {
    HeaderCommon
  }
})
export default class extends Vue {
  get isCollapse () {
    return this.$store.state.isCollapse
  }
    
  get routeStyle () {
    const { height, width } = this.$store.state.windowSize || {}
    return {
      height: height ? height - 56 + 'px' : '100%',
      width: width ? (this.isCollapse ? width - 54 + 'px' : width - 200 + 'px') : '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    min-width: 1200px;
    display: flex;
    height: 100%;
    width: 100%;
    background: url(~@/assets/Index/background.png);
    background-size: cover;
		justify-content: center;
    .main-router {
			border-radius: 5px;
      transition: all 0.5s;
      overflow: auto;
      .header-main {

      }
      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
      }
		}
  }
</style>