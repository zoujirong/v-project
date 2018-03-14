<template>
  <div class="app-container">
    <el-form inline>
      <el-form-item label="课程">
        <el-input placeholder="输入课程id或课程名称"></el-input>
      </el-form-item>
      <el-form-item label="类目">
        <el-select placeholder="选择类目" v-model="cateId">
          <el-option value="">全部</el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </el-form>
    <TablePager :data="data" :columns="columns" :pagination="pagination">
      <template slot="price" slot-scope="{row}">
        <span v-if="row.price == 0">免费</span>
        <span v-else>{{row.price}}</span>
      </template>
      <template slot="operate" slot-scope="{row}">
        <el-button type="primary" @click="recommend(row)">设为推荐</el-button>
      </template>
    </TablePager>
  </div>
</template>

<script>
import TablePager from "@/components/TablePager";
export default {
  data() {
    return {
      cateId: "",
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
    recommend(row) {
      console.log("你点击了", row);
    }
  }
};
</script>