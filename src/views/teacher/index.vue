<template>
  <div class="app-container calendar-list-container">
    <div class='member-nav'>
      讲师：
      <el-input v-model="seachteachName" placeholder="输入老师名称" clearable size="small">
      </el-input>
      <el-button type="primary" v-model="seachteachName">查询</el-button>
      <el-button type="primary">重置</el-button>
    </div>
    <div class='category-nav'>
      <el-button type="success" @click="dialogTableVisible = true">新增讲师</el-button>
    </div>
    <TablePager :data="data" :columns="columns">
      <template slot="handle" slot-scope="{row}">
        <span @click="dialogTableVisible2 = true">编辑老师</span>
      </template>
    </TablePager>

    <!-- 编辑老师 -->
    <!-- <el-dialog title="编辑老师" :visible.sync="dialogTableVisible2" width='35%' ref='dataForm'>
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
    </el-dialog> -->

    <!-- 新增老师 -->
    <el-dialog title="新增讲师" :visible.sync="dialogTableVisible" width='35%' ref='dataForm'>
      讲师名称
      <el-input v-model="data.teacherName" placeholder="" clearable size="small"></el-input>
      <br><br> 讲师简介
      <el-input v-model="data.teacherIntro" type="textarea" :rows="2" placeholder="请输入内容">
      </el-input>
      <br><br> 讲师照片
      <el-upload v-model="data.teacherIcon" class="upload-demo" action="">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <br><br>
      <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
      <el-button @click="dialogTableVisible = false">返回</el-button>
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
      dialogTableVisible: false,
      // dialogTableVisible2: false,
      seachteachName: '',
      // pagination: {
      //   currentPage: 1,
      //   total: 100,
      //   pageSize: 10
      // },
      columns: [
        { title: '讲师名字', key: 'teacherName' },
        { title: '讲师简介', key: 'teacherIntro' },
        // { title: '讲师照片', key: 'teacherIcon' },
        { title: '管理操作', slot: 'handle' }
      ],
      data: [
        {
          teacherName: 'tarrrr',
          teacherIntro: 'fdadsfjodashfodashfoiahdof dasfdasf'
        },
        {
          teacherName: 'tarrrr',
          teacherIntro: 'fdadsfjodashfodashfoiahdof dasfdasf'
        }
      ]
    };
  },
  components: { TablePager },
  methods: {
    updateData() {
      // this.data.push(this.data);
      this.dialogTableVisible = false;
      //   this.dialogTableVisible2 = false;
    }
  },
  //通过计算属性过滤数据
  computed: {
    list: function() {}
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