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
import ResizeMixin from '@/utils/resize'

@Component({
  name: 'UserTaskStatusBarChart'
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
  private axisColor = '#D9D9D9'
  private axisColor2 = '#999999'
  // 柱条的颜色
  private itemStyleColor = ['#FF5757', '#5B5B5B']
  private shadowColor = ['rgba(255, 99, 85, 0.5)', 'rgba(119, 119, 119, 0.5)']

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
      left: '20',
      right: '20',
      top: '60',
      bottom: '60',
      containLabel: true
    }
    this.chart.setOption({
      title: {
        text: this.title,
        left: 'center',
        top: '10',
        textStyle: {
          color: '#333333',
          fontWeight: 'normal',
          fontSize: 14
        }
      },
      grid: grid,
      legend: {
        top: 'bottom',
        data: this.chartOption.legendData
      },
      xAxis: {
        type: 'category',
        data: this.chartOption.xAxisData,
        axisLine: {
          lineStyle: {
            color: this.axisColor
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: this.axisColor
          }
        },
        axisLabel: {
          align: 'center',
          color: this.axisColor2
        }
      },
      yAxis: {
        type: 'value',
        name: this.chartOption.yAxisName,
        nameTextStyle: {
          color: this.axisColor2
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: this.axisColor2
        },
        splitLine: {
          lineStyle: {
            color: this.axisColor
          }
        }
      },
      dataZoom: [{
        type: 'inside'
      }, {
        type: 'slider',
        left: 55,
        right: 55,
        bottom: 25
      }],
      series: this.getSeriesOption(),
      tooltip: {
        formatter: '{b}<br/>{a}数：{c}个',
        backgroundColor: '#ffffff',
        borderColor: '#eef3f8',
        borderWidth: 1,
        textStyle: {
          color: '#666666'
        },
        padding: 12
      }
    } as EChartOption<EChartOption.SeriesBar>)
  }

  /**
   * 数据格式转换
   */
  private getSeriesOption() {
    return this.chartOption.seriesData.map((item: number[], index: number) => {
      return {
        name: this.chartOption.legendData[index],
        type: 'bar',
        data: item,
        itemStyle: {
          color: this.itemStyleColor[index],
          barBorderRadius: [10, 10, 0, 0],
          shadowColor: this.shadowColor[index],
          shadowBlur: 10,
          shadowOffsetY: 8
        },
        barMaxWidth: 10
      }
    })
  }
}
</script>
