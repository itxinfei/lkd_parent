<template>
  <el-dialog
    width="630px"
    title="订单详情"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="order-status">
      <img
        v-if="order"
        class="icon"
        :src="require('@/assets/order/icon_' + order.status + '.png')"
      >
      <span class="status">{{ orderStatus[order.status] }}</span>
      <img
        v-if="order"
        class="pic"
        :src="require('@/assets/order/pic_' + order.status + '.png')"
      >
    </div>
    <el-form :label-width="formLabelWidth">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="订单编号："
          >
            {{ order.orderNo }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="商品名称："
          >
            {{ order.skuName }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="订单金额："
          >
            {{ (order.amount / 100).toFixed(2) }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="设备编号："
          >
            {{ order.innerCode }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="创建时间："
          >
            {{ order.createTime | dateTimeFormat }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="完成时间："
          >
            {{ order.updateTime | dateTimeFormat }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="支付方式："
          >
            {{ order.payType === '1' ? '支付宝' : '微信支付' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="设备地址："
          >
            {{ order.addr.substring(order.addr.lastIndexOf('-') + 1) }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { ORDER_STATUS } from '@/api/orders'
import { Order } from '@/entity/order'
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'

@Component({
  name: 'OrderDetailDialog'
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Object }) private readonly order!: Order

  private formLabelWidth = '120px'

  private orderStatus = ORDER_STATUS
}
</script>

<style lang="scss" scoped>
.order-status {
  display: flex;
  align-items: center;
  height: 54px;
  margin-bottom: 30px;
  background-color: rgba(236, 236, 236, 0.39);

  .icon {
    margin-left: 22px;
  }

  .status {
    flex: 1;
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.85);
  }

  .pic {
    margin-right: 76px;
    margin-bottom: 7px;
  }
}
</style>
