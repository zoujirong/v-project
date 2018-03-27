<template>
  <div class="app-container calendar-list-container">
    <el-form inline>
      <el-form-item label="讲师：">
        <el-input placeholder="输入老师名称" :maxlength="10" ref="teacherName" prop="teacherName" clearable size="small" v-model.trim="pagination.teacherName">
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="getteacherList">查询</el-button>
      <el-button @click="resetList">重置</el-button>
    </el-form>
    <div class='category-nav'>
      <el-button type="success" @click="dialogTableVisible = true">新增讲师</el-button>
    </div>
    <TablePager :data="data" :columns="columns" :loading="loading" :pagination="{currentPage: pagination.pageNo,
      pageSize: pagination.pageSize,
      total: total}" @change="onChange">
      <template slot="operation" slot-scope="{row, index}">
        <el-button type="text" @click="editTeacher(row,index)">编辑</el-button>
      </template>
    </TablePager>

    <!-- 新增老师 -->
    <el-dialog title="新增讲师" width='35%' :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item label="讲师名称：">
          <el-input placeholder=" " :maxlength="10" clearable size="small " v-model.trim="editPopup.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介：">
          <el-input type="textarea" width="100" :maxlength="50" placeholder="请输入内容 " v-model.trim="editPopup.teacherIntro">
          </el-input>
        </el-form-item>
        <el-form-item label="讲师照片：">
          <UploadImage class="upload-demo " size="small" :limit="1" :fileList="editPopup.teacherIcon ? [{url: editPopup.teacherIcon}] : []" @onSuccess="onUploadIcon" type="primary "></UploadImage>
          <div slot="tip " class="el-upload__tip ">只能上传jpg/png文件，且不超过500kb</div>
        </el-form-item>
        <el-button type="primary " @click="updateTeach">保存</el-button>&nbsp;&nbsp;
        <el-button @click="dialogTableVisible= false">返回</el-button>
      </el-form>
    </el-dialog>

    <!-- 编辑老师 -->
    <el-dialog title="编辑讲师" width='35%' :visible.sync="dialogTableVisible2">
      <el-form action="" ref='dataForm' @close="resetForm('dataForm')" :model="Parameter1">
        <el-form-item prop='teacherName' label="讲师名称：">
          <el-input placeholder="请输入老师姓名" :maxlength="10" clearable size="small " v-model.trim="Parameter1.teacherName"></el-input>
        </el-form-item>
        <el-form-item prop='teacherIntro' label="讲师简介:">
          <el-input type="textarea " width="100" :maxlength="50" placeholder="请输入内容 " v-model.trim="Parameter1.teacherIntro">
          </el-input>
        </el-form-item>
        <el-form-item label="讲师照片:">
          <upload-image class="upload-demo " size="small" :limit="1" :fileList="Parameter1.teacherIcon ? [{url: Parameter1.teacherIcon}] : []" @onSuccess="onUploadIcon1" type="primary "></upload-image>
          <div slot="tip " class="el-upload__tip ">只能上传jpg/png文件，且不超过500kb</div>
        </el-form-item>
        <el-button type="primary " @click="hold">保存</el-button>&nbsp;&nbsp;
        <el-button @click="dialogTableVisible2= false">返回</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import { teacherList, teacherAdd, teacherEdit } from '@/api/teacher';
import UploadImage from '@/components/UploadImage';
import utils from '@/utils/index.js';
export default {
  data() {
    return {
      loading: false,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      textarea: '',
      pagination: {
        teacherName: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      newIndex: '',
      TeacherIntro: '',
      columns: [
        { title: '讲师姓名', key: 'teacherName' },
        { title: '讲师简介', key: 'teacherIntro' },
        { title: '管理操作', slot: 'operation' }
      ],
      data: [],
      editPopup: {
        teacherName: '',
        teacherIntro: '',
        teacherIcon: ''
      },
      Parameter1: {
        // teacherId: '',
        teacherName: '',
        teacherIntro: '',
        teacherIcon: ''
      },
      Parameter: {
        teacherId: '',
        teacherName: '',
        teacherIntro: '',
        teacherIcon: ''
      }
    };
  },
  components: { TablePager, UploadImage },

  methods: {
    async getteacherList() {
      this.loading = true;
      // let res = await teacherList({ teacherName: this.teacherName });
      let res = await teacherList(this.pagination)
        .then(res => {
          let { data, total } = res.data;
          this.data = data;
          this.total = total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetList() {
      this.pagination.teacherName = '';
      this.getteacherList();
    },
    resetForm(form) {
      this.$refs.form.resetField();
    },
    reset() {
      (this.editPopup = {
        teacherName: '',
        teacherIntro: '',
        teacherIcon: ''
      }),
        this.getteacherList();
    },
    success(response, file, fileList) {
      console.log(response, file, fileList);
    },
    //新增保存
    async updateTeach() {
      this.Parameter = {
        teacher: this.editPopup.teacher,
        teacherName: this.editPopup.teacherName,
        teacherIntro: this.editPopup.teacherIntro,
        teacherIcon: this.editPopup.teacherIcon
      };
      await teacherAdd(this.Parameter);
      this.dialogTableVisible = false;
      this.getteacherList();
      this.reset();
    },
    //编辑老师
    editTeacher(row, index) {
      console.log(row);
      this.dialogTableVisible2 = true;
      this.newIndex = index;
      this.Parameter1 = {
        teacherId: row.teacherId,
        teacherName: row.teacherName,
        teacherIntro: row.teacherIntro,
        teacherIcon: row.teacherIcon
      };
    },
    //编辑保存
    async hold() {
      Object.assign(this.Parameter, this.Parameter1);
      // console.log(this.Parameter);
      await teacherEdit(this.Parameter);
      this.dialogTableVisible2 = false;
      this.getteacherList();
    },
    //监听新增图片上传
    onUploadIcon(urls) {
      // console.log('老师头像', urls);
      this.editPopup.teacherIcon = urls[0] || '';
    },
    //监听编辑新增图片上传
    onUploadIcon1(urls) {
      // console.log('老师头像', urls);
      this.Parameter1.teacherIcon = urls[0] || '';
    },
    onChange({ pagination }) {
      let {
        page: pageNo = this.pagination.pageNo,
        pageSize = this.pagination.pageSize
      } = pagination;
      Object.assign(this.pagination, {
        pageNo,
        pageSize
      });
      this.getteacherList();
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
.el-textarea {
  width: 60%;
}
</style>