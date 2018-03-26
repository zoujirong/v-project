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
    <table-pager :data="users" :loading="loading" :columns="columns" :pagination="{
        currentPage: searchParam.pageNo,
        total: total,
        pageSize: searchParam.pageSize
      }" @change="onTableChange">
      <template slot="lastLoginTime" slot-scope="{row}">
        <span>{{row.lastLoginTime | parseTime(showTimeFormat)}}</span>
      </template>
      <template slot="courseApplyTime" slot-scope="{row}">
        <span>{{row.courseApplyTime | parseTime(showTimeFormat)}}</span>
      </template>
      <template slot="operate" slot-scope="{row}">
        <el-button type="text" @click="showApply(row)">【查看报名课程】</el-button>
      </template>
    </table-pager>

    <CheckApplyCourse :userId="choosedUserId" :visible="apply" @close="onDialogClose"></CheckApplyCourse>
  </div>
</template>
<script>
import TablePager from '@/components/TablePager';
import CheckApplyCourse from '@/views/member/checkApplyCourse';
import { parseTime } from '@/filters';
import { getCourseStudent } from '@/api/course';
const sortMap = {
  'lastLoginTime-0': 1, //降序
  'lastLoginTime-1': 2, //升序
  'courseApplyTime-0': 3, //降序
  'courseApplyTime-1': 4 //升序
};
export default {
  data() {
    return {
      showTimeFormat: '{y}-{m}-{d} {h}:{i}',
      actualTimeFormat: '{y}-{m}-{d} {h}:{i}:{s}',
      applyTime: '',
      loginTime: '',
      loading: false,
      apply: false,
      choosedUserId: '',
      searchParam: {
        courseId: this.$route.query.id,
        sort: 0,
        userNick: '',
        applyStartTime: '',
        applyEndTime: '',
        lastLoginStartTime: '',
        lastLoginEndTime: '',
        pageNo: 1,
        pageSize: 10
      },
      users: [],
      total: 0,
      columns: [
        { title: '用户ID', key: 'uid' },
        { title: '微信昵称', key: 'userNick' },
        { title: '手机号码', key: 'userPhone' },
        { title: '营销方式', key: 'marketWay' }, //0无营销，1手机验证送课
        {
          title: '最近登陆时间',
          key: 'lastLoginTime',
          slot: 'lastLoginTime',
          sortable: 'custom'
        },
        {
          title: '报名时间',
          key: 'courseApplyTime',
          slot: 'courseApplyTime',
          sortable: 'custom'
        },
        { title: '操作', slot: 'operate' }
      ]
    };
  },
  components: { TablePager, CheckApplyCourse },
  filters: { parseTime },
  methods: {
    async getList() {
      this.loading = true;
      await getCourseStudent(this.searchParam)
        .then(res => {
          let { data, total } = res.data;
          this.users = data;
          this.total = total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changeApplyTime(time) {
      let timeFormat = this.actualTimeFormat;
      let [start, end] = time;
      Object.assign(this.searchParam, {
        applyStartTime: parseTime(start, timeFormat),
        applyEndTime: parseTime(end, timeFormat)
      });
    },
    changeLoginTime(time) {
      let timeFormat = this.actualTimeFormat;
      let [start, end] = time;
      Object.assign(this.searchParam, {
        lastLoginStartTime: parseTime(start, timeFormat),
        lastLoginEndTime: parseTime(end, timeFormat)
      });
    },
    reset() {
      this.$refs.searchForm.resetFields();
      this.resetTime();
      this.getList();
    },
    resetTime() {
      this.applyTime = [];
      this.loginTime = [];
      Object.assign(this.searchParam, {
        applyStartTime: '',
        applyEndTime: '',
        lastLoginStartTime: '',
        lastLoginEndTime: ''
      });
    },
    onTableChange({ sort = {} }) {
      let sortKey = Object.keys(sort)[0];
      if (sortKey) {
        Object.assign(this.searchParam, {
          sort: sortMap[`${sortKey}-${sort[sortKey]}`]
        });
      }
      console.log(this.searchParam);
      this.getList();
    },
    showApply(row) {
      this.choosedUserId = row.uid;
      this.apply = true;
    },
    onDialogClose() {
      this.apply = false;
    }
  },
  created() {
    this.getList();
  }
};
</script>
