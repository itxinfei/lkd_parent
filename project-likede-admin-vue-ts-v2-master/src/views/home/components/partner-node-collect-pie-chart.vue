<template>
  <div
    :class="className"
    :style="{height: height, width: width}"
  />
</template>

<script lang="ts">
import echarts, { EChartOption } from 'echarts'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ResizeMixin from '@/utils/resize'

@Component({
  name: 'PartnerNodeCollectPieChart'
})
export default class extends mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) private className!: string
  @Prop({ default: '100%' }) private width!: string
  // TODO: 这个地方需要在mac上看下效果
  @Prop({ default: '300px' }) private height!: string
  @Prop() private chartOption!: any
  @Watch('chartOption', { deep: true })
  onChartOptionChanged(val: any, oldVal: any) {
    this.initChart()
  }

  // mounted() {
  //   this.$nextTick(() => {
  //     this.initChart()
  //   })
  // }

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons')
    this.chart.setOption({
      // TODO：细节调整，小圈，阴影，线的长度...
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br />总占比：{d}%',
        backgroundColor: '#FFFFFF',
        borderColor: '#eef3f8',
        borderWidth: 1,
        textStyle: {
          color: '#8C8C8C'
        },
        padding: 12
      },
      label: {
        formatter: ['{name|{b}}', '{percentage|{d}%}'].join('\n'),
        rich: {
          name: {
            color: '#333333',
            fontWeight: 'bolder',
            align: 'left'
          },
          percentage: {
            color: '#000000',
            lineHeight: 20,
            align: 'left'
          }
        }
      },
      labelLine: {
        lineStyle: {
          color: '#BFBFBF'
        }
      },
      series: [
        {
          type: 'pie',
          roseType: 'radius',
          radius: [33, 100],
          center: ['50%', '50%'],
          data: this.chartOption.seriesData,
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }
      ],
      color: ['#85A7FF', '#99EBBD', '#FFB18B', '#C6EBFF', '#BECCE6']
    } as EChartOption<EChartOption.SeriesPie>)
  }
}
</script>
