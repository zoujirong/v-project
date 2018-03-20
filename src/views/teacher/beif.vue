<template>
    <div class="app-container calendar-list-container">
        <el-form inline>
            <el-form-item label="讲师：">
                <el-input placeholder="输入老师名称" ref="teacherName" prop="teacherName" clearable size="small" v-model="teacherName">
                </el-input>
            </el-form-item>
            <el-button type="primary" @click="getteacherList">查询</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form>
        <div class='category-nav'>
            <el-button type="success" @click="dialogTableVisible = true">新增讲师</el-button>
        </div>
        <TablePager :data="data" :columns="columns" :loading="loading">
            <template slot="operation" slot-scope="{row, index}">
                <el-button type="text" @click="editTeacher(row,index)">编辑</el-button>
            </template>
        </TablePager>

        <!-- 新增老师 -->
        <el-dialog title="新增讲师" width='35%' :visible.sync="dialogTableVisible">
            讲师名称
            <el-input placeholder=" " clearable size="small " v-model="editPopup.teacherName"></el-input>
            <br><br> 讲师简介
            <el-input type="textarea" :rows="2" placeholder="请输入内容 " v-model="editPopup.teacherIntro">
            </el-input>
            <br><br> 讲师照片
            <upload-image class="upload-demo " size="small" :limit="1" :fileList="editPopup.teacherIcon ? [{url: editPopup.teacherIcon}] : []" @onSuccess="onUploadCover" type="primary "></upload-image>
            <div slot="tip " class="el-upload__tip ">只能上传jpg/png文件，且不超过500kb</div>

            <br><br>
            <el-button type="primary " @click="updateTeach">保存</el-button>&nbsp;&nbsp;
            <el-button @click="dialogTableVisible= false">返回</el-button>
        </el-dialog>

        <!-- 编辑老师 -->
        <el-dialog title="编辑讲师" width='35%' :visible.sync="dialogTableVisible2">
            讲师名称
            <el-input placeholder="请输入老师姓名" clearable size="small " v-model="editPopup.teacherName"></el-input>
            <br><br> 讲师简介
            <el-input type="textarea " :rows="2" placeholder="请输入内容 " v-model="editPopup.teacherIntro">
            </el-input>

            <br><br> 讲师照片
            <upload-image class="upload-demo " size="small" :limit="1" :fileList="editPopup.teacherIcon ? [{url: editPopup.teacherIcon}] : []" @onSuccess="onUploadCover" type="primary "></upload-image>
            <div slot="tip " class="el-upload__tip ">只能上传jpg/png文件，且不超过500kb</div>

            <br><br>
            <el-button type="primary " @click="hold">保存</el-button>&nbsp;&nbsp;
            <el-button @click="dialogTableVisible2= false">返回</el-button>
        </el-dialog>
    </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { teacherList, teacherAdd, teacherEdit } from '@/api/teacher';
import UploadImage from '@/components/UploadImage';
export default {
  // name: 'member',
  data() {
    return {
      loading: false,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      textarea: '',
      teacherName: '',
      editPopup: {
        teacherName: '',
        teacherIntro: '',
        teacherIcon: ''
      },
      teacherParm: '',
      newIndex: '',
      Name: '',
      TeacherIntro: '',
      columns: [
        { title: '讲师姓名', key: 'teacherName' },
        { title: '讲师简介', key: 'teacherIntro' },
        { title: '管理操作', slot: 'operation' }
      ],
      data: [
        {
          teacherName: '王小虎',
          teacherIntro: '上海市普陀区金沙江路 1518 弄'
        },
        {
          teacherName: '22222',
          teacherIntro: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    };
  },
  components: { TablePager, UploadImage },

  methods: {
    async getteacherList() {
      this.loading = true;
      let res = await teacherList({ teacherName: this.teacherName }).finally(
        () => {
          this.loading = false;
        }
      );
      this.data = res.data.teacher;
    },
    reset() {
      this.teacherName = '';
      this.getteacherList();
    },
    //新增
    updateTeach() {
      this.data.push(this.editPopup);
      this.dialogTableVisible = false;
      this.reset();
    },
    //编辑老师
    editTeacher(row, index) {
      this.dialogTableVisible2 = true;
      this.newIndex = index;
      this.editPopup = {
        teacherName: row.teacherName,
        teacherIntro: row.teacherIntro
      };
    },
    hold() {
      Object.assign(this.data[this.newIndex], this.editPopup);
      this.dialogTableVisible2 = false;
      // this.reset();
    },
    onUploadCover(urls) {
      console.log('上传封面', urls);
      this.editPopup.teacherIcon = urls[0];
    }
  },
  created() {
    this.getteacherList();
  }
};
</script>

<style scoped>
.el-input {
  width: auto;
}
.category-nav {
  margin-bottom: 20px;
}
</style>