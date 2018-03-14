<template>
  <div class="app-container">
    <el-form inline>

      <el-form-item label="讲师">
        <el-input placeholder="输入老师姓名" v-model="message"> </el-input>
      </el-form-item>

      <el-button type="primary" v-on:click="search">查询</el-button>

      <el-button v-on:click="reset">重置</el-button>

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
      // search: "", //设置一个空字符串
      message: 1,
      pagination: {
        currentPage: 1,
        total: 400,
        pageSize: 100
      },
      columns: [
        { title: "讲师姓名", key: "title" },
        { title: "讲师简介", key: "brief" },
        { title: "管理操作", slot: "operate" }
      ],
      data: [
        { title: "你好", brief: "语言留学" },
        { title: "你好", brief: "语言留学" }
      ]
    };
  },
  components: {
    TablePager
  },
  methods: {
    recommend(row) {
      console.log("你点击了", row);
    },
    search: function() {
      // this.message = 2;
      console.log("成功查询");
    },
    reset: function() {
      // this.message = 0;
      console.log("重置成功");
    }
  }
};
</script>