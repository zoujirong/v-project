<template>
<div class="app-container">
    <el-form  :inline="true" :model="course" class="demo-form-inline">
        <el-form-item label="课程">
            <el-input placeholder="输入课程id或课程名称" v-model="course.id"></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
    </el-form>
    <!-- 表格部分 -->
    <template>
        <TablePager :data="tableData" :columns="columns" :pagination="pagination">
            <template slot="operate" slot-scope="{row}">
                <el-button type="text" size="small">【取消赠送】</el-button>
            </template>
        </TablePager>
    </template>   
</div>
   
</template>
<script>
import TablePager from '@/components/TablePager';
export default {
    data() {
      return {
        course: {
          id: ''
        },
        pagination: {
            currentPage: 1,
            total: 400,
            pageSize: 100
        },
        columns: [
            {title: '序号', key: 'index'},
            {title: '课程名称', key: 'title'},
            {title: '课程id', key: 'courseId'},
            {title: '课程价格', key: 'price'},
            {title: '操作', slot: 'operate'}
        ],
        tableData:[
            {index:1,title:'产品入门到猝死1',courseId:260,price:250}
        ]
      }
    },
    components: {
        TablePager
    },
    methods:{
        resetForm() {
           this.course.id = ""
        }
    }
}
</script>
<style>
    .phone{margin-bottom: 30px}
    .el-table th.is-leaf,.el-table tr{text-align: center}
</style>

