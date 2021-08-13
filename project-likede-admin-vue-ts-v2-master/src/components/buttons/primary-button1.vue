<template>
  <el-button
    type="primary"
    class="el-button--primary1"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PrimaryButton1'
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

.el-button--primary1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background: $--color-function1 !important;
  border: none;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #FF7D43 0%, #DB3602 100%) !important;
  }

  &.is-disabled {
    background: linear-gradient(135deg, #FF9743 0%, #FF5E20 100%) !important;
    opacity: 0.3;
  }
}
</style>
