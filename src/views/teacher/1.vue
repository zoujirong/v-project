<template>
    <div>
        <el-input type="primary" style="width:240px" placeholder="请输入讲师名字"></el-input>
        <el-button>搜索
        </el-button>

        <el-table border style="width: 100%">
            <el-table-column label="姓名" prop="name" width="180">
            </el-table-column>
            <el-table-column label="日期" prop="date" width="180">
            </el-table-column>
            <el-table-column label="地址" prop="address" width="180">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>