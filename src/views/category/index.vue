<template>
    <div class="app-container calendar-list-container">
      <div class='category-nav'>
        <el-button type="success" @click="dialogTableVisible = true">新增类目</el-button>
      </div>
      <TablePager :data="data" :pagination="pagination" :columns="columns1">
        <template slot='categoryId' slot-scope="{row,index}">
          <span>{{index+1}}</span>
        </template>
            <template slot="handle" slot-scope="{row,index}">
                <el-button type='text' v-if='index==0' @click="dialogTableVisible1 =true">编辑课程</el-button>
                <el-button type='text' v-else @click="editCategory(index,row.categoryName)">编辑类目名称</el-button>
                &nbsp;&nbsp;&nbsp;
                <el-button  type='text' @click="del(index)" v-if='index!=0'>删除</el-button>
            </template>
      </TablePager>
       

<!-- 新增类目弹窗 -->
        <el-dialog title="新增类目" :visible.sync="dialogTableVisible" width='35%' ref='dataForm'>
            <div class=''>
              类目名称：<el-input v-model="temp.categoryName" placeholder="" clearable  size="small"></el-input>
<br><br>
              <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
            <el-button @click="dialogTableVisible = false">返回</el-button>
            </div>
        </el-dialog>

<!-- 编辑课程弹窗 -->
        <el-dialog title="编辑课程" :visible.sync="dialogTableVisible1" width='35%' ref='dataForm'>
            <div class='marginBottom'>
              类目名称：<el-input v-model="input1" placeholder="课程名或课程id进行查询" clearable  size="small"></el-input>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary">查询</el-button>&nbsp;&nbsp;
            <el-button>重置</el-button>
            </div>
            <TablePager :data='courses' :columns="columns2"  :pagination="pagination">
              <template slot='position' slot-scope='{row,index}'>
                <span>{{index+1}}</span>
              </template>
              <template slot="sort" slot-scope="{row}">
                <span>
                  <el-button  v-if="row.sort == 'start'" type="text">下移 删除</el-button> 
                  <el-button  v-else-if="row.sort == 'end'" type="text">上移 删除</el-button> 
                  <el-button v-else type="text">上移 下移 删除</el-button> 
                  </span>
              </template>
            </TablePager>
        </el-dialog>

<!-- 编辑类目名称弹窗 -->
        <el-dialog title="修改类目名称" :visible.sync="dialogTableVisible2" width='35%' ref='dataForm'>
            <div class=''>
              类目名称：<el-input v-model="name" placeholder="" clearable  size="small"></el-input>
<br><br>
              <el-button type="primary" @click="hold()">保存</el-button>&nbsp;&nbsp;
            <el-button @click="dialogTableVisible = false">返回</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { fetchList } from "@/api/article";
import TablePager from "@/components/TablePager";
export default {
  name: "category",
  data() {
    return {
      listLoading: true,
      name: "",
      reviseName: "",
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      temp: {
        categoryId: "",
        categoryName: "",
        handle: "编辑课程",
        del: "删除"
      },
      input1: "",
      pagination: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      },
      columns1: [
        { title: "类目ID", slot: "categoryId" },
        { title: "类目名称", key: "categoryName" },
        { title: "操作管理", slot: "handle" }
      ],
      data: [
        { categoryName: "推荐课程", handle: "0" },
        { categoryName: "交互设计", handle: "1" }
      ],
      columns2: [
        { title: "位置", slot: "position" },
        { title: "课程id", key: "courseId" },
        { title: "课程名称", key: "courseName" },
        { title: "排序", slot: "sort" }
      ],
      courses: [
        { courseId: "25", courseName: "设计质量", sort: "start" },
        { courseId: "25", courseName: "设计质量", sort: "" },
        { courseId: "13", courseName: "工业设计", sort: "end" }
      ]
    };
  },
  components: {
    TablePager
  },
  filters: {},
  created() {},
  methods: {
    //获取类目列表
    getList() {
      getListCategory().then(res => {});
    },
    resetTemp() {
      this.temp = {
        categoryId: "",
        categoryName: "",
        handle: "编辑课程",
        del: "删除"
      };
    },
    handleCreate() {
      this.resetTemp();
      (this.dialogStatus = "create"), (this.dialogTableVisible = true);
      // this.$refs['dataForm'].
    },
    updateData() {
      this.data.push(this.temp);
      this.dialogTableVisible = false;
    },
    del(index) {
      this.data.splice(index, 1);
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
    },
    editCategory(index, name) {
      this.dialogTableVisible2 = true;
      this.name = name;
      this.reviseName = index;
    },
    hold() {
      this.data[this.reviseName].categoryName = this.name;
      this.dialogTableVisible2 = false;
    }
  }
};
</script>

<style scoped>
.el-input {
  width: auto;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.category-nav,
.marginBottom {
  margin-bottom: 25px;
}
</style>

