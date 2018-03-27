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
        <el-select placeholder="全部" v-model.trim="searchParam.presentWay">
          <el-option :value="1" label="验证手机"></el-option>
          <el-option :value="0" label="直接购买"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>

    <TablePager :data="data" :columns="columns" :loading="loading" :pagination="pagination" @change="onChange">

      <template slot="marketWay" slot-scope="{row}">
        <span>{{row.marketWay == 0 ? '直接购买' : '手机验证'}}</span>
      </template>

    </TablePager>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { orderList } from '@/api/order';
export default {
  data() {
    return {
      loading: false,
      searchParam: {
        courseName: '',
        nick: '',
        presentWay: '',
        pageNo: 1,
        pageSize: 10
      },
      pagination: {
        total: 200,
        currentPage: 2,
        pageSize: 10
      },
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
      this.loading = true;
      let res = await orderList(this.searchParam).finally(() => {
        this.loading = false;
      });
      this.data = res.data.order;
    },
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
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
