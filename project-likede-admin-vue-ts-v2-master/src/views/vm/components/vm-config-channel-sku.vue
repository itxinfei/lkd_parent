<template>
  <div
    v-if="channel"
    class="item"
  >
    <div class="code">
      {{ channel.channelCode }}
    </div>
    <div class="sku">
      <img
        class="img"
        :src="`${channel.sku ? channel.sku.skuImage : require('@/assets/vm/default_sku.png')}`"
      >
      <div
        class="name"
        :title="channel.sku ? channel.sku.skuName : '暂无商品'"
      >
        {{ channel.sku ? channel.sku.skuName : '暂无商品' }}
      </div>
    </div>
    <div>
      <primary-text-button @handleClick="handleSetClick">
        <template v-slot>
          添加
        </template>
      </primary-text-button>
      <danger-text-button
        :disabled="!channel.sku ? true : false"
        @handleClick="handleRemoveClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Channel } from '@/entity/channel'
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'
import PrimaryTextButton from '@/components/buttons/primary-text-button.vue'
import DangerTextButton from '@/components/buttons/danger-text-button.vue'

@Component({
  name: 'VmConfigChannelSku',
  components: {
    PrimaryTextButton,
    DangerTextButton
  }
})
export default class extends Vue {
  @Prop({ type: Number }) private readonly currentIndex !: number
  @Prop({ type: Object }) private readonly channel !: Channel

  private handleSetClick() {
    this.$emit('openSetSkuDialog', this.currentIndex, this.channel.channelCode)
  }

  private handleRemoveClick() {
    this.$emit('openRemoveSkuDialog', this.currentIndex, this.channel.channelCode)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.item {
  position: relative;
  width: 150px;
  height: 180px;
  background: $--color-white;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  border-radius: 4px;

  .code {
    position: absolute;
    top: 10px;
    left: 0;
    width: 43px;
    height: 23px;
    line-height: 23px;
    background: #829BED;
    border-radius: 0px 10px 10px 0px;
    font-size: 12px;
    color: $--color-white;
  }

  .sku {
    height: 135px;
    padding-top: 16px;
    background-color: #F6F7FB;
    border-radius: 4px;

    .img {
      display: inline-block;
      width: 84px;
      height: 78px;
      margin-bottom: 10px;
      object-fit: contain;
    }

    .name {
      padding: 0 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
