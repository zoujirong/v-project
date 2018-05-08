<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form class="demo-form-inline">
      <el-form-item class="el-input_inner" :model="seachTeach">
        <el-input placeholder="输入讲师名" v-model="seachTeach.teacherName"></el-input>
      </el-form-item>
      <el-button type="primary" class="seach" @click="getListData">查询</el-button>
      <el-button type="primary" class="seach" @click="emptySearch">重置</el-button>
    </el-form>
    <!-- 新增讲师按钮 -->
    <el-form class="demo-form-inline">
      <el-form-item class="el-input_inner">
        <el-button type="primary" class="green" @click="newteacher">新增老师</el-button>
      </el-form-item>
    </el-form>

    <TablePager :data="data" :columns="columns" :loading="loading" :pagination="{currentPage: seachTeach.pageNo,
      pageSize: seachTeach.pageSize,
      total: total}" @change="onChange">
      <template slot="operation" slot-scope="{row, index}">
        <el-button type="text" @click="editteach(index)">编辑</el-button>
      </template>
    </TablePager>

    <!-- 新增讲师 编辑讲师  弹窗 -->
    <el-dialog :visible.sync="addTeacher" @close="resetForm('teacherDetail')" :close-on-click-modal="false">
      <el-form ref='teacherDetail' :model="teacher" :rules="rules" class="demo-dynamic">
        <el-form-item label="讲师名称：" :show-message="true" prop="teacherName">
          <el-input :maxlength='10' placeholder="输入讲师名" v-model.trim="teacher.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介：" prop="teacherIntro">
          <el-input type="textarea" :maxlength='300' :minlength='10' placeholder="讲师简介" v-model.trim="teacher.teacherIntro"></el-input>
        </el-form-item>
        <el-form-item size="small" label="讲师照片：" prop="teacherIcon">
          <upload-image :limit=1 :fileList="teacher.teacherIcon ? [{url:teacher.teacherIcon}]: []" @onSuccess="onUploadCover"></upload-image>
        </el-form-item>
        <div class="dialog-button">
          <el-button type="primary" @click="addTeacher = false">返回</el-button>
          <el-button type="primary" @click="submit('teacherDetail')">确定</el-button>
        </div>
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
      data: [],
      addTeacher: false,
      loading: false,
      seachTeach: {
        teacherName: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      teacher: {
        teacherName: '',
        teacherIntro: '',
        teacherIcon: ''
      },
      columns: [
        { title: '讲师姓名', key: 'teacherName' },
        { title: '讲师简介', key: 'teacherIntro' },
        { title: '管理操作', slot: 'operation' }
      ],
      rules: {
        teacherName: [{ required: true, message: '老师名称不能为空！' }],
        teacherIntro: [{ required: true, message: '老师简介不能为空！' }],
        teacherIcon: [{ required: true, message: '老师头像不能为空!' }]
      },
      dialogtype: 1
    };
  },
  components: { TablePager, UploadImage },

  methods: {
    //获取列表数据
    async getListData() {
      this.loading = true;
      let res = await teacherList(this.seachTeach)
        .then(res => {
          let { data, total } = res.data;
          this.data = data;
          this.total = total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //新增或编辑时- 弹窗信息
    async submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let addtype =
            this.type == 1
              ? teacherAdd(this.teacher)
              : teacherEdit(this.teacher);
          addtype
            .then(res => {
              if (this.type == 1) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                });
              }
              this.getListData();
              this.addTeacher = false;
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        } else {
          return false;
        }
      });
    },
    //新增老师保存
    newteacher() {
      this.type = 1;
      this.addTeacher = true;
    },
    //搜索重置
    emptySearch() {
      this.seachTeach.teacherName = '';
      this.getListData();
      this.seachTeach.pageNo = 1;
    },
    //清除表单错误提示
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    //老师照片上传
    onUploadCover(urls) {
      //   console.log('上传封面', urls);
      this.teacher.teacherIcon = urls[0] || '';
      this.$refs.teacherDetail.validateField('teacherIcon'); //upload-image 图片错误提示清除
    },
    //编辑讲师保存
    editteach(index) {
      // console.log(index);
      this.type = 2;
      this.addTeacher = true;
      this.$nextTick(() => {
        this.teacher = { ...this.data[index] };
      });
    },

    //监听新增图片上传
    onUploadIcon(urls) {
      // console.log('老师头像', urls);
      this.editPopup.teacherIcon = urls[0] || '';
      // this.updateTeach();
    },
    //监听编辑新增图片上传
    onUploadIcon1(urls) {
      // console.log('老师头像', urls);
      this.Parameter1.teacherIcon = urls[0] || '';
    },
    onChange({ pagination }) {
      let {
        page: pageNo = this.seachTeach.pageNo,
        pageSize = this.seachTeach.pageSize
      } = pagination;
      Object.assign(this.seachTeach, {
        pageNo,
        pageSize
      });
      this.getListData();
    }
  },

  created() {
    this.getListData();
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
.el-input_inner {
  width: auto;
  margin-right: 15px;
  display: inline-block;
}
.dialog-button {
  text-align: right;
}
.demo-dynamic {
  /* width: ; */
}
</style>