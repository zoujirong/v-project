<template>
  <div class="app-container calendar-list-container">
    <div class='member-nav'>
      会员：
      <el-input v-model="input1" placeholder="输入课程名称查询" clearable size="small"></el-input>
      &nbsp; 最近登录时间&nbsp;
      <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <el-button type="primary">查询</el-button>&nbsp;&nbsp;
      <el-button>重置</el-button>
    </div>

    <TablePager :data="list" :pagination="pagination" :columns="columns">
      <template slot='numberId' slot-scope="{row,index}">
        <span>{{index+1}}</span>
      </template>
      <template slot="handle" slot-scope="{row}">
        <span @click="dialogTableVisible = true">【查看报名课程】</span>
      </template>
    </TablePager>

    <!-- 查看报名课程弹框 -->
    <el-dialog title="查看报名课程" :visible.sync="dialogTableVisible">
      <div>
        <el-input v-model="input3" placeholder="输入课程名称查询"></el-input>
        &nbsp;&nbsp;
        <template>
          <el-select v-model="value2" placeholder="免费报名">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary">查询</el-button>&nbsp;&nbsp;
        <el-button>重置</el-button>
      </div>
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
import { getlistUser, getApplyCourse } from '@/api/member.js';
export default {
  name: 'member',
  data() {
    return {
      listLoading: true,
      dialogTableVisible: false,
      input1: '',
      value1: '',
      value2: '',
      input3: '',
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
      pagination: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      },
      columns: [
        { title: '序号', slot: 'numberId' },
        { title: '微信昵称', key: 'nick' },
        { title: '手机号码', key: 'phoneNumber' },
        { title: '最近登录时间', key: 'logged' },
        { title: '首次登录时间', key: 'firstLogin' },
        { title: '报名课程数量', key: 'enterNumber' },
        { title: '付费课程数', key: 'palyNumber' },
        { title: '操作', slot: 'handle' }
      ],
      list: [
        {
          nick: '红领巾',
          phoneNumber: '16546451284',
          logged: '2018.01.19',
          firstLogin: '2018.01.19',
          enterNumber: '1',
          palyNumber: '1'
        }
      ],
      columns1: [
        { title: '序号', slot: 'numberId' },
        { title: '课程名称', key: 'courseName' },
        { title: '学员行为', key: 'presentWay' }
      ],
      data: [{ courseName: 'java初级班', presentWay: '免费报名' }]
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
      getlistUser().then(res => {
        this.list = res.data.user;
      });
    },

    //查看报名课程
    getUserApplyCourse() {
      getApplyCourse().then(res => {
        this.data;
      });
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
.member-nav {
  margin-bottom: 25px;
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