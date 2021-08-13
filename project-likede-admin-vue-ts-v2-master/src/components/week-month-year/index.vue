<template>
  <div class="week-month-year">
    <div
      v-for="(item, index) in groupList"
      :key="index"
      :class="'item ' + (checkedIndex === index ? 'is-checked' : '')"
      @click="handleChange(index)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

type GroupItem = {
  label: string
  value: string
};

@Component({
  name: 'CommonWeekMonthYear'
})
export default class extends Vue {
  private checkedIndex = 0
  private groupList: GroupItem[] = [{ label: '周', value: 'week' }, { label: '月', value: 'month' }, { label: '年', value: 'year' }]

  private async handleChange(index: number) {
    if (this.checkedIndex === index) {
      return
    }
    this.checkedIndex = index
    this.$emit('handleChange', this.groupList[index].value)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';

.week-month-year {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 129px;
  height: 34px;
  background: rgba(233, 243, 255, 0.37);
  border-radius: 10px;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 37px;
    height: 25px;
    font-size: 14px;
    color: #9CA3B4;
    cursor: pointer;
  }

  .is-checked {
    background: #FFFFFF;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.11);
    border-radius: 7px;
    font-weight: 600px;
    color: $--color-text-primary;
  }
}
</style>
