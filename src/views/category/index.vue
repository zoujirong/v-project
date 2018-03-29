<template>
  <div class="app-container calendar-list-container">
    <div class='category-nav'>
      <el-button type="success" @click="dialogTableVisible = true">新增类目</el-button>
    </div>
    <TablePager :data="list" :pagination="{currentPage:Parameter.pageNo,pageSize:Parameter.pageSize,total:total}" :columns="columns1" @change="onTableChange">
      <template slot="handle" slot-scope="{row,index}">
        <el-button @click="jump('getCategoryList',row.categoryId)" type='text' v-if='index==0'>编辑课程</el-button>
        <el-button type='text' v-else @click="editCategory(index,row)">编辑类目名称</el-button>
        &nbsp;&nbsp;&nbsp;
        <el-button type='text' @click="del(index,row.categoryId)" v-if='index!=0'>删除</el-button>
      </template>
    </TablePager>

    <!-- 新增类目弹窗 -->
    <el-dialog title="新增类目" :visible.sync="dialogTableVisible" width='35%' @close="resetForm('dataForm')" :close-on-click-modal="false">
      <el-form :rules="rules" ref='dataForm' :model="categoryParam" :inline-message="true">
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
          <el-input placeholder="" :maxlength="5" clearable size="small " v-model.trim="editName.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="hold()">保存</el-button>&nbsp;&nbsp;
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
  categoryRevise
} from '@/api/category';
import TablePager from '@/components/TablePager';
export default {
  name: 'category',
  data() {
    return {
      listLoading: true,
      list: [],
      editName: {
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
        { title: '操作管理', slot: 'handle' }
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
    jump(pageType, query) {
      this.$router.push({ name: pageType, query: { categoryId: query } });
    },
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
    getList() {
      this.listLoading = true;
      listCategory(this.Parameter).then(res => {
        this.listLoading = false;
        let { data, total } = res.data;
        this.list = data;
        this.total = total;
        this.list = this.list.sort((a, b) => {
          if (!a.isDel) return -1;
          else if (!b.isDel) return 1;
          else return 0;
        });
      });
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
      let form = this.$refs.dataForm;
      let res = await form.validate().then(res => {
        if (!res) return Promise.reject({ msg: '信息填写有误' });
        categoryAdd({ categoryName: this.categoryParam.categoryName });
        this.listLoading = false;
        this.dialogTableVisible = false;
        this.resetTemp();
        this.getList();
      });
    },
    //删除类目
    async del(index, categoryId) {
      await CategoryDel({ categoryId: categoryId });
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      });
      this.getList();
    },
    //编辑类目
    editCategory(index, row) {
      this.dialogTableVisible2 = true;
      this.editName.name = row.categoryName;
      this.reviseName = index;
      this.categoryId = row.categoryId;
    },
    //保存
    async hold() {
      let form = this.$refs.dataForm;
      let res = await form.validate().then(res => {
        if (!res) return Promise.reject({ msg: '信息填写有误' });
        this.categoryParam = {
          categoryId: this.categoryId,
          categoryName: this.editName.name
        };
        categoryRevise(this.categoryParam);
        this.getList();
        this.dialogTableVisible2 = false;
      });
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

