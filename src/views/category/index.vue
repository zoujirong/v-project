<template>
    <div class="app-container calendar-list-container">
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
                <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="" width="150px">
                <template slot-scope="scope">
                <span>删除</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="编辑课程" width="230" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑课程</el-button>
              </template>
            </el-table-column>
        </el-table>
         <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form :rules="rules" ref="dataForm"  label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            
          </el-form>
        
        </el-dialog>
    </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'inlineEditTable',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
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
     handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
     handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

