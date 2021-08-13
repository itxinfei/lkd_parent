<template>
  <el-button
    type="primary"
    class="el-button--secondary"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SecondaryButton'
})
export default class extends Vue {
  private async handleClick() {
    this.$emit('handleClick')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.el-button--secondary {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: $--color-function4 !important;
  border: none;
  color: #655B56 !important;

  &:hover,
  &:focus {
    background-color: #F3E7E1 !important;
  }
}
</style>
