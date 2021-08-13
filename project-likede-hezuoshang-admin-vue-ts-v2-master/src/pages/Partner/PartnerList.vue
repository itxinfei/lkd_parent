<template>
  <div class="partner-list">
    <HomeTableList />
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import HomeTableList from '@/components/home/HomeTableList.vue'

@Component({
  components: {
    HomeTableList
  }
})
export default class PartnerList extends Vue {

}
</script>

<style lang="scss" scoped>
  .partner-list {
    padding: 0 25px;
    margin-top: 28px;
    // height: 800px;
  }
</style>