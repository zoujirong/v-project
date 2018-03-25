<template>
  <div class="app-container">
    <el-form :inline="true" :model="courseSearch" ref='courseSearch' class="demo-form-inline" label-width="80px">
      <span class="course">课程</span>
      <el-form-item prop='courseParam'>
        <el-input placeholder="输入课程id或课程名称" v-model.trim="courseSearch.courseParam" clearable></el-input>
      </el-form-item>
      <el-button type="primary" class="check" @click="getList">查询</el-button>
      <el-button @click="resetForm('courseSearch')">重置</el-button>
    </el-form>
    <!-- 表格部分 -->
    <template v-if="tableData">
      <TablePager :data="tableData" :columns="columns" :pagination="pagination" :loading=loading>
        <template slot="number" slot-scope="{row,index}">
          <span>{{index+1}}</span>
        </template>
        <template slot="operate" slot-scope="{row,index}">
          <el-button type="text" size="small" @click="cancel(index)">【取消赠送】</el-button>
        </template>
      </TablePager>
    </template>
  </div>

</template>
<script>
import TablePager from '@/components/TablePager';
import { getListMarketCourse, getCancelCourseMarketWay } from '@/api/market.js';
export default {
  data() {
    return {
      courseSearch: {
        courseParam: '',
        pageNo: 1,
        pageSize: 10,
        marketingWay: ''
      },
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
        // { courseName: '产品入门到猝死1', courseId: 260, coursePrice: 250 }
      ]
    };
  },
  computed: {
    marketingId() {
      return this.$route.params.id;
    }
  },
  components: {
    TablePager
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },
    async getList() {
      this.loading = true;
      this.courseSearch.marketingWay = this.marketingId;
      getListMarketCourse(this.courseSearch)
        .then(res => {
          this.loading = false;
          this.tableData = res.data.data;
        })
        .catch(res => {
          this.loading = false;
          console.log(res);
        });
    },
    cancel(index) {
      let cancelId = this.tableData[index].courseId;
      let mark = this.tableData[index].marketWay;
      this.$confirm('确认取消课程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          getCancelCourseMarketWay({ courseId: cancelId, marketingWay: mark })
            .then(res => {
              this.getList();
              this.$message({
                type: 'success',
                message: '取消成功!'
              });
            })
            .catch(res => {
              this.loading = false;
              console.log(res);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消失败'
          });
        });
    }
  },
  mounted() {
    this.getList();
    console.log(this.marketingId);
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

