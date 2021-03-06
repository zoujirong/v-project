<template>
  <div class="app-container calendar-list-container">
    <el-form :model="searchParam" ref="searchForm" inline>
      <el-form-item label="会员" prop="userParam">
        <el-input v-model.trim="searchParam.userParam" placeholder="输入微信昵称或手机号码"></el-input>
      </el-form-item>
      <el-form-item label="最近登录时间" prop="loginTime">
        <el-date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="loginTime" @change="changeLoginTime">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
    <TablePager :data="list" :pagination="{currentPage:searchParam.pageNo,pageSize:searchParam.pageSize,total:total}" :columns="columns" @change="onTableChange">
      <template slot='numberId' slot-scope="{row,index}">
        <span>{{index+1}}</span>
      </template>
      <template slot="lastLoginTime" slot-scope="{row,index}">
        <span>{{row.lastLoginTime | parseTime(showTimeFormat)}}</span>
      </template>
      <template slot="firstLoginTime" slot-scope="{row,index}">
        <span>{{row.firstLoginTime | parseTime(showTimeFormat)}}</span>
      </template>
      <template slot="handle" slot-scope="{row}">
        <el-button type="text" @click="getUserApplyCourse(row)">【查看报名课程】</el-button>
      </template>
    </TablePager>
    <CheckCourse :userId='checkMumber' :visible='dialogTableVisible' @close='CheckCourseStatus'></CheckCourse>

  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { parseTime } from '@/filters';
import { getlistUser, getApplyCourse } from '@/api/member.js';
import CheckCourse from './checkApplyCourse';
const sortMap = {
  'lastLoginTime-0': 1, //降序
  'lastLoginTime-1': 2, //升序
  'firstLoginTime-0': 3, //降序
  'firstLoginTime-1': 4 //升序
};
export default {
  name: 'member',
  data() {
    return {
      checkMumber: '',
      listLoading: true,
      dialogTableVisible: false,
      showTimeFormat: '{y}-{m}-{d} {h}:{i}',
      actualTimeFormat: '{y}-{m}-{d} {h}:{i}:{s}',
      loginTime: '',
      searchParam: {
        sort: 0,
        userParam: '',
        lastLoginStartTime: '',
        lastLoginEndTime: '',
        pageNo: 1,
        pageSize: 10
      },
      options: [
        {
          value: '选项1',
          label: '免费报名'
        },
        {
          value: '选项2',
          label: '购买'
        },
        {
          value: '选项3',
          label: '验证购买'
        }
      ],
      value: '',
      columns: [
        { title: '序号', slot: 'numberId' },
        { title: '微信昵称', key: 'userNick' },
        { title: '手机号码', key: 'userPhone' },
        {
          title: '最近登录时间',
          slot: 'lastLoginTime',
          sortable: 'custom',
          key: 'lastLoginTime'
        },
        {
          title: '首次登录时间',
          slot: 'firstLoginTime',
          sortable: 'custom',
          key: 'firstLoginTime'
        },
        { title: '免费课程数量', key: 'userApplyCourseNum' },
        { title: '付费课程数量', key: 'userBuyCourseNum' },
        { title: '操作', slot: 'handle' }
      ],
      list: [],
      columns1: [
        { title: '序号', slot: 'numberId' },
        { title: '课程名称', key: 'courseName' },
        { title: '学员行为', key: 'presentWay' }
      ],
      data: [{ courseName: 'java初级班', presentWay: '免费报名' }],

      //查看报名课程
      checkParam: {
        uid: '',
        courseName: '',
        presentWay: '',
        pageNo: '',
        pageSize: ''
      },
      total: 0
    };
  },
  components: { TablePager, CheckCourse },
  filters: {},
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    //获取会员管理列表
    async getList() {
      this.listLoading = true;
      let res = await getlistUser({ ...this.searchParam });

      this.listLoading = false;
      let { data, total } = res.data;
      this.list = data;
      this.total = total;
    },

    //查看报名课程
    async getUserApplyCourse(row) {
      this.dialogTableVisible = true;
      this.listLoading = true;
      this.checkMumber = row.uid;
      this.checkParam = {
        uid: row.uid
      };
      let res = await getApplyCourse(this.checkParam);
      this.listLoading = false;
      this.data = res.data.data;
    },
    //组件监听的回调函数
    changeLoginTime(time) {
      let timeFormat = this.actualTimeFormat;
      //time是一个数组，用户选择的最近登录时间段
      let [start, end] = time;
      Object.assign(this.searchParam, {
        lastLoginStartTime: parseTime(start, timeFormat),
        lastLoginEndTime: parseTime(end, timeFormat)
      });
    },
    //排序 //切换分页
    onTableChange({ sort = {}, pagination = {} }) {
      let {
        page: pageNo = this.searchParam.pageNo,
        pageSize: pageSize = this.searchParam.pageSize
      } = pagination;
      Object.assign(this.searchParam, {
        pageNo,
        pageSize
      });
      let sortKey = Object.keys(sort)[0];
      if (sortKey) {
        Object.assign(this.searchParam, {
          sort: sortMap[`${sortKey}-${sort[sortKey]}`]
        });
      }
      this.getList();
    },
    CheckCourseStatus(val) {
      this.dialogTableVisible = val;
    },
    //重置会员列表
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      this.loginTime = [];
      Object.assign(this.searchParam, {
        lastLoginStartTime: '',
        lastLoginEndTime: '',
        pageNo: 1,
        pageSize: 10
      });
      this.getList();
    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.el-input {
  width: auto;
}
.el-dialog__wrapper .el-dialog__header {
  background: #409eff;
}
.el-dialog__wrapper .el-dialog__title {
  color: #fff;
}
.el-dialog__wrapper .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
</style>