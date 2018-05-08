<template>
  <div class="app-container calendar-list-container">
    <div class='category-nav'>
      <el-button type="success" @click="dialogTableVisible = true">新增类目</el-button>
    </div>
    <TablePager :data="list" :pagination="{currentPage:Parameter.pageNo,pageSize:Parameter.pageSize,total:total}" :columns="columns1" @change="onTableChange">
      <template slot="handle" slot-scope="{row,index}">
        <!-- <el-button @click="jump('getCategoryList',row.categoryId)" type='text' v-if='row.isDel==false'>编辑课程</el-button> -->
        <el-button type='text' @click="editCategory(index,row)">编辑类目名称</el-button>
        &nbsp;&nbsp;&nbsp;
        <el-button type='text' @click="del(row,index)">删除</el-button>
      </template>
    </TablePager>

    <!-- 新增类目弹窗 -->
    <el-dialog title="新增类目" :visible.sync="dialogTableVisible" width='35%' @close="resetForm('dataForm1')" :close-on-click-modal="false">
      <el-form :rules="rules" ref='dataForm1' :model="categoryParam" :inline-message="true">
        <el-form-item label="类目名称：" prop="categoryName">
          <el-input placeholder="" :maxlength="5" clearable size="small" v-model.trim="categoryParam.categoryName"></el-input>
        </el-form-item>
        <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </el-form>
    </el-dialog>

    <!-- 修改类目名称弹窗 -->
    <el-dialog title="编辑类目名称" :visible.sync="dialogTableVisible2" width='35%' :close-on-click-modal="false" @close="resetForm('dataForm')">
      <el-form ref='dataForm' :inline-message="true" :model="editName" :rules="rules1">
        <el-form-item label="类目名称：" prop="name">
          <el-input placeholder="" :maxlength="5" clearable size="small" v-model.trim="editName.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="hold">保存</el-button>&nbsp;&nbsp;
        <el-button @click="dialogTableVisible2 = false">返回</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  listCategory,
  categoryAdd,
  CategoryDel,
  categoryRevise,
  categoryRecommend,
  courseList,
  recommendCategory
} from '@/api/category';
import TablePager from '@/components/TablePager';
export default {
  name: 'category',
  data() {
    return {
      recommendNum: 0,
      // isRecommend: false,
      listLoading: true,
      list: [],
      editName: {
        categoryId: '',
        name: ''
      },
      reviseName: '',
      dialogTableVisible: false,
      dialogTableVisible2: false,
      categoryParam: {
        categoryId: '',
        categoryName: '',
        handle: '',
        del: '删除'
      },
      Parameter: {
        pageNo: 1,
        pageSize: 10
      },
      columns1: [
        { title: '类目ID', key: 'categoryId' },
        { title: '类目名称', key: 'categoryName' },
        { title: '管理操作', slot: 'handle' }
      ],
      categoryId: '',
      total: 0,
      rules: {
        categoryName: [{ required: true, message: '类目不能为空！' }]
      },
      rules1: {
        name: [{ required: true, message: '类目不能为空！' }]
      }
    };
  },
  components: {
    TablePager
  },
  filters: {},
  created() {
    this.getList();
  },
  methods: {
    //清除
    resetForm(form) {
      this.$refs[form] && this.$refs[form].resetFields();
    },
    //  页面跳转
    // jump(pageType, query) {
    //   this.$router.push({ name: pageType, query: { categoryId: query } });
    // },
    //切换分页
    onTableChange({ pagination }) {
      let {
        page: pageNo = this.Parameter.pageNo,
        pageSize: pageSize = this.Parameter.pageSize
      } = pagination;
      Object.assign(this.Parameter, {
        pageNo,
        pageSize
      });
      this.getList();
    },
    //获取类目列表
    async getList() {
      this.listLoading = true;
      // this.recommendNum = 0; //刷新清空
      let res = await listCategory(this.Parameter);
      this.listLoading = false;
      let { data, total } = res.data;
      this.list = data;
      this.total = total;
    },
    resetTemp() {
      this.categoryParam = {
        categoryId: '',
        categoryName: ''
      };
    },
    //新增类目
    async updateData() {
      this.listLoading = true;
      let form = this.$refs.dataForm1;
      let res = await form.validate();
      if (!res) return Promise.reject({ msg: '信息填写有误' });
      await categoryAdd({ categoryName: this.categoryParam.categoryName });
      this.listLoading = false;
      this.getList();
      this.resetTemp();
      this.dialogTableVisible = false;
    },
    //删除类目
    async del(index, categoryId) {
      try {
        await this.$confirm('此操作将永久删除该类目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await CategoryDel({ categoryId: categoryId });
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getList();
      } catch (res) {
        if (res !== 'cancel') throw res;
      }
    },
    //设为推荐类目
    // async setRecommend(row) {
    //   await recommendCategory({
    //     categoryId: row.categoryId,
    //     isRecommend: !row.isRecommend
    //   });
    //   this.getList();
    // },

    //编辑类目
    editCategory(index, row) {
      this.dialogTableVisible2 = true;
      this.editName.name = row.categoryName;
      this.reviseName = index;
      this.categoryId = row.categoryId;
    },
    //保存
    async hold() {
      console.log('yy');
      let form = this.$refs.dataForm;
      let res = await form.validate();
      if (!res) throw { status: -1, msg: '信息填写有误' };
      this.editName = {
        categoryId: this.categoryId,
        categoryName: this.editName.name
      };
      let ret = await categoryRevise(this.editName);
      this.getList();
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

