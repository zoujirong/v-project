<template>
    <div class="app-container">
        <el-form ref="editForm" label-suffix="：" label-width="150px" :model="course">
            <el-form-item label="课程标题" prop="courseName">
                <el-input v-model="course.courseName" :style="{width: '40%'}"></el-input>
            </el-form-item>
            <el-form-item label="课程类型" prop="teachingMethod">
                <el-radio label="1" v-model="course.teachingMethod">直播课</el-radio>
                <el-radio label="2" v-model="course.teachingMethod">录播课</el-radio>
            </el-form-item>
            <el-form-item label="课程类目" prop="categoryId">
                <el-radio label="1" v-model="course.categoryId">产品设计</el-radio>
                <el-radio label="2" v-model="course.categoryId">产品策划</el-radio>
            </el-form-item>
            <el-form-item label="潭州课堂ID" prop="tzCourseId">
                <el-input placeholder="填写潭州课程的课程ID（数字）" v-model="course.tzCourseId"></el-input>
                <span class="form-tips">提示：录播课程不必填写课程id</span>
            </el-form-item>
            <el-form-item label="主讲老师" prop="mainTeacher">
                <el-select v-model="course.mainTeacher" placeholder="请选择主讲老师"></el-select>
            </el-form-item>
            <el-form-item label="课程封面">
                <upload-image :limit="1" :fileList="course.courseCover ? [{url: course.courseCover}] : []" @onSuccess="onUploadCover"></upload-image>
                <span class="form-tips">要求：图片宽高像素分别为 X * Y</span>
            </el-form-item>
            <el-form-item label="课程介绍">
                <upload-image :limit="1" :fileList="course.courseDesc ? [{url: course.courseDesc}] : []" @onSuccess="onUploadDetail"></upload-image>
                <span class="form-tips">要求：建议图片宽度为**像素，高度不超过**像素</span>
            </el-form-item>
            <el-form-item label="课程价格" prop="coursePrice">
                <el-input-number controls-position="right" :min="0.00" :step="0.01" v-model="course.coursePrice"></el-input-number>
                <span class="form-tips">要求：价格精确到小数点后两位，填写0.00即为免费课程</span>
            </el-form-item>
            <el-form-item label="客服微信" prop="customerWx">
                <el-input v-model="course.customerWx"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">保存并下一步</el-button>
                <router-link :to="{name: 'courseList'}" tag="el-button">返回</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import UploadImage from '@/components/UploadImage';

export default {
  data() {
    return {
      chooseImage: false,
      course: {
        courseName: '',
        teachingMethod: '1', //0直播,1录播
        categoryId: '1',
        tzCourseId: '1',
        mainTeacher: '',
        courseCover: '',
        courseDesc: '',
        coursePrice: 0.0,
        customerWx: ''
      }
    };
  },
  components: { UploadImage },
  methods: {
    onUploadCover(urls) {
      console.log('上传封面', urls);
      this.course.courseCover = urls[0];
    },
    onUploadDetail(urls) {
      this.course.courseDesc = urls[0];
      console.log('上传详情', urls);
    },
    success(response, file, fileList) {
      console.log(response, file, fileList);
    },
    onChange(a) {
      console.log(a);
    },
    submit() {
      let form = this.$refs.editForm;
      form.validate(validate => {
        console.log(this.course);
      });
    }
  }
};
</script>
<style scoped>
.el-input,
.el-select {
  width: 20%;
}
.form-tips {
  color: #bbb;
  margin-left: 20px;
}
.inline-block {
  display: inline-block;
}
</style>
