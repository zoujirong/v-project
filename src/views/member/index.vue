<template>
  <div class="app-container calendar-list-container">
    <el-form :model="searchParam" ref="searchForm" inline>
      <el-form-item label="会员" prop="courseParam">
        <el-input v-model="searchParam.uid" placeholder="输入微信昵称或手机号码"></el-input>
      </el-form-item>
      <el-form-item label="最近登录时间" prop="loginTime">
        <el-date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="loginTime" @change="changeLoginTime">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
    <TablePager :data="list" :pagination="pagination" :columns="columns" @change="onTableChange">
      <template slot='numberId' slot-scope="{row,index}">
        <span>{{index+1}}</span>
      </template>
      <template slot="handle" slot-scope="{row}">
        <span @click="getUserApplyCourse(row)">【查看报名课程】</span>
      </template>
    </TablePager>

    <!-- 查看报名课程弹框 -->
    <el-dialog title="查看报名课程" :visible.sync="dialogTableVisible">
      <el-form inline ref="checkForm">
        <el-form-item prop="checkParam">
          <el-input v-model="checkParam.courseName" placeholder="输入课程名称查询"></el-input>
        </el-form-item>
        <el-form-item prop="options">
          <el-select placeholder="免费报名" v-model="value">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click='getUserApplyCourse()'>查询</el-button>&nbsp;&nbsp;
        <el-button @click='resetCheck'>重置</el-button>
      </el-form>
      <TablePager :data='data' :pagination="pagination" :columns="columns1">
        <template slot-scope="{row,index}" slot="numberId">
          <span>{{index+1}}</span>
        </template>
      </TablePager>
    </el-dialog>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { parseTime } from '@/filters';
import { getlistUser, getApplyCourse } from '@/api/member.js';
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
      listLoading: true,
      dialogTableVisible: false,
      loginTime: '',
      searchParam: {
        sort: '',
        nick: '',
        phone: '',
        lastLoginStartTime: '',
        lastLoginEndTime: '',
        pageNo: '',
        pageSize: ''
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
      pagination: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      },
      columns: [
        { title: '序号', slot: 'numberId' },
        { title: '微信昵称', key: 'userNick' },
        { title: '手机号码', key: 'userPhone' },
        { title: '最近登录时间', key: 'lastLoginTime', sortable: 'custom' },
        { title: '首次登录时间', key: 'firstLoginTime', sortable: 'custom' },
        { title: '报名课程数量', key: 'userApplyCourseNum' },
        { title: '付费课程数', key: 'userBuyCourseNum' },
        { title: '操作', slot: 'handle' }
      ],
      list: [
        {
          userNick: '红领巾',
          userPhone: '16546451284',
          lastLoginTime: '2018.3.20',
          firstLoginTime: '2018.3.19',
          userApplyCourseNum: '1',
          userBuyCourseNum: '1'
        },
        {
          userNick: '红领巾',
          userPhone: '16546451284',
          lastLoginTime: '2018.4.20',
          firstLoginTime: '2018.4.19',
          userApplyCourseNum: '1',
          userBuyCourseNum: '1'
        }
      ],
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
      }
    };
  },
  components: { TablePager },
  filters: {},
  created() {
    // this.getList()
  },
  methods: {
    //获取会员管理列表
    getList() {
      this.listLoading = true;
      getlistUser(this.searchParam).then(res => {
        this.listLoading = false;
        this.list = res.data.user;
      });
    },

    //查看报名课程
    getUserApplyCourse(row) {
      this.dialogTableVisible = true;
      this.listLoading = true;
      this.checkParam={
        uid: row.uid,
      }
      getApplyCourse(this.checkParam).then(res => {
        this.listLoading = false;
        this.data = res.data.course;
      });
    },
    changeLoginTime(time) {
      let [start, end] = time;
      Object.assign(this.searchParam, {
        lastLoginStartTime: parseTime(start, timeFormat),
        lastLoginEndTime: parseTime(end, timeFormat)
      });
    },
    //排序
    onTableChange({ sort = {} }) {
      let sortKey = Object.keys(sort)[0];
      console.log(sortKey);
      if (sortKey) {
        Object.assign(this.searchParam, {
          sort: sortMap[`${sortKey}-${sort[sortKey]}`]
        });
      }
      console.log(this.searchParam);
    },

    //重置会员列表
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      this.getList();
    },
    //重置查看课程列表
    resetCheck() {
      let form = this.$refs.checkForm;
      form.resetFields();
      this.getUserApplyCourse();
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