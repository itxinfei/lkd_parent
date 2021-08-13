<template>
  <el-button
    type="text"
    class="el-button--primary-text"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'PrimaryTextButton'
})
export default class extends Vue {
  private async handleClick() {
    this.$emit('handleClick')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.el-button--primary-text {
  color: $--color-primary;

  &:hover,
  &:focus {
    color: #4368E1;
  }
}
</style>
