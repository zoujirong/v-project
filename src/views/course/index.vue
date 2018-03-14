<template>
  <div class="app-container">
    <el-form inline :model="searchParam" ref="searchForm">
      <el-form-item label="课程" prop="courseId">
        <el-input placeholder="输入课程id或课程名称" v-model="searchParam.courseId"></el-input>
      </el-form-item>
      <el-form-item label="类目" prop="cateId">
        <el-select placeholder="选择类目" v-model="searchParam.cateId">
          <el-option value="">全部</el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
    <router-link :to="{name: 'addCourse'}">
      <el-button type="primary">发布课程</el-button>
    </router-link>
    <TablePager :data="data" :columns="columns" :pagination="pagination">
      <template slot="price" slot-scope="{row}">
        <span v-if="row.price == 0">免费</span>
        <span v-else>{{row.price}}</span>
      </template>
      <template slot="operate" slot-scope="{row, index}">
        <div class="op-btn">
          <el-button type="text" @click="recommend(row, index)">【编辑课程】</el-button>
          <el-button type="text" @click="recommend(row)">【编辑课时】</el-button>
          <el-button type="text" @click="recommend(row)">【设置营销方式】</el-button>
          <el-button type="text" @click="recommend(row)">【课程下架】</el-button>
          <el-button type="text" @click="recommend(row)">【管理学员】</el-button>
          <el-button type="text" @click="recommend(row)">【设为推荐】</el-button>
        </div>
      </template>
    </TablePager>
  </div>
</template>

<script>
import TablePager from "@/components/TablePager";
export default {
  data() {
    return {
      searchParam: {
        courseId: "",
        cateId: ""
      },
      pagination: {
        currentPage: 1,
        total: 400,
        pageSize: 100
      },
      columns: [
        { title: "课程ID", key: "courseId" },
        { title: "课程名称", key: "title" },
        { title: "课程类目", key: "cateName" },
        { title: "课程类型", key: "type" },
        { title: "课程状态", key: "status" },
        { title: "主讲老师", key: "teacher" },
        { title: "课程价格", slot: "price" },
        { title: "学员数量", key: "stuNum" },
        { title: "管理操作", slot: "operate" }
      ],
      data: [
        {
          courseId: 123,
          title: "你好",
          cateName: "语言留学",
          type: "直播课",
          status: "上架中",
          teacher: "livetest006",
          price: 0,
          stuNum: 200
        },
        {
          courseId: 222,
          title: "你好",
          cateName: "语言留学",
          type: "直播课",
          status: "上架中",
          teacher: "livetest006",
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
    getList() {
      let form = this.$refs.searchForm;
      console.log(this.searchParam);
    },
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      this.getList();
    },
    recommend(row, index) {
      console.log("你点击了", row, index);
    }
  }
};
</script>
<style scoped>
.op-btn .el-button {
  padding: 0;
  margin: 0;
}
</style>
