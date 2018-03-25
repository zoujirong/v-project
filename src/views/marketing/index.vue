<template>
  <div class="app-container">
    <router-link v-for="el in list" :key="el.id" :to="{ name: 'marketlists',params:{id:el.marketWayId}}" class="el-button el-button--primary el-button--medium">{{el.marketWayName}}</router-link>
  </div>
</template>
<script>
import { getMarketWay } from '@/api/market.js';
export default {
  data() {
    return {
      page: {
        pageNo: 1,
        pageSize: 10
      },
      list: ''
    };
  },
  methods: {
    getWay() {
      getMarketWay(this.page).then(res => {
        this.list = res.data.data;
      });
    }
  },
  mounted() {
    this.getWay();
  }
};
</script>
<style>

</style>





