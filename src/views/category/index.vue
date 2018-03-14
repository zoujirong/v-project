<template>
    <div class="app-container calendar-list-container">
      <div class='category-nav'>
        <el-button type="success" @click="dialogTableVisible = true">新增类目</el-button>
      </div>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="类目ID" width="150px">
                <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column width="260px" align="center" label="类目名称">
                <template slot-scope="scope">
                <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作管理" width="260px">
                <template slot-scope="scope">
                <span>编辑课程</span>
                </template>
                <template slot-scope="scope">
                <span>删除</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="编辑课程" width="" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="" @click="handleUpdate(scope.row)">编辑课程</el-button>
              </template>
            </el-table-column>

        </el-table>

<!-- 新增类目弹窗 -->
        <el-dialog title="新增类目" :visible.sync="dialogTableVisible" width='35%' ref='dataForm'>
            <div class=''>
              类目名称：<el-input v-model="input1" placeholder="输入课程名称查询" clearable  size="small"></el-input>
<br><br>
              <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
            <el-button @click="dialogTableVisible = false">返回</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'category',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogTableVisible: false,
      temp:{},
      input1:''

    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html

          v.originalTitle = v.title //  will be used when user click the cancel botton

          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    resetTemp(){
      this.temp ={}
    },
    handleCreate(){
      this.resetTemp()

    },
    updateData(){
      this.$refs['dataForm'].validate((valid) =>{
        if(valid){
          
        }
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

