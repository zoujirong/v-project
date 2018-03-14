<template>
    <div class="app-container calendar-list-container">
      <div class='category-nav'>
        <el-button type="success" @click="dialogTableVisible = true">新增类目</el-button>
      </div>
      <TablePager :data="data" :pagination="pagination" :columns="columns1">
            <template slot="handle" slot-scope="{row}">
                <el-button type='text' v-if='row.handle==0' @click="dialogTableVisible1 =true">编辑课程</el-button>
                <el-button type='text' v-else @click="dialogTableVisible = true">编辑类目名称</el-button>
            </template>
            <template slot="del" slot-scope="{row}">
                <span @click="del(row)">删除</span>
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
            <div class=''>
              类目名称：<el-input v-model="input1" placeholder="课程名或课程id进行查询" clearable  size="small"></el-input>
<br><br>
            <el-button type="primary">查询</el-button>&nbsp;&nbsp;
            <el-button>重置</el-button>
            </div>
            <TablePager :data='courses' :columns="columns2"  :pagination="pagination">
              <template slot="sort" slot-scope="{row}">
                <span>
                  <el-button  v-if="row.sort == 'start'" type="text">下移 删除</el-button> 
                  <el-button  v-else-if="row.sort == 'end'" type="text">上移 删除</el-button> 
                  <el-button v-else type="text">上移 下移 删除</el-button> 
                  </span>
            </template>
            </TablePager>
        </el-dialog>
    </div>
</template>

<script>
import { fetchList } from '@/api/article'
import TablePager from '@/components/TablePager';
export default {
  name: 'category',
  data() {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogTableVisible: false,
      dialogTableVisible1: false,
      temp:{
        categoryId:'',
        categoryName: '',
        handle: '编辑课程',
        del:'删除'
      },
      input1:'',
      pagination: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      },
      columns1: [
                {title: '类目ID', key: 'categoryId'},
                {title: '类目名称', key: 'categoryName'},
                {title: '操作管理', slot: 'handle'},
                {title: '', slot: 'del'},
            ],
      data: [
          {categoryId: 1, categoryName: '推荐课程',handle:'0' },
          {categoryId: 2, categoryName: '交互设计',handle:'1'}
      ],
      columns2:[
        {title:'位置',key:'position'},
        {title:'课程id',key:'courseId'},
        {title:'课程名称',key:'courseName'},
        {title:'排序',slot:'sort'},
      ],
      courses:[
        {position:'1',courseId:'25',courseName:'设计质量',sort:'start'},
        {position:'1',courseId:'25',courseName:'设计质量',sort:''},
        {position:'2',courseId:'13',courseName:'工业设计',sort:'end'}
      ],
    }
  },
  components:{
    TablePager
  },
  filters: {
  
  },
  created() {
  },
  methods: {
    resetTemp(){
      this.temp={
        categoryId:'',
        categoryName: '',
        handle: '编辑课程',
        del:'删除'
      }
    },
    handleCreate(){
      this.resetTemp();
      this.dialogStatus = 'create',
      this.dialogTableVisible = true
      // this.$refs['dataForm'].
    },
    updateData(){
      this.data.unshift(this.temp)
      this.dialogTableVisible = false;
    },
    del(row){
      this.data.splice(0,1);
      this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
    }
  }
}
</script>

<style scoped>
.el-input{width: auto}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.category-nav{margin-bottom:15px}
</style>

