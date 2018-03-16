<template>
  <div class="app-container">
    <el-form :model="searchParam" ref="searchForm" inline>
      <el-form-item label="学员" prop="userNick">
        <el-input v-model="searchParam.userNick" placeholder="输入学员的微信昵称"></el-input>
      </el-form-item>
      <el-form-item label="报名时间" prop="applyTime">
        <el-date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="applyTime" @change="changeApplyTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最近登录时间" prop="loginTime">
        <el-date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="loginTime" @change="changeLoginTime">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
    <table-pager :data="users" :columns="columns" :pagination="pagination" @change="onTableChange">
    </table-pager>
  </div>
</template>
<script>
import TablePager from '@/components/TablePager';
import { parseTime } from '@/filters';
const timeFormat = '{y}-{m}-{d} {h}:{i}';
const sortMap = {
  'lastLoginTime-0': 1, //降序
  'lastLoginTime-1': 2, //升序
  'courseApplyTime-0': 3, //降序
  'courseApplyTime-1': 4 //升序
};
export default {
  data() {
    return {
      applyTime: '',
      loginTime: '',
      searchParam: {
        courseId: this.$route.query.id,
        sort: 0,
        userNick: '',
        applyStartTime: '',
        applyEndTime: '',
        lastLoginStartTime: '',
        lastLoginEndTime: ''
      },
      users: [
        {
          uid: 123,
          userNick: 'livetest001',
          userPhone: '123456',
          marketWay: '1',
          lastLoginTime: 1521123175297,
          courseApplyTime: 1521123175297
        }
      ],
      pagination: {
        currentPage: 1,
        total: 400,
        pageSize: 100
      },
      columns: [
        { title: '用户ID', key: 'uid' },
        { title: '微信昵称', key: 'userNick' },
        { title: '手机号码', key: 'userPhone' },
        { title: '营销方式', key: 'marketWay' }, //0无营销，1手机验证送课
        { title: '最近登陆时间', key: 'lastLoginTime', sortable: 'custom' },
        { title: '报名时间', key: 'courseApplyTime', sortable: 'custom' },
        { title: '操作' }
      ]
    };
  },
  components: { TablePager },
  methods: {
    getList() {
      console.log(this.searchParam);
    },
    changeApplyTime(time) {
      let [start, end] = time;
      Object.assign(this.searchParam, {
        applyStartTime: parseTime(start, timeFormat),
        applyEndTime: parseTime(end, timeFormat)
      });
    },
    changeLoginTime(time) {
      let [start, end] = time;
      Object.assign(this.searchParam, {
        lastLoginStartTime: parseTime(start, timeFormat),
        lastLoginEndTime: parseTime(end, timeFormat)
      });
    },
    reset() {
      this.$refs.searchForm.resetFields();
    },
    onTableChange({ sort = {} }) {
      let sortKey = Object.keys(sort)[0];
      console.log(sortKey);
      if (sortKey) {
        Object.assign(this.searchParam, {
          sort: sortMap[`${sortKey}-${sort[sortKey]}`]
        });
      }
      console.log(this.searchParam);
    }
  },
  created() {
    this.getList();
  }
};
</script>
