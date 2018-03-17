<template>
  <div class="app-container calendar-list-container">

    <el-form inline class='member-nav'>
      <el-form-item label="讲师：">
        <el-input placeholder="输入老师名称" clearable size="small" v-model="seachteachName">
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button type="primary">重置</el-button>
    </el-form>
    <div class='category-nav'>
      <el-button type="success" @click="dialogTableVisible = true">新增讲师</el-button>
    </div>

    <template>
      <el-table :data="tableData3" height="250" border style="width: 100%">
        <el-table-column prop="name" label="名字">
        </el-table-column>
        <el-table-column prop="Intro" label="简介">
        </el-table-column>
        <el-table-column prop="" label="管理操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 编辑老师 -->
    <!-- <el-dialog title="编辑老师" :visible.sync="dialogTableVisible2" width='35%' ref='teacherParm'>
      讲师名称
      <el-input v-model="teacherParm.teacherName" placeholder="" clearable size="small"></el-input>
      <br><br> 讲师简介
      <el-input v-model="teacherParm.teacherIntro" type="textarea" :rows="2" placeholder="请输入内容">
      </el-input>
      <br><br> 讲师照片
      <el-upload v-model="teacherParm.teacherIcon" class="upload-demo" action="">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <br><br>
      <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
      <el-button @click="dialogTableVisible = false">返回</el-button>
    </el-dialog> -->

    <!-- 新增老师 -->
    <!-- <el-dialog title="新增讲师" :visible.sync="dialogTableVisible" width='35%' ref='teacherParm'>
      讲师名称
      <el-input v-model="teacherParm.teacherName" placeholder="" clearable size="small"></el-input>
      <br><br> 讲师简介
      <el-input v-model="teacherParm.teacherIntro" type="textarea" :rows="2" placeholder="请输入内容">
      </el-input>
      <br><br> 讲师照片
      <el-upload v-model="teacherParm.teacherIcon" class="upload-demo" action="">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <br><br>
      <el-button type="primary" @click="updateData">保存</el-button>&nbsp;&nbsp;
      <el-button @click="dialogTableVisible = false">返回</el-button>
    </el-dialog> -->
  </div>
</template>

<script>
// import { fetchList } from '@/api/article';
// import TablePager from '@/components/TablePager';
import { teacherList, teacherAdd, teacherEdit } from '@/api/teacher';

export default {
  // name: 'member',
  data() {
    return {
      seachteachName: '',
      tableData3: [
        {
          name: '王小虎',
          Intro: '上海市普陀区金沙江路 1518 弄'
        },
        {
          name: '王小虎',
          Intro: '普陀区金沙江路 1518 弄'
        }
      ]

      // dialogTableVisible: false,
      // dialogTableVisible2: false,

      // name: 'teacher',
      // reviseName: '',
      // teacherParm: {
      //   teacherName: '',
      //   teacherIntro: '',
      //   teacherIcon: ''
      // },

      // columns: [
      //   { title: '讲师名字', key: 'teacherName' },
      //   { title: '讲师简介', key: 'teacherIntro' },
      //   { title: '讲师照片', key: 'teacherIcon' },
      //   { title: '管理操作', slot: 'handle' }
      // ],
      // data: [
      //   {
      //     teacherName: '多个',
      //     teacherIntro: '多发的说法的说法大事'
      //   },
      //   {
      //     teacherName: '热情的丰富的高',
      //     teacherIntro: '共和国和认同和他人合法山东省地方'
      //   }
      // ]
    };
  },
  // components: { TablePager },
  methods: {
    //获取老师列表
    getList() {
      teacherList().then(res => {
        return (this.tableData3 = res.tableData3.teacher);
      });
    }

    //重置
    // reset() {
    //   let form = this.$refs.teacherName;
    //   this.getList();
    // }
    // resetTem() {
    //   this.teacherParm = {
    //     teacherName: '',
    //     teacherIntro: ''
    //   };
    // },
    //新增老师
    // updateData() {
    //   this.data.push(this.teacherParm);
    //   this.dialogTableVisible = false;
    // },
    // mounted() {
    //   this.getList();
    // }
    //编辑类目
    // editteac(index, name) {
    //   this.dialogTableVisible2 = true;
    //   this.name = name;
    //   this.reviseName = index;
    // },
    // handle() {
    //   this.data[this.reviseName].teacherName = this.name;
    //   this.dialogTableVisible2 = false;
    // }
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