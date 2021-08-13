<template>
  <div class="main-container">
    <el-scrollbar
      class="scrollbar"
      style="height:100%"
    >
      <section class="app-main">
        <transition
          name="fade-transform"
          mode="out-in"
        >
          <router-view />
        </transition>
      </section>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class extends Vue {}
</script>

<style lang="scss">
.main-container {
  height: 100%;
  transition: margin-left 0.28s;
  padding-top: $navBarHeight;
  margin-left: $sideBarWidth;
  position: relative;
  background-color: #F8FAFD;
  overflow: hidden;
}

.scrollbar > div {
  overflow-x: hidden;
}

.app-main {
  padding: 20px;
}
</style>
