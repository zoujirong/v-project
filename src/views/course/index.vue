<template>
  <div class="app-container">
    <el-form inline :model="searchParam" ref="searchForm">
      <el-form-item label="课程" prop="courseParam">
        <el-input placeholder="输入课程id或课程名称" v-model="searchParam.courseParam"></el-input>
      </el-form-item>
      <el-form-item label="类目" prop="categoryId">
        <el-select placeholder="选择类目" v-model="searchParam.categoryId">
          <el-option value="">全部</el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
    <router-link :to="{name: 'addCourse'}">
      <el-button type="primary">发布课程</el-button>
    </router-link>
    <TablePager :loading="loading" :data="data" :columns="columns" :pagination="pagination">
      <template slot="teachingMethod" slot-scope="{row}">
        <span>{{row.teachingMethod == 0 ? '直播课' : '录播'}}</span>
      </template>
      <template slot="unshelve" slot-scope="{row}">
        <span>{{row.unshelve == 0 ? '下架' : '上架'}}</span>
      </template>
      <template slot="coursePrice" slot-scope="{row}">
        <span class="text-success" v-if="row.coursePrice == 0">免费</span>
        <span class="text-error" v-else>￥{{row.coursePrice}}</span>
      </template>
      <template slot="operate" slot-scope="{row, index}">
        <div class="op-btn">
          <router-link :to="{name: 'addCourse', params: {id: row.courseId}}">
            <el-button type="text">【编辑课程】</el-button>
          </router-link>
          <el-button type="text" @click="recommend(row)">【编辑课时】</el-button>
          <el-button type="text" @click="setMarketing(row)" v-if="row.coursePrice!=0">【设置营销方式】</el-button>
          <el-button type="text" @click="shelve(row, index)" v-if="row.unshelve == 0">【课程上架】</el-button>
          <el-button type="text" @click="unShelve(row, index)" v-else>【课程下架】</el-button>
          <el-button type="text" @click="recommend(row)">【管理学员】</el-button>
          <el-button type="text" @click="recommend(row)">【设为推荐】</el-button>
        </div>
      </template>
    </TablePager>

    <!-- 设置营销方式 -->
    <el-dialog title="设置营销方式" width="500px" :close-on-click-modal="false" :visible.sync="marketing">
      <el-table border>
        <el-table-column label="选择"></el-table-column>
        <el-table-column label="选择">营销方式名称</el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="marketing=false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { queryCourseList, updateCourseShelve } from '@/api/course';
export default {
  data() {
    return {
      marketing: false,
      loading: true,
      searchParam: {
        courseParam: '',
        categoryId: '',
        pageNo: 1,
        pageSize: 10
      },
      pagination: {
        currentPage: 1,
        total: 400,
        pageSize: 100
      },
      columns: [
        { title: '课程ID', key: 'courseId' },
        { title: '课程名称', key: 'courseName' },
        { title: '课程类目', key: 'categoryName' },
        { title: '课程类型', slot: 'teachingMethod' },
        { title: '课程状态', slot: 'unshelve' },
        { title: '主讲老师', key: 'mainTeacher' },
        { title: '课程价格', slot: 'coursePrice' },
        { title: '学员数量', key: 'courseApplyNum' },
        { title: '管理操作', slot: 'operate' }
      ],
      data: [
        {
          courseId: 123,
          courseName: '你好',
          categoryName: '语言留学',
          teachingMethod: '0',
          unshelve: '0',
          mainTeacher: 'livetest006',
          coursePrice: 0,
          courseApplyNum: 200
        },
        {
          courseId: 222,
          courseName: '你好',
          categoryName: '语言留学',
          teachingMethod: '1',
          unshelve: '1',
          mainTeacher: 'livetest006',
          coursePrice: 123,
          courseApplyNum: 200
        }
      ]
    };
  },
  components: {
    TablePager
  },
  methods: {
    async getList() {
      let form = this.$refs.searchForm;
      this.loading = true;
      await queryCourseList(this.searchParam)
        .then(res => {
          this.data = res.data.course;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      this.getList();
    },
    setMarketing() {
      this.marketing = true;
    },
    shelve(row, index) {
      this.loading = true;
      this.updateShelve(row, index).then(res => {
        this.loading = false;
      });
    },
    //下架
    async unShelve(row, index) {
      let { courseId, unshelve } = row;
      await this.$confirm('您确定要下架该课程吗？', '温馨提示', {
        type: 'info',
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            this.updateShelve(row, index).then(res => {
              instance.confirmButtonLoading = false;
              //状态改变了说明请求成功了，可以关闭弹窗
              unshelve !== row.unshelve && done();
            });
          } else {
            done();
          }
        }
      }).catch(res => {
        //不是主动点取消的，是确认过程中出错了
        if (res !== 'cancel') throw res;
      });
    },
    //上下架请求
    async updateShelve(row, index) {
      let { courseId, unshelve } = row;
      let newStatus = +!+unshelve;
      await updateCourseShelve({
        courseId,
        unshelve: newStatus
      }).then(res => {
        this.data[index].unshelve = newStatus;
      });
    },
    recommend(row, index) {
      console.log('你点击了', row, index);
    }
  },
  mounted() {
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
