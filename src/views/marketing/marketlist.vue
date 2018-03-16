<template>
  <div class="app-container">
    <el-form :inline="true" :model="course" class="demo-form-inline" label-width="80px">
      <span class="course">课程</span>
      <el-form-item>
        <el-input placeholder="输入课程id或课程名称" v-model="course" clearable></el-input>
      </el-form-item>
      <el-button type="primary" class="check" @click="queryCourse">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form>
    <!-- 表格部分 -->
    <template>
      <TablePager :data="tableData" :columns="columns" :pagination="pagination" :loading=loading>
        <template slot="number" slot-scope="{row,index}">
          <span>{{index+1}}</span>
        </template>
        <template slot="operate" slot-scope="{row}">
          <el-button type="text" size="small">【取消赠送】</el-button>
        </template>
      </TablePager>
    </template>
  </div>

</template>
<script>
import TablePager from '@/components/TablePager';
import { getListMarketCourse, getCancelCourseMarketWay } from '@/api/banner.js';
export default {
  data() {
    return {
      course: '',
      loading: false,
      pagination: {
        currentPage: 1,
        total: 400,
        pageSize: 100
      },
      columns: [
        { title: '序号', slot: 'number' },
        { title: '课程名称', key: 'courseName' },
        { title: '课程id', key: 'courseId' },
        { title: '课程价格', key: 'coursePrice' },
        { title: '操作', slot: 'operate' }
      ],
      tableData: [
        { courseName: '产品入门到猝死1', courseId: 260, coursePrice: 250 }
      ]
    };
  },
  components: {
    TablePager
  },
  methods: {
    queryCourse() {
      getListMarketCourse({ courseId: this.course, courseName: this.course })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    resetForm() {
      this.course.id = '';
      this.getList();
    },
    getList() {
      getListMarketCourse()
        .then(res => {
          this.tableData = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    cancel(index) {
      let cancelId = this.tableData[index].courseId;
      let mark = this.tableData[index].marketWay;
      getCancelCourseMarketWay({ courseId: cancelId, marketWay: mark })
        .then(res => {
          this.getList();
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  mounted() {
    // this.getList();
  }
};
</script>
<style>
.phone {
  margin-bottom: 30px;
}
.el-table th.is-leaf,
.el-table tr {
  text-align: center;
}
.course {
  padding-right: 20px;
  font-weight: 700;
  font-size: 14px;
  color: #606266;
}
.check {
  margin-left: 30px;
}
</style>

