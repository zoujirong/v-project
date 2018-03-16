<template>
  <div class="app-container calendar-list-container">
    <div class='marginButton'>
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
      <div class="marginButton">
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
        { title: '微信昵称', key: 'userNick' },
        { title: '手机号码', key: 'userPhone' },
        { title: '最近登录时间', key: 'lastLoginTime' },
        { title: '首次登录时间', key: 'firstLoginTime' },
        { title: '报名课程数量', key: 'userApplyCourseNum' },
        { title: '付费课程数', key: 'userBuyCourseNum' },
        { title: '操作', slot: 'handle' }
      ],
      list: [
        {
          userNick: '红领巾',
          userPhone: '16546451284',
          lastLoginTime: '2018.3.19',
          firstLoginTime: '2018.3.19',
          userApplyCourseNum: '1',
          userBuyCourseNum: '1'
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
.marginButton {
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