<template>
  <el-button
    type="primary"
    class="el-button--primary2"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PrimaryButton2'
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) private readonly disabled !: boolean

  private async handleClick() {
    this.$emit('handleClick')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.el-button--primary2 {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  height: 36px;
  padding: 0;
  background-color: $--color-primary;
  border: none;

  &:hover,
  &:focus {
    background-color: #5373E0;
  }

  &.is-disabled {
    background-color: $--color-primary;
    opacity: 0.3;
  }
}
</style>
