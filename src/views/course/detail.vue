<template>
  <div class="app-container">
    <!-- :model="course" -->
    <el-form ref="editForm" label-suffix="：" label-width="150px" :rules="rules" :inline-message="true" :model="course">
      <el-form-item label="课程标题" prop="title">
        <el-input v-model.trim="course.title" class="short-input" :maxlength="40"></el-input>
      </el-form-item>
      <el-form-item label="课程类型" prop="teachingMethod" required>
        <el-radio-group v-model="course.teachingMethod" @change="changeMethod">
          <el-radio :label="0" :disabled="!!courseId">直播课</el-radio>
          <el-radio :label="1" :disabled="!!courseId">录播课</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- :rules="[{required: true,message: '请选择课程类目！'}]"  v-if="cate.isDel" -->
      <el-form-item label="课程类目" prop="categoryId">
        <el-radio-group v-model="course.categoryId">
          <template v-for="cate in categoryList">
            <el-radio :key="cate.categoryId" :label="cate.categoryId">{{cate.categoryName}}</el-radio>
          </template>
        </el-radio-group>
        <span class="form-tips" v-if="categoryList.length === 0">暂无类目，请先去添加相应类目吧！</span>
      </el-form-item>
      <el-form-item label="潭州课堂ID" prop="tzCourseId">
        <el-input placeholder="填写潭州课程的课程ID（数字）" :maxlength="12" v-model.trim="course.tzCourseId"></el-input>
        <span class="form-tips">提示：录播课程不必填写课程id</span>
      </el-form-item>
      <el-form-item label="主讲老师" prop="mainTeacher" :rules="[{required: true,message: '请选择主讲老师！'}]">
        <el-select v-model="course.mainTeacher" placeholder="请选择主讲老师">
          <template v-for="teacher in teacherList">
            <el-option :key="teacher.teacherId" :value="teacher.teacherId" :label="teacher.teacherName"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="课程封面" prop="courseCover" :rules="[{required: true,message: '请上传课程封面！'}]">
        <upload-image :limit="1" :fileList="course.courseCover ? [{url: course.courseCover}] : []" @onSuccess="onUploadCover"></upload-image>
        <!-- <span class="form-tips">要求：图片宽高像素分别为 X * Y</span> -->
      </el-form-item>
      <!-- <el-form-item label="课程介绍" prop="courseDesc" :rules="[{required: true,message: '请上传课程介绍！'}]">
        <upload-image :limit="1" :fileList="course.courseDesc ? [{url: course.courseDesc}] : []" @onSuccess="onUploadDetail"></upload-image>
        <span class="form-tips">要求：建议图片宽度为**像素，高度不超过**像素</span>
      </el-form-item> -->
      <el-form-item label="课程价格" prop="coursePrice">
        <el-input-number controls-position="right" :min="0.00" :max="999999" :step="0.01" v-model="course.coursePrice"></el-input-number>
        <span class="form-tips">要求：价格精确到小数点后两位，填写0.00即为免费课程</span>
      </el-form-item>
      <el-form-item label="课程介绍" prop="descContent">
        <el-input type="textarea" v-model.trim="course.descContent" class="short-textarea " :maxlength="200"></el-input>
      </el-form-item>
      <!-- <el-form-item label="客服微信" prop="customerWx" :rules="[{required: true, message: '请填写客服微信！'}]">
        <el-input v-model.trim="course.customerWx" :maxlength="20"></el-input>
      </el-form-item> -->

      <el-form-item :label="'适用人群'" prop="suit">
        <div v-for="(item,index) in course.suit" :key="index">
          <el-input type="textarea" v-model="item.rew" :maxlength="100" autosize class="textareatHeight"></el-input>
          <el-button type="text" icon="el-icon-circle-plus" class="op-btn" @click="addDomain()"></el-button>
          <el-button type="text" icon="el-icon-remove" class="op-btn" @click="removeDomain(item)" v-if="course.suit.length !== 1"></el-button>
        </div>
      </el-form-item>

      <el-form-item label="你将收获" prop="reward ">
        <div v-for="(rewD,index) in course.reward" :key="index">
          <el-input type="textarea" v-model.trim="rewD.rew" autosize :maxlength="100" class="textareatHeight"></el-input>
          <el-button type="text" icon="el-icon-circle-plus" class="op-btn" @click="addReward()"></el-button>
          <el-button type="text" icon="el-icon-remove" class="op-btn" @click="removeReward(rewD)" v-if="course.reward.length !== 1"></el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
        <router-link :to="{name: 'courseList'}" tag="el-button">返回</router-link>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import UploadImage from '@/components/UploadImage';
import { getCourseDetail, updateCourse, addCourse } from '@/api/course';
import { listCategory } from '@/api/category';
import { teacherList } from '@/api/teacher';

export default {
  data() {
    let self = this;
    return {
      // 适用人群
      // dynamicValidateForm: {
      //   domains: [
      //     {
      //       value: ''
      //     }
      //   ]
      // },
      commonParam: {
        pageNo: 1,
        pageSize: 100
      },
      teacherList: [],
      categoryList: [],
      loading: false,
      courseId: this.$route.query.id,
      course: {
        title: '',
        teachingMethod: 0, //0直播,1录播
        categoryId: '',
        tzCourseId: '',
        mainTeacher: '',
        courseCover: '',
        // courseDesc: '',
        coursePrice: 0.0,
        descContent: '',
        reward: [{ rew: '' }],
        suit: [{ rew: '' }],
        chapter: []
        // customerWx: ''
      },
      // form: {
      //   chapterNum: this.$route.query.num,
      //   chapter: []
      // },
      num: this.$route.query.num,
      rules: {
        title: [
          { required: true, message: '请填写课程标题！' },
          {
            validator: (field, value, callback) => {
              let msg;
              if (value && +value == value) msg = '课程标题不能是纯数字';
              callback(msg);
            }
          }
        ],
        tzCourseId: [
          {
            validator: (field, value, callback) => {
              let msg;
              if (self.course.teachingMethod === 0 && !value)
                msg = '潭州课程ID不能为空';
              else if (value && !/^\d+$/.test(value))
                msg = '请填写正确的潭州课程ID';
              callback(msg);
            }
          }
        ]
      }
    };
  },
  components: { UploadImage },
  methods: {
    // 新增适用人群  减
    removeDomain(removeItem) {
      var index = this.course.suit.indexOf(removeItem);
      if (index !== -1) {
        this.course.suit.splice(index, 1);
      }
    },
    //加
    addDomain() {
      this.course.suit.push({
        rew: ''
      });
    },
    // 你将收获 减
    removeReward(rew) {
      var index = this.course.reward.indexOf(rew);
      if (index !== -1) {
        this.course.reward.splice(index, 1);
      }
    },
    //加
    addReward() {
      this.course.reward.push({
        rew: ''
      });
    },
    async getCourseDetailById() {
      let res = await getCourseDetail(this.courseId);
      let suitObj = JSON.parse(res.data.suit) || [];
      res.data.suit = suitObj.concat();
      let rewObj = JSON.parse(res.data.reward) || [];
      res.data.reward = rewObj.concat();
      this.course = res.data;
      // console.log(this.course);
    },
    async getTeacher() {
      let res = await teacherList(this.commonParam);
      this.teacherList = res.data.data;
    },
    async getCategory() {
      let res = await listCategory(this.commonParam);
      this.categoryList = res.data.data;
    },
    onUploadCover(urls) {
      // console.log('上传封面', urls);
      this.course.courseCover = urls[0] || '';
      this.$refs.editForm.validateField('courseCover');
    },
    onUploadDetail(urls) {
      this.course.courseDesc = urls[0] || '';
      // console.log('上传详情', urls);
      this.$refs.editForm.validateField('courseDesc');
    },
    // success(response, file, fileList) {
    //   console.log(response, file, fileList);
    // },
    changeMethod(a) {
      this.$refs.editForm.validateField('tzCourseId');
    },
    async submit() {
      // console.log(this.course.suit);
      let form = this.$refs.editForm;
      let res = await form
        .validate()
        .then(res => {
          if (!res) return Promise.reject({ msg: '信息填写有误' });
          this.loading = true;
          // if (this.courseId) {
          //   return updateCourse({
          //     id: this.courseId,
          //     ...this.course
          //   });
          // }
          // return addCourse(this.course);
          if (this.num && this.num == 1) {
            return addCourse({
              id: this.courseId
            });
            // console.log(this.num);
          } else if (this.num && this.num == 2) {
            let courseobj = Object.assign({}, this.course);
            courseobj.suit = JSON.stringify(courseobj.suit);
            courseobj.reward = JSON.stringify(courseobj.reward);
            return updateCourse({
              id: this.courseId,
              ...courseobj
            });

            // console.log(this.num);
          } else {
            let courseobj = Object.assign({}, this.course);
            courseobj.suit = JSON.stringify(courseobj.suit);
            courseobj.reward = JSON.stringify(courseobj.reward);
            return addCourse(courseobj);
            // console.log('kec');
          }
        })
        .finally(res => {
          this.loading = false;
        });
      //修改课程
      if (this.courseId) {
        this.$message.success('修改课程成功');
        this.$router.push({ name: 'courseList' });
      } else {
        this.$router.push({
          name: 'courseChapter',
          params: { id: res.data.courseId },
          query: { type: this.course.teachingMethod }
        });
      }
    }
  },
  created() {
    this.courseId && this.getCourseDetailById();
    this.getCategory();
    this.getTeacher();
  }
  // mounted() {
  //   console.log(this.num);
  // }
};
</script>
<style scoped>
.el-input,
.el-select {
  width: 20%;
}
.el-input.short-input,
.short-textarea,
.textareatHeight {
  width: 40%;
}
.form-tips {
  color: #bbb;
  margin-left: 20px;
}
.inline-block {
  display: inline-block;
}

.op-btn {
  font-size: 25px;
  position: relative;
  top: -8px;
}
</style>
<style>
.short-textarea textarea {
  height: 95px;
}
.textareatHeight textarea {
  min-height: 50px;
  height: auto;

  /* height: auto; */
}
.el-textarea__inner {
  margin-bottom: 10px;
  padding: 4px 5px 5px;
  resize: none;
}
</style>
