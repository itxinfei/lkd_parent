<template>
  <div
    :id="id"
    :class="className"
    :style="{height: height, width: width}"
  />
</template>

<script lang="ts">
import echarts, { EChartOption } from 'echarts'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ResizeMixin from '@/utils/resize.ts'

@Component({
  name: 'SkuSaleCollectLineChart'
})
export default class extends mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) private className!: string
  @Prop({ default: 'chart' }) private id!: string
  @Prop({ default: '200px' }) private width!: string
  @Prop({ default: '200px' }) private height!: string
  @Prop() private title!: string
  @Prop() private chartOption!: any
  @Watch('chartOption', { deep: true })
  onChartOptionChanged(val: any, oldVal: any) {
    this.initChart()
  }
  // 坐标轴的颜色
  private axisStyleColor1 = '#D9D9D9'
  private axisStyleColor2 = '#999999'
  // 线的颜色
  private lineStyleColor = '#FF5757'
  // 渐变的颜色
  private areaStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgba(255, 87, 87, 0.5)' },
    { offset: 0.3, color: 'rgba(255, 169, 169, 0.3)' },
    { offset: 1, color: 'rgba(255, 169, 169, 0)' }
  ])

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

  /**
   * 初始化柱状图
   */
  private initChart() {
    if (!this.chart) {
      this.chart = echarts.init(document.getElementById(
        this.id
      ) as HTMLDivElement)
    }

    const grid = {
      left: '30',
      right: '33',
      top: '60',
      bottom: '5',
      containLabel: true
    }
    this.chart.setOption({
      title: {
        text: this.title,
        left: 'center',
        top: '10',
        textStyle: {
          color: '#333333',
          fontWeight: 'bolder',
          fontSize: 14
        }
      },
      grid: grid,
      xAxis: {
        type: 'category',
        data: this.chartOption.xAxisData,
        axisLine: {
          lineStyle: {
            color: this.axisStyleColor1
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: this.axisStyleColor1
          }
        },
        axisLabel: {
          align: 'center',
          color: this.axisStyleColor2
        },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        name: this.chartOption.yAxisName,
        nameTextStyle: {
          color: this.axisStyleColor2
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: this.axisStyleColor2
        },
        splitLine: {
          lineStyle: {
            color: this.axisStyleColor1
          }
        }
      },
      series: this.getSeriesOption(),
      // TODO：细节调整
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: this.axisStyleColor1,
            width: 2
          }
        },
        formatter: '{c}<br />{b}销售额',
        backgroundColor: '#FFFFFF',
        borderColor: '#eef3f8',
        borderWidth: 1,
        textStyle: {
          color: '#8C8C8C'
        },
        padding: 12
      }
    } as EChartOption<EChartOption.SeriesBar>)
  }

  /**
   * 数据格式转换
   */
  private getSeriesOption() {
    return [{
      type: 'line',
      data: this.chartOption.seriesData,
      smooth: true,
      lineStyle: {
        color: this.lineStyleColor,
        width: 3,
        shadowColor: 'rgba(222, 115, 127, 0.23)',
        shadowBlur: 10,
        shadowOffsetY: 8
      },
      areaStyle: {
        color: this.areaStyleColor
      }
    }]
  }
}
</script>
