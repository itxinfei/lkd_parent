<template>
  <div class="item">
    <div class="sku">
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
  name: 'VmConfigChannelTop10Sku'
})
export default class extends Vue {
  @Prop({ type: String }) private readonly skuName !: String
  @Prop({ type: String }) private readonly skuImage !: String
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.sku {
  width: 134px;
  height: 134px;
  margin-bottom: 20px;
  padding-top: 16px;
  background-color: #F6F7FB;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  text-align: center;

  .img {
    display: inline-block;
    width: 83px;
    height: 84px;
    margin-bottom: 5px;
    object-fit: contain;
  }
}
</style>
