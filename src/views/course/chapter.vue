<template>
  <el-form class="app-container chapter-container" ref="editChapter" :model="form">
    <template v-if="!isLiving">
      <el-form-item label="课时数量" prop="chapterNum" :inline-message="true" :rules="[{required: true, message: '不能为空'}]">
        <el-input class="short-input" placeholder="该课程的总共课时数量" v-model="form.chapterNum"></el-input>
      </el-form-item>
    </template>

    <el-table class="text-center" :data="form.chapter">
      <el-table-column label="课时序号" type="index" width="100">
      </el-table-column>
      <el-table-column label="课时名称" min-width="200">
        <template slot-scope="{row, $index: index}">
          <el-form-item :rules="[{required: true, message: '不能为空'}]" :prop="'chapter['+index+'].chapterTitle'">
            <el-input v-model.trim="row.chapterTitle" :disabled="row.disabled"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="直播时间" width="420" v-if="isLiving">
        <template slot-scope="{row, $index: index}">
          <el-form-item :rules="[{required: true, message: '不能为空'}]" :prop="'chapter['+index+'].playTime'">
            <el-date-picker v-model="row.playTime" format="yyyy-MM-dd HH:mm" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :disabled="row.disabled" @change="onChangeTime(index, $event)"></el-date-picker>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="视频ID" min-width="200">
        <template slot-scope="{row, $index: index}">
          <el-form-item :rules="[{required: true, message: '不能为空'}]" :prop="'chapter['+index+'].playUrl'">
            <el-input v-model.trim="row.playUrl" :disabled="row.disabled"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="{row, $index: index}">
          <el-button type="text" icon="el-icon-circle-plus" class="op-btn" @click="addChapter(index)"></el-button>
          <el-button type="text" icon="el-icon-remove" class="op-btn" @click="removeChapter(index)" v-if="form.chapter.length !== 1 && !row.disabled"></el-button>
        </template>
      </el-table-column>

      <div slot="empty">
        <el-button @click="addChapter(0)">
          <i class="el-icon-plus"></i>
          添加课时信息
        </el-button>
      </div>
    </el-table>

    <el-form-item class="btn-container">
      <el-button type="primary" :loading="loading" @click="submit">保存</el-button>
      <router-link :to="{name: 'courseList'}" tag="el-button">返回</router-link>
    </el-form-item>
  </el-form>
</template>

<script>
import TablePager from '@/components/TablePager';
import { getCourseChaper, updateCourseChapter } from '@/api/course';
import { parseTime } from '@/filters';

export default {
  data() {
    return {
      loading: false,
      timeFormat: '{y}-{m}-{d} {h}:{i}',
      courseId: this.$route.params.id,
      isLiving: this.$route.query.type != 1, //0直播，1录播
      form: {
        chapterNum: '',
        chapter: []
      }
    };
  },
  components: { TablePager },
  methods: {
    async getChapter() {
      let res = await getCourseChaper(this.courseId);
      let chapters = res.data.map(chapter => {
        let { chapterStatus, livingStartTime, livingEndTime } = chapter;
        livingStartTime = parseTime(livingStartTime, this.timeFormat);
        livingEndTime = parseTime(livingEndTime, this.timeFormat);
        return {
          ...chapter,
          livingStartTime,
          livingEndTime,
          playTime: [livingStartTime, livingEndTime],
          disabled: chapterStatus != 0
        };
      });
      this.form.chapter = chapters;
    },
    addChapter(index) {
      let newIndex = this.form.chapter.length === 0 ? index : index + 1;
      let obj = {
        chapterTitle: '',
        playUrl: ''
      };
      this.form.chapter.splice(newIndex, 0, obj);
      obj.weight = this.calcuWeight(newIndex);
    },
    removeChapter(index) {
      this.form.chapter.splice(index, 1);
    },
    calcuWeight(index) {
      let chapters = this.form.chapter;
      let prev = chapters[index - 1];
      let next = chapters[index + 1];
      if (prev && next) {
        return (prev.weight + next.weight) / 2;
      } else if (!(prev || next)) {
        return 1;
      } else {
        return prev.weight + 1;
      }
    },
    onChangeTime(index, time) {
      let timeFormat = this.timeFormat;
      let [start, end] = time;
      Object.assign(this.form.chapter[index], {
        livingStartTime: parseTime(start, timeFormat),
        livingEndTime: parseTime(end, timeFormat)
      });
    },
    async submit() {
      let chapter = this.form.chapter;
      if (chapter.length === 0) {
        this.$message.error('请先添加课时信息');
        return;
      }
      let form = this.$refs.editChapter;
      await form
        .validate()
        .then(res => {
          if (!res) return Promise.reject({ msg: '信息输入有误' });
          let data = this.form;
          this.loading = true;
          return updateCourseChapter({
            ...data,
            chapter: JSON.stringify(data.chapter),
            courseId: this.courseId
          });
        })
        .finally(res => {
          this.loading = false;
        });
      this.$message.success('修改课程成功');
      this.$router.push({ name: 'courseList' });
    }
  },
  created() {
    this.getChapter();
  }
};
</script>

<style scoped>
.op-btn {
  font-size: 25px;
}
.el-input.short-input {
  width: 200px;
}
.el-table .el-form-item {
  margin-bottom: 0;
}
.btn-container {
  text-align: center;
  padding-top: 50px;
}
</style>

