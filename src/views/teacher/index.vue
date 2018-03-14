<template>
  <div class="teacher-m">
    <el-form class="teach-form" inline>
      <el-form-item label="讲师">
        <el-input placeholder="请输入讲师名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增讲师按钮 -->
    <el-button class="teach-new" type="primary">新增讲师</el-button>
    <!-- 表格 -->
    <el-table :data="tableData3" height="250" border style="width: 100%">
      <el-table-column prop="name" label="讲师姓名" width="100">
      </el-table-column>
      <el-table-column prop="brief" label="讲师简介">
      </el-table-column>
      <el-table-column prop="operation" label="管理操作" width="180">
        <el-button @click="dialogFormVisible = true">编辑讲师</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { fetchList } from "@/api/article";
export default {
  name: "teacher",
  data() {
    return {
      tableData3: [
        {
          name: "王小虎",
          brief:
            "是一个和很牛逼哄哄的讲师，跟他学习准没错。这是一个和很牛逼哄哄的讲师，跟他学习准",
          operation: "编辑讲师"
        },
        {
          name: "王小虎",
          brief:
            "是一个和很牛逼哄哄的讲师，跟他学习准没错。这是一个和很牛逼哄哄的讲师，跟他学习准",
          operation: "编辑讲师"
        }
      ],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  }
};
</script>



<style scoped>
.fixed-width .el-button--mini {
  width: 72px;
}
.teacher-m {
  margin: 15px;
}
.teach-form {
  background: #eee;
  height: 58px;
  padding: 10px 0 0 10px;
}
.teach-new {
  margin: 15px 0;
}
</style>
