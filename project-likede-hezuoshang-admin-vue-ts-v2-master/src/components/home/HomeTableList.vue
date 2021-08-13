<template>
  <div class="HomeTableList">
    <div class="search" v-if="type !== '首页'">
      <m-form :formData="formData" :columns="formColumns" ref="mform">
        <div slot="btn">
          <el-button type="danger" icon="el-icon-search" style="width: 89px;height: 40px;font-size: 14px;border-radius: 0;background: linear-gradient(145deg,#ff9090 8%, #ff5757 88%);margin-left:40px;border: none;" @click="getList('查询')">查询</el-button>
        </div>
      </m-form>
    </div>
    <div :class="{ 'clce-box': this.type !== '首页' }">
      <div class="data-list" v-if="cardLiStData.length > 0">
        <!-- 后添加的img背景图片细节得很 2021-01-08 -->
        <img v-if="type !== '首页'" src="@/assets/Index/title.png" alt="" />
        <div class="card-item" v-for="(item, index) in cardLiStData" :key="index">
          <!-- card上部分 -->
          <div class="item-top">
            <div class="date">
              <p>
                <i class="el-icon-date"></i>
                <span>{{ item.date }}</span>
              </p>
            </div>
            <div class="address">
              <p>
              {{ item.nodeName }}
            </p>
            </div>
          </div>
          <!-- card下部分 -->
          <div class="item-bottom">
            <div class="item-bottom-left">
              <p class="left-p">
                <span class="money">{{ item.orderCount }}</span>
              </p>
              <h2 class="left-h2"><span>订单数（个）</span></h2>
            </div>
            <div class="item-bottom-right">
              <p class="right-p">
                <!-- <span class="money">{{ item.totalBill }}</span> -->
                <span class="money">{{ item.totalBill ? item.totalBill / 100 : 0 }}</span>
              </p>
              <h2 class="right-h2"><span>分账金额（元）</span></h2>
            </div>
          </div>
        </div>
        <div class="pick"></div>
      </div>
      <!-- 暂无数据处理 -->
      <div v-else class="no-data">
        <div>
          <img src="@/assets/Index/no-data.png" alt="" />
          <p>没有找到您要的内容哦~</p>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="paging" v-if="type !== '首页' && cardLiStData.length > 0">
      <div class="paging-total">
        <p>共{{ pageInfo.total }}条记录<span class="total-num"></span> 第 {{ pageInfo.current }}/{{ Math.ceil(pageInfo.total / pageInfo.size) }} 页</p>
      </div>
      <div class="paging-page">
        <el-button class="prve" @click="goPrve" :disabled="pageInfo.current === 1" :class="{ 'disBtn': pageInfo.current === 1  }">上一页</el-button>
        <el-button class="next" @click="goNext" :disabled="pageInfo.current === Math.ceil(pageInfo.total / pageInfo.size)" :class="{ 'disBtn': pageInfo.current === Math.ceil(pageInfo.total / pageInfo.size)  }">下一页</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Cookies from 'js-cookie'
import { startToday } from '@/utils/formValidate'
import { CardLiStData, SearchRes, PageInfo } from '@/types/home/HomeTableList'
import { getRepostTop12Collect, getReportSearch, getReportExport } from '@/api/index.ts'

@Component
export default class HomeTableList extends Vue {
  static componentName = 'HomeTableList'
  @Prop([String]) type!: string
  
  private formData = {
    nodeName: '',
    dateArr: [ this.funDate(-6), startToday().slice(0, 10) ]
  }
  private pageInfo: PageInfo = {
    current: 1,
    total: 0,
    size: 16,
    totalPage: 0
  }
  private disPrveDiabaled = false
  private nextDisabled = false
  private getUserInfo = JSON.parse(Cookies.get('setUserInfo'))
  private cardLiStData: Array<CardLiStData> = []

  $refs!: {
    mform: HTMLFormElement;
  }

  get formColumns () {
    return [
      {
        label: '点位名称:',
        prop: 'nodeName',
        placeholder: '请输入',
        el: 'input',
        labelWidth: '80px',
        span: 6
      },
      {
        label: '选择日期:',
        prop: 'dateArr',
        el: 'date-picker',
        span: 6,
        offset: 1,
        'value-format': 'yyyy-MM-dd',
        format: 'yyyy-MM-dd',
        type: 'daterange',
        pickerOptions: {
          disabledDate(time: Date) {
            // return time.getTime() > Date.now()
            // 限定只能选择一年内的时间
            const curDate = (new Date()).getTime()
            const three = 360 * 24 * 3600 * 1000
            const threeMonths = curDate - three
            return time.getTime() > Date.now() || time.getTime() < threeMonths
          }
        },
        rules: {
          required: true,
          trigger: 'change',
          message: '请选择日期'
        }
      },
      {
        prop: 'btn',
        span: 6,
        // render: () => {
        //   return <div>
        //     <el-button type="danger" icon="el-icon-search" style="width: 89px;height: 40px;font-size: 14px;border-radius: 0;background: linear-gradient(145deg,#ff9090 8%, #ff5757 88%);margin-left:40px;border: none;" onClick={ this.getList }>查询</el-button>
        //   </div>
        // }
      },
      {
        prop: 'export',
        span: 5,
        labelPosition: 'right',
        render: () => {
          return <div style="text-align:right;margin-right:40px;">
            <el-button style="width: 90px;height: 40px;font-size: 14px;border-radius: 0;background: linear-gradient(145deg,rgba(140,140,169,1), rgba(36,39,75,1));margin-left:40px;border: none;color:#fff;" onClick={ this.exportReportList }>数据导出</el-button>
          </div>
        }
      }
    ]
  }

  created () {
    this.$nextTick(() => {
      this.getList()
    })
  }

  goPrve () {
    if (this.pageInfo.current === 1) {
      this.disPrveDiabaled = true
      return
    } else {
      this.pageInfo.current--
      this.getList()
    }
  }

  goNext () {
    if (this.pageInfo.current === Math.ceil(this.pageInfo.total / this.pageInfo.size)) {
      this.nextDisabled = true
      return
    } else {
      this.pageInfo.current++
      this.getList()
    }
  }

  getList (opt?: string) {
    // 首页展示列表的接口
    if (this.type === '首页') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getRepostTop12Collect(this.getUserInfo.userId).then((res: any) => {
        if (res && res !== null) {
            this.cardLiStData = [ ...res ]
        }
      })
    } else {
      // 首页跳转过来列表页的接口
      this.$refs.mform.validate().then((value: boolean) => {
        if (value) {
          const params = {
            pageIndex: opt === '查询' ? '1' : this.pageInfo.current,
            pageSize: this.pageInfo.size,
            start: this.formData.dateArr ? this.formData.dateArr[0] : null,
            end: this.formData.dateArr ? this.formData.dateArr[1] : null,
            nodeName: this.formData.nodeName
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getReportSearch(this.getUserInfo.userId, params).then((res: any) => {
              if (res && res !== null) {
              this.pageInfo.total = Number((res as SearchRes).totalCount)
              this.pageInfo.current = Number((res as SearchRes).pageIndex)
              this.pageInfo.totalPage = Number((res as SearchRes).totalPage)
              this.cardLiStData = [
                ...res.currentPageRecords
              ]
            }
          })
        }
      })
    }
  }

  exportReportList () {
    this.$refs.mform.validate().then((value: boolean) => {
      if (value) {
        const params = {
          nodeName: this.formData.nodeName
        }
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getReportExport(this.getUserInfo.userId, this.formData.dateArr, params).then((res: any) => {
          if (res && res !== null) {
            const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
            const elink = document.createElement('a')
            // elink.download = '对账管理报表.xls'
            elink.download = 'bill.xls'
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href)
            document.body.removeChild(elink)
          }
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
  .HomeTableList {
    width: 100%;
    .search {
      /deep/ .el-form {
        min-width: 1200px;
      }
    }
    .clce-box {
      min-height: calc(70vh - 0px);
    }
    // card部分
    .data-list {
      position: relative;
      // 拉开与检索框距离
      margin-top: 8px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      // 解决一个小的背景图片展示问题
      // padding: 17px;
      
      img {
        position: absolute;
        left: -20px;
        top: -20px;
        width: 60px;
        height: 60px;
        vertical-align: middle;
      }
      .card-item {
        z-index: 10;
        margin-bottom: 15px;
        padding-bottom: 14px;
        box-sizing: border-box;
        width: 24.4%;
        height: 120px;
        background-color: rgba(57,63,110,1);
        box-shadow: 0px 6px 16px 0px rgba(0,0,0,0.29), 0px 3px 6px -4px rgba(0,0,0,0.00);
        .item-top {
          width: 100%;
          height: 40px;
          border-bottom: 1px solid #313764;
          // border-bottom: 1px solid rgba(24, 29, 70, 1);

          border-radius: 1px;
          display: flex;
          .date {
            flex: 1;
            height: 100%;
            p {
              margin: 0;
              margin-left: 16px;
              // line-height: 40px;
              margin-top: 11px;
              i {
                color: #fff;
                width: 14px;
              }
              span {
                margin-left: 7px;
                font-size: 16px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: #ffffff;
                line-height: 22px;
              }
            }
          }
          .address {
            width: 200px;
            height: 100%;
            
            p {
              margin: 0;
              margin-right: 16px;
              line-height: 40px;
              text-align: right;
              font-size: 14px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #94a1cb;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .item-bottom {
          display: flex;
          width: 100%;
          // height: 80px;
          height: 70px;
          .item-bottom-left, .item-bottom-right {
            flex: 1;
            margin-top: 10px;
            h2 {
              margin: 0;
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #94a1cb;
              text-align: center;
            }
            .left-p {
              margin-bottom: 2px;
              .money {
                // background-image: linear-gradient(166deg,#3b447b 5%, #2e3564 36%, #191e41 98%);
                background-image: linear-gradient(166deg,rgba(182,193,255,1), rgba(102,103,238,1));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 26px;
                font-family: PingFangSC, PingFangSC-Semibold;
                font-weight: 600;
                // text-align: left;
                text-align: center;
                color: #ffffff;
                text-shadow: 0px 3px 24px 0px rgba(0,0,0,0.15); 
                position: relative;
                left: 36%;
              }
            }
            .right-p {
              margin-bottom: 2px;
              .money {
                background: linear-gradient(166deg,rgba(255,144,144,1), rgba(255,87,87,1));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 26px;
                font-family: PingFangSC, PingFangSC-Semibold;
                font-weight: 600;
                // text-align: left;
                text-align: center;
                color: #ffffff;
                text-shadow: 0px 3px 24px 0px rgba(0,0,0,0.15);
                position: relative;
                left: 36%;
              }
              
            }
            p {
              margin: 0;
              text-align: left;
            }
            .left-h2 {
              text-align: left;
              span {
                position: relative;
                left: 36%;
              }
            }
            .right-h2 {
              text-align: left;
              span {
                position: relative;
                left: 36%;
              }
            }
          }
        }
      }

      .pick {
        width: 24.4%;
        overflow: hidden;
      }

      @media (max-width:1630px) {
        .card-item {
          float: left;
          // width: 32.6%;
          width: 24.4%;
          box-sizing: border-box;
          // padding: 14px;
          padding-bottom: 14px;
          box-sizing: border-box;
          .item-bottom {
            height: 70px;
          }
          min-width: 150px;
          .item-top {
            .date {
              p {
                span {
                  font-size: 14px;
                }
              }
            }
          }
        }
        .pick {
          // width: 32.6%;
          width: 24.4%;
          overflow: hidden;
        }
      }
      @media (max-width:1366px) {
        .card-item {
          float: left;
          // width: 32.6%;
          width: 24.4%;
          box-sizing: border-box;
          // padding: 14px;
          padding-bottom: 14px;
          box-sizing: border-box;
          .item-bottom {
            height: 70px;
          }
          min-width: 150px;
          .item-top {
            .date {
              p {
                span {
                  font-size: 14px;
                }
              }
            }
          }
        }
        .pick {
          // width: 32.6%;
          width: 24.4%;
          overflow: hidden;
        }
      }
      @media (max-width:1340px) {
        .card-item {
          width: 32.6%;
          box-sizing: border-box;
          padding-bottom: 14px;
          box-sizing: border-box;
          .item-bottom {
            height: 70px;
          }
          min-width: 150px;
          .item-top {
            .date {
              p {
                span {
                  font-size: 14px;
                }
              }
            }
          }
        }
        .pick {
          width: 32.6%;
          overflow: hidden;
        }
      }
      
    }

    .data-list:after{
      content: '';
      width: 24.4%;
    }

    .no-data {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 108px;
      div {
        img {
          display: block;
          width: 160px;
          height: 126px;
          border: 1px dashed #ccc;
        }
        p {
          margin: 0;
          margin-top: 37px;
          font-size: 14px;
          font-family: SourceHanSansCN, SourceHanSansCN-Normal;
          font-weight: Normal;
          text-align: center;
          color: #ffffff;
          line-height: 21px;
        }
      }
    }


    /deep/ .el-form-item__label {
      text-align: left;
      color: #e3e6ff;
    }
    // 改变label行高
    /deep/ .el-form-item--small .el-form-item__content, /deep/ .el-form-item--small .el-form-item__label {
      line-height: 40px !important;
    }

    /deep/ .el-input--small .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
    /deep/ .el-input__inner {
      background: #313867;
      border: 1px solid #727cad99;
      border-radius: 0;
    }

    /deep/ .el-date-editor .el-range-input {
      // background: #2c3260;
      background: #313867;
    }
    // 改变日期选择器行高
    /deep/ .el-range-editor--small.el-input__inner {
      height: 40px;
    }

    // 日期选择器禁用部分背景色设置
    .el-date-table td.disabled div {
      // background-color: red;
    }

    // 分页
    .paging {
      display: flex;
      margin-top: 10px;
      .paging-total {
        flex: 1;
        p {
          opacity: 0.56;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #727cad;
          line-height: 22px;
          .total-num {
            margin-right: 10px;
          }
        }
      }
      .paging-page {
        flex: 1;
        text-align: right;
        line-height: 54px;
        .prve {
          // background: linear-gradient(126deg,rgba(140,140,169,1), rgba(36,39,75,1));
          border-color: rgba(36,39,75,1);
          color: #fff;
          margin-right: 20px;
          background: linear-gradient(126deg, #8C8CA9 0%, #24274B 100%);
          border-radius: 2px;
        }
        .next {
          // background: linear-gradient(126deg,rgba(140,140,169,1), rgba(36,39,75,1));
          background: linear-gradient(126deg, #8C8CA9 0%, #24274B 100%);
          border-color: rgba(36,39,75,1);
          color: #fff;
        }
        .disBtn {
          // background: rgba(36,39,75,0.8);
          background: rgba(36,39,75,0.6);
          color: #4D5070;
          border-radius: 2px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      }
    }

    // 日期选择器中间横线颜色
    /deep/ .el-range-editor--small .el-range-separator {
      line-height: 32px;
      color: #bec7e7;
    }
  }
</style>