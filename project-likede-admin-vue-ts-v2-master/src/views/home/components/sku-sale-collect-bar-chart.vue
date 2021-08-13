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
  name: 'SkuSaleCollectBarChart'
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
  private axisColor = '#D9D9D9'
  private axisColor2 = '#999999'
  // 柱条的颜色
  private itemStyleColor = '#91B0FF'

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
      left: '33',
      right: '30',
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
      legend: {
        bottom: 0,
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
      // dataZoom: [
      //   {
      //     type: 'inside'
      //   }
      // ],
      series: this.getSeriesOption(),
      // TODO：细节调整
      tooltip: {
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
      type: 'bar',
      data: this.chartOption.seriesData,
      itemStyle: {
        color: this.itemStyleColor,
        barBorderRadius: [4, 4, 0, 0]
      },
      barWidth: 14,
      barGap: '100%'
    }]
  }
}
</script>
