<template>
  <div class="app-container">
    <el-form inline :model="searchParam" ref="searchForm">
      <el-form-item label="课程" prop="courseParam">
        <el-input placeholder="输入课程id或课程名称" v-model.trim="searchParam.courseParam"></el-input>
      </el-form-item>
      <el-form-item label="用户" prop="nick">
        <el-input placeholder="输入用户微信名" v-model.trim="searchParam.nick"></el-input>
      </el-form-item>
      <el-form-item label="支付方式" prop="presentWay">
        <el-select placeholder="支付方式" v-model.trim="searchParam.presentWay">
          <el-option value="" label="全部"></el-option>
          <el-option :value="1" label="验证手机"></el-option>
          <el-option :value="0" label="直接购买"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>

    <TablePager :data="data" :columns="columns" :loading="loading" :pagination="{currentPage: searchParam.pageNo,
      pageSize: searchParam.pageSize,
      total: total}" @change="onChange ">
      <template slot='payTime' slot-scope="{row}">
        <span>{{ row.payTime | parseTime(showTimeFormat)}}</span>
      </template>
      <template slot="payType" slot-scope="{row} ">
        <!--    row.marketWay-->
        <span>{{row.payType == 0 ? '直接购买' : '手机验证'}}</span>
      </template>

    </TablePager>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { orderList } from '@/api/order';
import parseTime from '@/utils/index.js';
export default {
  data() {
    return {
      payTime: '',
      loading: false,
      showTimeFormat: '{y}-{m}-{d} {h}:{i}',
      searchParam: {
        courseName: '',
        nick: '',
        presentWay: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      columns: [
        { title: '订单ID', key: 'orderId' },
        { title: '订单对应课程', key: 'courseName' },
        { title: '课程价格', key: 'coursePrice' },
        { title: '实际支付金额', key: 'paidAmount' },
        { title: '订单支付方式', slot: 'payType' },
        { title: '订单报名用户', key: 'userNick' },
        { title: '订单支付时间', slot: 'payTime' }
      ],
      data: [],
      timePay: []
    };
  },
  components: {
    TablePager
  },
  methods: {
    async getList() {
      this.loading = true;
      let res = await orderList(this.searchParam)
        .then(res => {
          let { data, total } = res.data;
          this.data = data;
          this.total = total;
        })
        .finally(() => {
          this.loading = false;
        });
      // this.data = res.data.order;
    },

    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      Object.assign(this.searchParam, {
        pageNo: 1,
        pageSize: 10
      });
      this.getList();
    },
    onChange({ pagination }) {
      let {
        page = this.searchParam.pageNo,
        pageSize = this.searchParam.pageSize
      } = pagination;
      Object.assign(this.searchParam, {
        pageNo: page,
        pageSize
      });
      this.getList();
    }
  },
  created() {
    this.getList();
  }
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
