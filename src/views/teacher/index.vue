<template>
  <div class="app-container calendar-list-container">
    <div class='member-nav'>
      讲师：
      <el-input v-model="input1" placeholder="输入课程名称查询" clearable size="small"></el-input>

      <el-button type="primary">查询</el-button>&nbsp;&nbsp;
      <el-button>重置</el-button>
    </div>
    <!-- 新增讲师 -->
    <div class='category-nav'>
      <el-button type="success" @click="dialogTableVisible = true">新增讲师</el-button>
    </div>
    <TablePager :data="list" :pagination="pagination" :columns="columns">
      <template slot="handle" slot-scope="{row}">
        <span @click="dialogTableVisible2 = true">编辑老师</span>
      </template>
    </TablePager>

    <!-- 编辑老师 -->
    <el-dialog title="编辑老师" :visible.sync="dialogTableVisible2" width='35%' ref='dataForm'>
      <div class=''>
        讲师名称
        <el-input v-model="temp.teacherName" placeholder="" clearable size="small"></el-input>
        <br><br> 讲师简介
        <el-input v-model="temp.teacherIntro" type="textarea" :rows="2" placeholder="请输入内容">
        </el-input>
        <br><br> 讲师照片
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <br><br>
        <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
        <el-button @click="dialogTableVisible2 = false">返回</el-button>
      </div>
    </el-dialog>

    <!-- 新增老师 -->
    <el-dialog title="新增讲师" :visible.sync="dialogTableVisible" width='35%' ref='dataForm'>
      <div class=''>
        讲师名称
        <el-input v-model="temp.teacherName" placeholder="" clearable size="small"></el-input>
        <br><br> 讲师简介
        <el-input v-model="temp.teacherIntro" type="textarea" :rows="2" placeholder="请输入内容">
        </el-input>
        <br><br> 讲师照片
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <br><br>
        <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/article';
import TablePager from '@/components/TablePager';
import UploadImage from '@/components/UploadImage';
export default {
  name: 'member',
  data() {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogTableVisible: false,
      dialogTableVisible2: false,
      input1: '',
      pagination: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      },
      temp: {
        teacherName: '',
        teacherIntro: '',
        teachName: ''
      },
      columns: [
        { title: '讲师名字', key: 'teacherName' },
        { title: '讲师简介', key: 'teacherIntro' },
        { title: '管理操作', slot: 'handle' }
      ],
      list: [
        {
          name: '红领巾',
          brief: '165非法人娃儿分为爱人wear46451284'
        }
      ]
    };
  },
  components: { TablePager },
  methods: {
    updateData() {
      // this.data.push(this.temp);
      this.dialogTableVisible = false;
      this.dialogTableVisible2 = false;
    }
  }
};
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
.el-input {
  width: auto;
}
.member-nav {
  margin-bottom: 25px;
}
.el-dialog__wrapper .el-dialog__header {
  background: #409eff;
}
.el-dialog__wrapper .el-dialog__title {
  color: #fff;
}
.el-dialog__wrapper .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.category-nav,
.marginBottom {
  margin-bottom: 20px;
}
</style>