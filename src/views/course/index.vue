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
      <template slot="price" slot-scope="{row}">
        <span v-if="row.price == 0">免费</span>
        <span v-else>{{row.price}}</span>
      </template>
      <template slot="operate" slot-scope="{row, index}">
        <div class="op-btn">
          <router-link :to="{name: 'addCourse', params: {id: row.courseId}}">
            <el-button type="text">【编辑课程】</el-button>
          </router-link>
          <el-button type="text" @click="recommend(row)">【编辑课时】</el-button>
          <el-button type="text" @click="setMarketing(row)" v-if="row.coursePrice!=0">【设置营销方式】</el-button>
          <el-button type="text" @click="recommend(row)">【课程下架】</el-button>
          <el-button type="text" @click="recommend(row)">【管理学员】</el-button>
          <el-button type="text" @click="recommend(row)">【设为推荐】</el-button>
        </div>
      </template>
    </TablePager>

    <el-dialog title="设置营销方式" width="500px" :close-on-click-modal="false" :visible.sync="marketing">
      <el-table bordered>
        <el-table-column label="选择"></el-table-column>
        <el-table-column label="选择">营销方式名称</el-table-column>
      </el-table>
      <div slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { queryCourseList } from '@/api/course';
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
        { title: '课程名称', key: 'title' },
        { title: '课程类目', key: 'cateName' },
        { title: '课程类型', key: 'type' },
        { title: '课程状态', key: 'status' },
        { title: '主讲老师', key: 'teacher' },
        { title: '课程价格', slot: 'price' },
        { title: '学员数量', key: 'stuNum' },
        { title: '管理操作', slot: 'operate' }
      ],
      data: [
        {
          courseId: 123,
          title: '你好',
          cateName: '语言留学',
          type: '直播课',
          status: '上架中',
          teacher: 'livetest006',
          price: 0,
          stuNum: 200
        },
        {
          courseId: 222,
          title: '你好',
          cateName: '语言留学',
          type: '直播课',
          status: '上架中',
          teacher: 'livetest006',
          price: 123,
          stuNum: 200
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
</style>
