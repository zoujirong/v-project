<template>
    <div class="app-container">
        <router-link :to="{ name: 'marketlists'}" class="el-button el-button--primary el-button--medium">验证手机赠送课程</router-link>
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
        this.list = res.data.marketWay;
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





