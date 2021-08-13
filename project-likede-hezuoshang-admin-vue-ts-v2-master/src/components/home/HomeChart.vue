<template>
  <div class="home-chart">
    <div class="chart-top">
      <!-- 检索条件组件 -->
      <TitleIndex @sendTitleInd="getTitleNum" />
    </div>
    <!-- 中间信息部分 -->
    <!-- <div class="chart-middle">
      <p>
        <span class="money">4315</span>
        <span class="company">元</span>
        <span class="last-span">平均收益</span>
      </p>
    </div> -->
    <!-- charts部分 -->
    <div class="chart-bottom">
      <div id="totalChart" class="chart" />
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import echarts from 'echarts'
import TitleIndex from './HomeChart/TitleIndex.vue'
// getLastMonthStartDateAndEndDate废弃 === getWeekEndDateChart
import { getMonthStartAndEnd, startTodayNoHMS } from '@/utils/formValidate'
// import { getListAndParams } from '@/utils/request'
// import { baseUrl } from '@/config.json'
import Cookies from 'js-cookie'
import { DataObjList } from '@/types/home/HomeChart'
import { getReportCollectReport } from '@/api/index.ts'

@Component({
  components: {
    TitleIndex
  }
})
export default class HomeChart extends Vue {
  static componentName = 'HomeChart'
  private thisOrLastOrcertainMonth = [ this.funDate(-6), startTodayNoHMS() ] as Array<string>
  private getUserInfo = JSON.parse(Cookies.get('setUserInfo'))
  private dataObjList = {} as DataObjList

  @Prop([Array]) mounthArr !: Function

  get option () {
    return {
      color: ['rgba(255,87,87,1)'],
      tooltip: {
        // trigger: 'item',
        trigger: 'axis',
        formatter: `<div style="padding:10px 20px;">
          <span style="font-size: 14px;color: #94a1cb;">{b}</span> <br/>
          <span style="font-size: 14px;color: #94a1cb;">{a}</span> 
          <span style="color:rgba(253,86,86,1);font-weight: 600;font-size: 16px;margin-top:4px;">{c}元</span> 
        </div>`,
        // 其中p为当前鼠标的位置
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        position: function(p: any){
        return [p[0] + 10, p[1] - 10]
        },
        extraCssText: 'boxShadow: 0px 0px 16px 0px rgba(0,0,0,0.1);borderRadius: 4px;'
        // extraCssText: 'width:160px;height:40px;background: #0c0c33;boxShadow: 0px 0px 16px 0px rgba(0,0,0,0.1);borderRadius: 4px;'
      },
      grid: {
        left: '2%',
        width: '96%',
        height: '70%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.dataObjList.xAxis,
          axisLabel: {
            color: '#999999'
          },
          // x轴坐标轴颜色
          axisLine: {
            lineStyle: {
              color: '#4a5483',
              //这里是为了突出显示加上的 
              width: 1,
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          // 网格线
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(148,161,203,0.3)'
            },
            show: true
          },
          // y轴坐标字体颜色
          axisLabel: {
            color: 'rgba(148,161,203,1)'
          }
        }
      ],
      series: [
        {
          name: '收益',
          type: 'line',
          showSymbol: false,
          data: this.dataObjList.series,
          symbol:'circle',
          // 控制原点大小并显示
          symbolSize: 6,
          emphasis: {
            // label: {
            //   show: true,
            //   color: '#fff',
            //   fontSize: 20
            // },
            itemStyle: {
              color: 'rgba(255,87,87,1)',
              borderColor: '#fff',
              borderWidth: 2,
              opacity: 1
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255,87,87,1)'
              },{
                offset: 1,
                color: 'rgba(248, 205, 205, 0.2)'
              }]),
            }
          },
          smooth: true,
          itemStyle: {
            normal: {
              // 原点颜色
              
              color: 'rgba(255,87,87,1)',
              borderColor: 'rgba(255,87,87,1)',
              lineStyle: {
                // 线条颜色
                // color: 'rgba(255,87,87,1)'
                color: 'rgba(255, 87, 87, 1)',
                width: 3
              }  
            }
          }
        }
      ]
    }
  }

  mounted () {
    this.getLineChart()
  }

  getTitleNum (data: number | Array<string>) {
    // 自定义日期框
    if (typeof data === 'object' && data !== null) {
      this.thisOrLastOrcertainMonth = [...data]
      this.getLineChart()
    } else {
      switch (data) {
        case 0:
          // 本周 getWeekEndDateChart 废弃
          this.thisOrLastOrcertainMonth = [ this.funDate(-6), startTodayNoHMS() ]
          this.getLineChart()
          break;
        case 1:
          // 上月
          this.thisOrLastOrcertainMonth = [...getMonthStartAndEnd(-1)]
          this.getLineChart()
          break;
        default:
          this.thisOrLastOrcertainMonth = []
      }
    }
  }

  getLineChart () {
    const params = {
      id: this.getUserInfo.userId,
      dateArr: [ ...this.thisOrLastOrcertainMonth ]
    } as {
      id: string;
      dateArr: Array<string>;
    }
    // const _this = this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getReportCollectReport(params).then((res: any) => {
      if (res && res !== null) {
        this.dataObjList = {
          ...res
        }
        this.dataObjList.series = this.dataObjList.series ? this.dataObjList.series.map((obj) => (String(Number(obj) / 100))) : []
        const dom = document.getElementById('totalChart')
        const myChart = echarts.init(dom)
        myChart.setOption(this.option, true)
        window.addEventListener('resize', () => {
          myChart.resize()
        })
        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('resize', () => {
            myChart.resize()
          })
        })
      }
    })
  }

  funDate (aa: number) {
    const date1 = new Date()
    const date2 = new Date(date1)
    date2.setDate(date1.getDate() + aa )
    const tempGetMonth = (date2.getMonth() + 1) < 10 ? '0' + (date2.getMonth() + 1) : (date2.getMonth() + 1)
    // const time2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate())
    const time2 = date2.getFullYear() + '-' + tempGetMonth + '-' + (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate())
    return time2
  }
}
</script>

<style lang="scss" scoped>
  // 右边部分
  .home-chart {
    position: relative;
    box-sizing: border-box;
    flex: 1;
    margin-left: 20px;
    // background: linear-gradient(166deg,rgba(73,84,150,1) 5%, rgba(46,53,100,1) 36%, rgba(25,30,65,1) 98%);
    background: linear-gradient(166deg, #495496 10%, #2E3564 60%, rgba(25,30,65,1) 98%);
    // box-shadow: 0px 3px 24px 0px rgba(0,0,0,0.15);
    box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    // 检索条件
    .chart-top {
      padding-right: 18px;
      box-sizing: border-box;
    }
    // 中间部分
    .chart-middle {
      position: absolute;
      p {
        margin: 0;
        margin-top: 10px;
      }
      .money {
        margin-left: 30px;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #ffffff;
        line-height: 33px;
      }
      .company {
        margin-left: 4px;
        opacity: 0.57;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 20px;
      }
      .last-span {
        margin-left: 20px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 20px;
      }
    }
    // chart部分
    .chart-bottom {
      margin-top: 10px;
      width: 100%;
      height: 330px;
      // border: 1px solid rgb(248, 205, 205);
      overflow: hidden;
      .chart {
        width: 100%;
        height: 330px;
      }
    }
  }
</style>