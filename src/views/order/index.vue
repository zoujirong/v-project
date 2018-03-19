<template>
  <div class="app-container">
    <el-form inline :model="searchParam" ref="searchForm">
      <el-form-item label="课程" prop="courseParam">
        <el-input placeholder="输入课程id或课程名称" v-model="searchParam.courseParam"></el-input>
      </el-form-item>
      <el-form-item label="用户" prop="courseParam">
        <el-input placeholder="输入用户微信名" v-model="searchParam.nick"></el-input>
      </el-form-item>
      <el-form-item label="支付方式" prop="marketWay">
        <el-select placeholder="全部" v-model="searchParam.marketWay">
          <el-option value="">验证手机</el-option>
          <el-option value="">直接购买</el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
    <TablePager :data="data" :columns="columns">

      <template slot="marketWay" slot-scope="{row}">
        <span>{{row.marketWay == 0 ? '直接购买' : '手机验证'}}</span>
      </template>

    </TablePager>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { queryCourseList, updateCourseShelve } from '@/api/course';
import { orderList } from '@/api/order';
export default {
  data() {
    return {
      // loading: '',
      nick: '',
      // marketing: false,
      searchParam: {
        courseName: '',
        userNick: '',
        pageNo: 1,
        pageSize: 10
      },
      pagination: {},
      columns: [
        { title: '订单ID', key: 'orderId' },
        { title: '订单对应课程', key: 'courseName' },
        { title: '课程价格', key: 'coursePrice' },
        { title: '实际支付金额', key: 'paidAmount' },
        { title: '订单支付方式', slot: 'marketWay' },
        { title: '订单报名用户', key: 'userNick' },
        { title: '订单支付时间', key: 'payTime' }
      ],
      data: [
        {
          orderId: 123,
          courseName: '用户体验的要素',
          coursePrice: 19.81,
          paidAmount: 11.6,
          marketWay: '0',
          userNick: '江郎春雨',
          payTime: '2018.03.16'
        },
        {
          orderId: 2345,
          courseName: 'erer',
          coursePrice: 50,
          paidAmount: '0',
          marketWay: '1',
          userNick: '江郎春雨',
          payTime: '2018.03.16'
        }
      ]
    };
  },
  components: {
    TablePager
  },
  methods: {
    async getList() {
      let form = this.$refs.searchForm;
      // this.loading = true;
      await queryCourseList(this.searchParam).then(res => {
        this.data = res.data.course;
      });
    },
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      this.getList();
    },
    setMarketing() {
      this.marketing = true;
    }
    // shelve(row, index) {
    //   // this.loading = true;
    //   this.updateShelve(row, index).then(res => {
    //     this.loading = false;
    //   });
    // }
    // recommend(row, index) {
    //   console.log('你点击了', row, index);
    // }
  }
  // mounted() {
  //   this.getList();
  // }
};
</script>
<style scoped>
.op-btn .el-button {
  padding: 0;
  margin: 0;
}
.text-success {
  color: #67c23a;
}
.text-error {
  color: #f56c6c;
}
</style>
