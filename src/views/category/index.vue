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
                <el-button @click="jump('getCategoryList')" type='text' v-if='index==0'>编辑课程</el-button>
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


<!-- 修改类目名称弹窗 -->
        <el-dialog title="编辑类目名称" :visible.sync="dialogTableVisible2" width='35%' ref='dataForm'>
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
import { listCategory, categoryAdd } from "@/api/category";
import TablePager from "@/components/TablePager";
export default {
  name: "category",
  data() {
    return {
      listLoading: true,
      list: [],
      name: "",
      reviseName: "",
      dialogTableVisible: false,
      dialogTableVisible2: false,
      temp: {
        categoryId: "",
        categoryName: "",
        handle: "",
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
      data: [{ categoryName: "推荐课程" }, { categoryName: "交互设计" }]
    };
  },
  components: {
    TablePager
  },
  filters: {},
  created() {
    // this.getList();
  },
  methods: {
    //  页面跳转
    jump(pageType, courseId) {
      this.$router.push({ name: pageType, params: {} });
    },
    //获取类目列表
    getList() {
      listCategory().then(res => {
        return (this.data = res.data.category);
      });
    },
    resetTemp() {
      this.temp = {
        categoryId: "",
        categoryName: ""
      };
    },
    //新增类目
    updateData() {
      // categoryAdd(this.temp.categoryName).then(res => {
        this.data.push(this.temp);
        this.dialogTableVisible = false;
        this.resetTemp();
      // });  
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
    //编辑类目
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

