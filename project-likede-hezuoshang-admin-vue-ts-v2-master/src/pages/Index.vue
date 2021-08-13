<template>
  <div class="home-index">
    <!-- 上边部分 -->
    <div class="home-top">
      <!-- 左边部分 -->
      <HomeCard />
      <!-- 右边echarts部分 -->
      <HomeChart />
    </div>
    <!-- 下边列表部分 -->
    <div class="home-bottom">
      <!-- card列表部分 -->
      <!-- 后增加的card阴影部分 -->
      <div class="card-show">
        <!-- title信息部分 -->
        <TableListTitle style='margin-top:14px;' />
        <HomeTableList type="首页" />
      </div>
      
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import HomeCard from '@/components/home/HomeCard.vue'
import HomeChart from '@/components/home/HomeChart.vue'
import HomeTableList from '@/components/home/HomeTableList.vue'
import TableListTitle from '@/components/home/TableListTitle.vue'

@Component({
  components: {
    HomeCard,
    HomeChart,
    TableListTitle,
    HomeTableList
  }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
  .home-index {
    width: 100%;
    height: 100%;
    // 上边部分
    .home-top {
      margin-top: 28px;
      margin-bottom: 20px;
      width: 100%;
      height: 376px;
      // 距离左右窗口距离为25
      padding: 0 25px;
      box-sizing: border-box;
      display: flex;
    }
    // 下边部分
    .home-bottom {
      padding: 0 25px;
      // width: 100%;
      // height: 510px;
      // box-sizing: border-box;
      // border: 1px solid red;
      .card-show {
        width: 100%;
        // height: 480px;
        min-height: 480px;
        padding: 0 22px 42px 22px;
        margin-bottom: 20px;
        box-sizing: border-box;
        // height: 100%;
        background: linear-gradient(174deg,rgba(59,68,123,1), rgba(46,53,100,1), rgba(25,30,65,1));
        box-shadow: 0px 3px 24px 0px rgba(0,0,0,0.15);
      }
    }
  }
</style>