<template>
  <div class="item">
    <div
      class="sku"
      @click="handleClick"
    >
      <img
        v-show="selected"
        class="selected"
        src="@/assets/vm/selected.png"
      >
      <img
        class="img"
        :src="skuImage"
      >
      <div>
        {{ skuName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'

@Component({
  name: 'VmConfigChannelSkuItem'
})
export default class extends Vue {
  @Prop({ type: String }) private readonly skuName !: String
  @Prop({ type: String }) private readonly skuImage !: String
  @Prop({ type: Boolean }) private readonly selected !: boolean

  private handleClick() {
    this.$emit('handleCurrentChange')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.sku {
  position: relative;
  width: 134px;
  height: 134px;
  margin-bottom: 20px;
  padding-top: 16px;
  background-color: #F6F7FB;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  .selected {
    position: absolute;
    top: 0;
    left: 0;
  }

  .img {
    display: inline-block;
    width: 83px;
    height: 84px;
    margin-bottom: 5px;
    object-fit: contain;
  }
}
</style>
