<template>
  <div class="app-container calendar-list-container">
    <div class='category-nav'>
      <el-button type="success" @click="dialogTableVisible = true">新增类目</el-button>
    </div>
    <TablePager :data="list" :pagination="{currentPage:this.pagination1.pageNo,pageSize:this.pagination1.pageNo,total:total}" :columns="columns1" @change="onTableChange">
      <template slot="handle" slot-scope="{row,index}">
        <el-button @click="jump('getCategoryList',row.categoryId)" type='text' v-if='index==0'>编辑课程</el-button>
        <el-button type='text' v-else @click="editCategory(index,row)">编辑类目名称</el-button>
        &nbsp;&nbsp;&nbsp;
        <el-button type='text' @click="del(index,row.categoryId)" v-if='index!=0'>删除</el-button>
      </template>
    </TablePager>

    <!-- 新增类目弹窗 -->
    <el-dialog title="新增类目" :visible.sync="dialogTableVisible" width='35%' ref='dataForm'>
      <div class=''>
        类目名称：
        <el-input v-model="categoryParam.categoryName" placeholder="" clearable size="small"></el-input>
        <br><br>
        <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>

    <!-- 修改类目名称弹窗 -->
    <el-dialog title="编辑类目名称" :visible.sync="dialogTableVisible2" width='35%' ref='dataForm'>
      <div class=''>
        类目名称：
        <el-input v-model="name" placeholder="" clearable size="small"></el-input>
        <br><br>
        <el-button type="primary" @click="hold()">保存</el-button>&nbsp;&nbsp;
        <el-button @click="dialogTableVisible2 = false">返回</el-button>
      </div>
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
      name: '',
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
      pagination1: {
        currentPage: 1,
        pageSize: 10
      },
      columns1: [
        { title: '类目ID', key: 'categoryId' },
        { title: '类目名称', key: 'categoryName' },
        { title: '操作管理', slot: 'handle' }
      ],
      categoryId: '',
      total: 0
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
    //  页面跳转
    jump(pageType, query) {
      this.$router.push({ name: pageType, query: { categoryId: query } });
    },
    //切换分页
    onTableChange({ pagination }) {
      let {
        page: pageNo = this.Parameter.pageNo,
        pageSize = this.Parameter.pageSize
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
      await categoryAdd({ categoryName: this.categoryParam.categoryName }).then(
        res => {
          this.listLoading = false;
          this.dialogTableVisible = false;
          this.resetTemp();
        }
      );
      this.getList();
    },
    //删除类目
    del(index, categoryId) {
      CategoryDel({ categoryId: categoryId }).then(res => {
        this.getList();
      });
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      });
    },
    //编辑类目
    editCategory(index, row) {
      this.dialogTableVisible2 = true;
      this.name = row.categoryName;
      this.reviseName = index;
      this.categoryId = row.categoryId;
    },
    //保存
    hold() {
      this.categoryParam = {
        categoryId: this.categoryId,
        categoryName: this.name
      };
      categoryRevise(this.categoryParam).then(res => {
        this.getList();
      });
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

