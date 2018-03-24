<template>
  <div class="app-container">
    <div class="btn-top">
      <button class="el-button el-button--primary el-button--medium" @click="addbanner">新增推荐位</button>
    </div>
    <!-- 表格部分 -->
    <template>
      <TablePager :data="tableData" :columns="columns" :pagination="false" :loading="loading">
        <template slot='number' slot-scope="{row,index}">
          <span>{{index+1}}</span>
        </template>
        <template slot='bannerCover' slot-scope="{row,index}">
          <img :src="tableData[index].bannerCover" alt="" @click="picBig(index)">
        </template>
        <template slot="startTime" slot-scope="{row,index}">
          {{startDate[index].startDateFormat}}
        </template>
        <template slot="endTime" slot-scope="{row,index}">
          {{startDate[index].endDateFormat}}
        </template>
        <template slot="createTime" slot-scope="{row,index}">
          {{startDate[index].creatDateFormat}}
        </template>
        <template slot="modifiedTime" slot-scope="{row,index}">
          {{startDate[index].modifiedDateFormat}}
        </template>
        <template slot="operate" slot-scope="{row,index}">
          <el-button type="text" size="small" @click="editBanner(index)">编辑</el-button>
          <el-button type="text" size="small" @click="up(index)" v-show="index != 0">上移</el-button>
          <el-button type="text" size="small" @click="down(index)" v-show="(index != tableData.length-1) || index == 0">下移</el-button>
          <el-button @click.native.prevent="delBanner(index)" type="text" size="small"> 删除 </el-button>
        </template>
      </TablePager>
    </template>
    <!-- 图片放大弹窗 -->
    <el-dialog v-if="tableData.length" :visible.sync="picVisible" width="50%" height="100%">
      <img :src="tableData[picSrc].bannerCover" alt="">
    </el-dialog>
    <!-- 弹窗部分 -->
    <el-dialog :visible.sync="addShow" width="35%" center @close="resetForm('banner')">
      <div class="bannerform">
        <el-form :model="banner" :rules="rules" ref="banner" label-width="140px" class="demo-ruleForm">
          <el-form-item label="推荐位名称" prop='bannerTitle'>
            <el-input v-model.trim="banner.bannerTitle"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop='bannerCover'>
            <upload-image :limit="1" :fileList="banner.bannerCover?[{url: banner.bannerCover}] : []" @onSuccess="onUploadCover"></upload-image>
            <span class="form-tips">建议上传X*Y尺寸像素图片</span>
          </el-form-item>
          <el-form-item label="对应跳转的课程id" prop='courseId'>
            <el-input v-model.trim="banner.courseId"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop='startTime'>
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model.trim="banner.startTime" type="datetime" placeholder="选择日期" :picker-options="pickr"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop='endTime'>
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model.trim="banner.endTime" type="datetime" placeholder="选择日期" :picker-options="pickr"></el-date-picker>
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
import TablePager from '@/components/TablePager';
import UploadImage from '@/components/UploadImage';
import { parseTime } from '@/utils/index.js';
import {
  getListBanner,
  getAddBanner,
  getEditBanner,
  getDelBanner,
  getSetBannerSort
} from '@/api/banner.js';

export default {
  data() {
    return {
      addShow: false,
      authorization: '',
      banner: {
        bannerTitle: '',
        bannerCover: [],
        courseId: '',
        startTime: '',
        endTime: ''
      },
      bannerPage: {
        pageNo: 1,
        pageSize: 10
      },
      loading: false,
      type: 1,
      picSrc: 0,
      picVisible: false,
      amendDate: '',
      columns: [
        { title: '序号', slot: 'number' },
        { title: '推荐位名称', key: 'bannerTitle' },
        { title: '图片', slot: 'bannerCover' },
        { title: '课程id', key: 'courseId' },
        { title: '课程名称', key: 'courseName' },
        { title: '开始时间', slot: 'startTime' },
        { title: '结束时间', slot: 'endTime' },
        { title: '创建时间', slot: 'createTime' },
        { title: '修改时间', slot: 'modifiedTime' },
        { title: '操作', slot: 'operate' }
      ],
      pickr: {
        disabledDate(time) {
          return Date.now() > time.getTime();
        }
      },
      tableData: [],
      rules: {
        bannerTitle: [
          { required: true, message: '请输入推荐位名称', trigger: 'blur' }
        ],
        bannerCover: [{ required: true, message: '请上传图片', type: 'array' }],
        courseId: [
          { required: true, message: '请输入课程id', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    TablePager,
    UploadImage
  },
  computed: {
    startDate() {
      return this.tableData.map(s => {
        return {
          ...s,
          startDateFormat: parseTime(s.startTime),
          endDateFormat: parseTime(s.endTime),
          creatDateFormat: parseTime(s.createTime),
          modifiedDateFormat: parseTime(s.modifiedTime)
        };
      });
    }
  },
  methods: {
    // 增加bannner部分
    async submit(form) {
      console.log(this.banner);
      this.$refs[form].validate(valid => {
        if (valid) {
          this.banner.bannerCover = this.banner.bannerCover.join('');
          let addtype =
            this.type == 1
              ? getAddBanner(this.banner)
              : getEditBanner(this.banner);
          console.log(addtype);
          addtype
            .then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getBannerList();
            })
            .catch(res => {
              this.$message.error(res.msg);
              console.log(res);
            });
          this.addShow = false;
        } else {
          return false;
        }
      });
    },
    addbanner() {
      this.type = 1;
      this.addShow = true;
    },
    // 获取banner信息列表
    async getBannerList() {
      this.loading = true;
      getListBanner(this.bannerPage)
        .then(res => {
          this.loading = false;
          this.tableData = res.data.data;
          console.log(this.tableData);
        })
        .catch(res => {
          this.loading = false;
          console.log(res);
        });
    },
    //编辑banner信息
    async editBanner(index) {
      this.type = 2;
      console.log(this.type);
      this.addShow = true;
      this.$nextTick(() => {
        this.banner = { ...this.tableData[index] };
      });
    },
    //删除
    async delBanner(index) {
      let delCourseId = this.tableData[index].courseId;
      this.$confirm('是否删除该信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          getDelBanner({ bannerId: delCourseId })
            .then(res => {
              this.getBannerList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //上下移banner
    up(index) {
      console.log(index);
      var options = this.tableData;
      var prev = options.slice(0, index - 1);
      //reverse() 颠倒数组中元素的顺序。
      var curr = options.slice(index - 1, index + 1).reverse();
      var tail = options.slice(index + 1);
      this.tableData = prev.concat(curr).concat(tail);
      let banners = {
        bannerId: this.tableData[index].id,
        upCourseId: ''
      };
      getSetBannerSort(banners)
        .then(res => {})
        .catch(res => {
          console.log(res);
        });
    },
    down(index) {
      console.log(index);
      var options = this.tableData;
      var prev = options.slice(0, index);
      var curr = options.slice(index, index + 2).reverse();
      var tail = options.slice(index + 2);
      this.tableData = prev.concat(curr).concat(tail);
      let downCourseId = this.tableData[index].courseId;
      getSetBannerSort({ downBannerId: downCourseId })
        .then(res => {})
        .catch(res => {
          console.log(res);
        });
    },
    //图片放大
    picBig(index) {
      this.picSrc = index;
      this.picVisible = true;
    },
    onUploadCover(urls) {
      console.log(urls);
      this.banner.bannerCover.push(urls[0]);
    }
  },
  mounted() {
    this.getBannerList();
  }
};
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
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
.el-form-item__content {
  margin: 0 !important;
  float: left;
}
.form-tips {
  display: inline-block;
  /* float: left; */
  padding-left: 10px;
}
/* .v-modal {
  z-index: 1997 !important;
} */
/* .el-dialog__wrapper {
  z-index: 2003 !important;
} */
</style>

