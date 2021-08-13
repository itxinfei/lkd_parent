<template>
  <el-dialog
    width="630px"
    title="修改点位"
    :visible.sync="syncDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="open"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="点位名称："
        prop="name"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="所在区域："
        prop="regionId"
      >
        <el-select
          v-model="form.regionId"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in regions"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="所属商圈："
        prop="businessId"
      >
        <el-select
          v-model="form.businessId"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in businessTypes"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="归属合作商："
        prop="ownerId"
      >
        <el-select
          v-model="form.ownerId"
          placeholder="请选择"
          :filterable="true"
          @change="handlePartnerChange"
        >
          <el-option
            v-for="(item, index) in partners"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="详细地址："
        prop="addr"
      >
        <area-cascader
          v-model="areaCascaderSel"
          type="text"
          :level="1"
          :data="pcaa"
        />
        <el-input
          v-model="form.addr"
          type="textarea"
          placeholder="请输入详细地址"
          maxlength="60"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <secondary-button
        @handleClick="syncDialogVisible = false"
      >
        <template v-slot>
          取消
        </template>
      </secondary-button>
      <primary-button1 @handleClick="ensureDialog">
        <template v-slot>
          确认
        </template>
      </primary-button1>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'
import PrimaryButton1 from '@/components/buttons/primary-button1.vue'
import SecondaryButton from '@/components/buttons/secondary-button.vue'
import { searchRegion } from '@/api/regions'
import { Region } from '@/entity/region'
import { businessType } from '@/api/vms'
import { defaultNodeModelView, updateNode } from '@/api/nodes'
import { BusinessType } from '@/entity/vm'
import { NodeModelView, Nodes } from '@/entity/node'
import { Partner } from '@/entity/partner'
import { ElForm } from 'element-ui/types/form'
import { pcaa } from 'area-data'
import { searchPartner } from '@/api/partners'
import { loadAllParams } from '@/entity/page'
import { defaultFormLabelWidth } from '@/utils'

@Component({
  name: 'NodeEditDialog',
  components: {
    PrimaryButton1,
    SecondaryButton
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean
  @Prop({ type: Object }) private readonly node!: Nodes

  private formLabelWidth = defaultFormLabelWidth
  private form: NodeModelView = { ...defaultNodeModelView }
  // 所在区域
  private regions: Region[] = []
  // 所属商圈
  private businessTypes: BusinessType[] = []
  // 归属合作商
  private partners: Partner[] = []
  // 详细地址
  private pcaa: any = pcaa
  private areaCascaderSel: any = []

  // 验证规则
  private rules: object = {
    name: [{ required: true, message: '请输入', trigger: 'change' }],
    regionId: [{ required: true, message: '请输入', trigger: 'change' }],
    businessId: [{ required: true, message: '请输入', trigger: 'change' }],
    ownerId: [{ required: true, message: '请输入', trigger: 'change' }],
    addr: [{ required: true, message: '请输入', trigger: 'change' }]
  }

  private open() {
    let addrArr = this.node.addr.split('-')
    this.areaCascaderSel = addrArr.slice(0, 3)
    this.form = {
      name: this.node.name,
      areaCode: this.node.areaCode,
      addr: addrArr[addrArr.length - 1],
      createUserId: this.node.createUserId,
      regionId: this.node.regionId,
      businessId: this.node.businessId,
      ownerId: this.node.ownerId,
      ownerName: this.node.ownerName
    }
    this.searchRegion()
    this.businessType()
    this.searchPartner()
  }

  private async searchRegion() {
    const { data } = await searchRegion(loadAllParams)
    this.regions = data.currentPageRecords
  }

  private async businessType() {
    const { data } = await businessType()
    this.businessTypes = data
  }

  private async searchPartner() {
    const { data } = await searchPartner(loadAllParams)
    this.partners = data.currentPageRecords
  }

  private handlePartnerChange(ownerId: number) {
    const partner = this.partners.find((partner: Partner) => { return partner.id === ownerId })
    if (partner) {
      this.form.ownerName = partner.name
    }
  }

  private async ensureDialog() {
    try {
      await (this.$refs['form'] as ElForm).validate()
      let tempNode: NodeModelView = { ...this.form }
      const [provinceText, cityText, districtText] = this.areaCascaderSel
      let provinceCode = ''
      let cityCode = ''
      // 根据省市区汉字查询编码
      for (let key in pcaa['86']) {
        if (pcaa['86'][key] === provinceText) {
          provinceCode = key
          break
        }
      }
      for (let key in pcaa[provinceCode]) {
        if (pcaa[provinceCode][key] === cityText) {
          cityCode = key
          break
        }
      }
      tempNode.areaCode = Number(cityCode)
      tempNode.addr = this.areaCascaderSel.join('-') + '-' + tempNode.addr
      // 提交表单
      await updateNode(this.node.id, tempNode)
      this.syncDialogVisible = false
      this.$emit('refreshList')
    } catch (err) {
      console.log('err: ' + err)
    }
  }
}
</script>

<style lang="scss">
.area-cascader-wrap {
  margin-bottom: 20px;

  .area-select {
    width: 276px;
    height: 46px;

    .area-selected-trigger {
      padding-top: 0px;
    }
  }
}
</style>
