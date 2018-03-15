<template>
  <div class="app-container">
    <div class="btn-top">
      <button class="el-button el-button--primary el-button--medium" @click="addShow=true">新增推荐位</button>
    </div>
    <!-- 表格部分 -->
    <template>
      <TablePager :data="tableData" :columns="columns" :pagination="pagination">
        <template slot='number' type='index' slot-scope="{row,index}">
          <span>{{index+1}}</span>
        </template>
        <template slot="operate" slot-scope="{row,index}">
          <el-button type="text" size="small" @click="editBanner(index)">编辑</el-button>
          <el-button type="text" size="small" @click="up(index, tableData)" v-show="index != 0">上移</el-button>
          <el-button type="text" size="small" @click="down(index, tableData)" v-show="(index != tableData.length-1) || index == 0">下移</el-button>
          <el-button @click.native.prevent="deleteRow(index, tableData)" type="text" size="small"> 删除 </el-button>
        </template>
      </TablePager>
    </template>
    <!-- 弹窗部分 -->
    <el-dialog :visible.sync="addShow" width="30%" center @close="resetForm('banner')">
      <div class="bannerform">
        <el-form :model="banner" :rules="rules" ref="banner" label-width="100px" class="demo-ruleForm">
          <el-form-item label="推荐位名称" prop='bannerTitle'>
            <el-input v-model="banner.bannerTitle"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :limit='1' :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="对应跳转的课程id" prop='courseId'>
            <el-input v-model.number="banner.courseId"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop='startTime'>
            <el-date-picker v-model="banner.startTime" type="datetime" placeholder="选择日期" :picker-options="pickr"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop='endTime'>
            <el-date-picker v-model="banner.endTime" type="datetime" placeholder="选择日期" :picker-options="pickr"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('banner')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TablePager from "@/components/TablePager";
import http from "@/api/banner.js";
export default {
  data() {
    return {
      addShow: false,
      authorization: "",
      banner: {
        bannerTitle: "",
        bannerCover: "",
        courseId: "",
        startTime: "",
        endTime: ""
      },
      creatDate: new Date(),
      amendDate: "",
      pagination: {
        currentPage: 1,
        total: 400,
        pageSize: 100
      },
      columns: [
        { title: "序号", slot: "number" },
        { title: "推荐位名称", key: "bannerTitle" },
        { title: "图片", key: "bannerCover" },
        { title: "课程id", key: "courseId" },
        { title: "课程名称", key: "courseName" },
        { title: "开始时间", key: "startTime" },
        { title: "结束时间", key: "endTime" },
        { title: "创建时间", key: "createTime" },
        { title: "修改时间", key: "modifiedTime" },
        { title: "操作", slot: "operate" }
      ],
      pickr: {
        disabledDate(time) {
          return Date.now() > time.getTime();
        }
      },
      fileList2: [],
      tableData: [
        {
          bannerTitle: "hahahaha",
          bannerCover: "",
          courseId: "45",
          startTime: "2018.2.03",
          endTime: "2018.2.03"
        },
        {
          bannerTitle: "34444",
          bannerCover: "",
          courseId: "45",
          startTime: "2018.2.03",
          endTime: "2018.2.03"
        },
        {
          bannerTitle: "34478787744",
          bannerCover: "",
          courseId: "45",
          startTime: "2018.2.03",
          endTime: "2018.2.03"
        }
      ],
      rules: {
        bannerTitle: [
          { required: true, message: "请输入推荐位名称", trigger: "blur" }
        ],
        bannerCover: [
          { required: true, message: "请上传图片", trigger: "blur" }
        ],
        courseId: [
          { required: true, message: "请输入课程id", trigger: "blur" },
          { type: "number", message: "课程id必须为数字值" }
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    TablePager
  },
  methods: {
    // 增加bannner部分
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // http
          //   .addBanner(this.banner)
          //   .then(res => {
          //     this.getBannerList();
          //   })
          //   .catch(res => {
          //     console.log(res);
          //   });
          this.tableData.push({ ...this.banner });
          console.log(this.tableData);
          this.addShow = false;
        } else {
          return false;
        }
      });
    },
    // 获取banner信息列表
    getBannerList() {
      http
        .listBanner()
        .then(res => {
          this.tableData = res.data;
        })
        .catch(res => {});
    },
    //编辑banner信息
    editBanner(index) {
      this.addShow = true;
      this.banner = this.tableData[index];
      http
        .editBanner(this.banner)
        .then(res => {
          this.getBannerList();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //上下移banner
    //删除
    delBanner() {
      http
        .delBanner(this.banner.courseId)
        .then(res => {
          this.getBannerList();
        })
        .catch(res => {
          console.log(res);
        });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    up(index) {
      console.log(index);
      var options = this.tableData;
      var prev = options.slice(0, index - 1);
      var curr = options.slice(index - 1, index + 1).reverse();
      var tail = options.slice(index + 1);
      this.tableData = prev.concat(curr).concat(tail);
    },
    down(index) {
      console.log(index);
      var options = this.tableData;
      var prev = options.slice(0, index);
      var curr = options.slice(index, index + 2).reverse();
      var tail = options.slice(index + 2);
      this.tableDatan = prev.concat(curr).concat(tail);
    }
  }
};
</script>
<style>
.operation a {
  padding: 0 10px;
}
.btn-top {
  margin-bottom: 30px;
  padding-top: 10px;
}
.el-table th.is-leaf,
.el-table tr {
  text-align: center;
}
.updatapic {
  position: relative;
}
.updata input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 82px;
  width: 98px;
  height: 36px;
}
.updata button {
  margin-left: 42px;
}
.el-form-item__content {
  float: left;
}
.el-form-item__label {
  width: 140px !important;
}
</style>

