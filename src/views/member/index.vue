<template>
    <div class="app-container calendar-list-container">
        <div class='member-nav'>
            会员：<el-input v-model="input1" placeholder="输入课程名称查询" clearable  size="small"></el-input>
            &nbsp;
            最近登录时间&nbsp;
            <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                

            <el-button type="primary">查询</el-button>&nbsp;&nbsp;
            <el-button>重置</el-button>
        </div>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="120px">
                <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column width="220px" align="center" label="微信昵称">
                <template slot-scope="scope">
                <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
        
            <el-table-column align="center" label="手机号码" width="200px">
                <template slot-scope="scope">
                <span>编辑课程</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="最近登录时间" width="" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                
              </template>
            </el-table-column>
             <el-table-column align="center" label="首次登录时间" width="" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                
              </template>
            </el-table-column>
             <el-table-column align="center" label="报名课程数量" width="" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                
              </template>
            </el-table-column>
             <el-table-column align="center" label="付费课程数" width="" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                
              </template>
            </el-table-column>
             <el-table-column align="center" label="操作" width="" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" @click="dialogTableVisible = true">【查看报名课程】</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-dialog title="查看报名课程" :visible.sync="dialogTableVisible">
            <el-table >
                <el-table-column property="date" label="序号" width="150">
                    <template slot-scope="scope">
                    <span>{{}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="name" label="课程名称" width="200">
                    <template slot-scope="scope">
                    <span>{{}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="address" label="学员行为">
                    <template slot-scope="scope">
                    <span>{{}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'member',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
     dialogTableVisible: false,
        input1:'',
        value1:'',
        input3:''
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
.el-input{width: auto}
.member-nav{margin-bottom: 15px}
</style>