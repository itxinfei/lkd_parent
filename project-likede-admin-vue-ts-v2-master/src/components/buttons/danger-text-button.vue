<template>
  <el-button
    type="text"
    class="el-button--danger-text"
    :disabled="disabled"
    @click="handleClick"
  >
    删除
  </el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'DangerTextButton'
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

.el-button--danger-text {
  color: #FF5A5A;

  &:hover,
  &:focus {
    color:#EB4444;
  }

  &.is-disabled {
    color: #FFDADA;
  }
}
</style>
