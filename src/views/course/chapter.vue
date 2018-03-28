<template>
  <div>
    <el-form class="app-container chapter-container" ref="editChapter" :model="form">
      <template v-if="!isLiving">
        <el-form-item label="课时数量" prop="chapterNum" :inline-message="true" :rules="chapterNumValidate">
          <el-input-number controls-position="right" :min="0" v-model="form.chapterNum"></el-input-number>
          <!-- <el-input class="short-input" placeholder="该课程的总共课时数量" v-model.number.trim="form.chapterNum"></el-input> -->
        </el-form-item>
      </template>

      <el-table class="text-center" :data="form.chapter">
        <el-table-column label="课时序号" type="index" width="100">
        </el-table-column>
        <el-table-column label="课时名称" min-width="200">
          <template slot-scope="{row, $index: index}">
            <el-form-item :rules="[{ required: true, message: '不能为空' }]" :prop="'chapter['+index+'].chapterTitle'">
              <el-input v-model.trim="row.chapterTitle" :disabled="row.disabled" :maxlength="30"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="直播时间" width="420" v-if="isLiving">
          <template slot-scope="{row, $index: index}">
            <el-form-item :rules="[{required: true, message: '不能为空'}]" :prop="'chapter['+index+'].playTime'">
              <el-date-picker v-model="row.playTime" format="yyyy-MM-dd HH:mm" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="{disabledDate: disabledDate.bind(null, index)}" :disabled="row.disabled" @change="onChangeTime(index, $event)" @focus="onFocus(index)"></el-date-picker>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="视频ID" min-width="200">
          <template slot-scope="{row, $index: index}">
            <el-form-item :rules="[{required: !isLiving, message: '不能为空'}]" :prop="'chapter['+index+'].playUrl'">
              <el-input v-model.trim="row.playUrl"></el-input>
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

    <!-- 设置上下架 -->
    <el-dialog title="设置上下架" width="400px" :show-close="false" :close-on-click-modal="false" :visible.sync="setShelve">
      <div class="text-center">
        <span>请设置课程状态：</span>
        <el-radio-group v-model="shelve">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="updateShelve">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import {
  getCourseChaper,
  updateCourseChapter,
  updateCourseShelve
} from '@/api/course';
import { parseTime } from '@/filters';
import { calcuWeight } from '@/utils';

let CHAPTER_FLAG = {
  ADD: 1,
  UPDATE: 2,
  DELETE: 3
};
export default {
  data() {
    let self = this;
    return {
      loading: false,
      timeFormat: '{y}-{m}-{d} {h}:{i}',
      courseId: this.$route.params.id,
      isLiving: this.$route.query.type != 1, //0直播，1录播
      deletes: [],
      form: {
        chapterNum: this.$route.query.num,
        chapter: []
      },
      prevTimeByIndex: '',
      nexrTimeByIndex: '',
      setShelve: false,
      shelve: 1,
      chapterNumValidate: [
        { required: true, message: '不能为空' },
        {
          validator(field, value, callback) {
            let msg;
            let num = parseInt(value);
            if (num != value) msg = '课时数量必须是整数';
            else if (num < self.form.chapter.length)
              msg = '课时数量不能小于课时总条数';
            callback(msg);
          }
        }
      ]
    };
  },
  components: { TablePager },
  methods: {
    async getChapter() {
      let res = await getCourseChaper(this.courseId);
      let chapters = res.data.map(chapter => {
        let { chapterStatus, startTime, endTime } = chapter;
        let obj = {
          disabled: this.isLiving && chapterStatus != 0,
          flag: CHAPTER_FLAG.UPDATE
        };
        if (this.isLiving) {
          startTime = parseTime(startTime, this.timeFormat);
          endTime = parseTime(endTime, this.timeFormat);
          Object.assign(obj, {
            startTime: startTime + ':00',
            endTime: endTime + ':00',
            playTime: [startTime, endTime]
          });
        }
        return {
          ...chapter,
          ...obj
        };
      });
      this.form.chapter = chapters;
    },
    addChapter(index) {
      let newIndex = this.form.chapter.length === 0 ? index : index + 1;
      let obj = {
        chapterTitle: '',
        playUrl: '',
        flag: CHAPTER_FLAG.ADD
      };
      this.form.chapter.splice(newIndex, 0, obj);
      obj.weight = calcuWeight(this.form.chapter, newIndex);
    },
    removeChapter(index) {
      let record = this.form.chapter[index];
      if (record.chapterId) {
        this.deletes.push(
          Object.assign({}, record, { flag: CHAPTER_FLAG.DELETE })
        );
      }
      this.form.chapter.splice(index, 1);
    },
    onFocus(index) {
      this.prevTimeByIndex = this.getPrevDate(index);
      this.nexrTimeByIndex = this.getNextDate(index);
    },
    disabledDate(index, date) {
      if (index < this.form.chapter.length) {
        return (
          date < this.prevTimeByIndex ||
          (this.nexrTimeByIndex && date > this.nexrTimeByIndex)
        );
      }
    },
    getPrevDate(index) {
      if (index === 0) {
        return this.getStartOfDate(parseTime(new Date()));
      } else {
        let list = this.form.chapter;
        let prev = list[index - 1];
        if (prev.endTime) {
          return this.getStartOfDate(prev.endTime);
        } else {
          return this.getPrevDate(index - 1);
        }
      }
    },
    getStartOfDate(dateStr) {
      let arr = dateStr.split(' ');
      arr.splice(1, 1, '00:00:00');
      return new Date(arr.join(' '));
    },
    getNextDate(index) {
      let list = this.form.chapter;
      let len = list.length;
      if (index + 1 === len) {
        return '';
      } else {
        let next = list[index + 1];
        if (next.startTime) {
          return this.getStartOfDate(next.startTime);
        } else {
          return this.getNextDate(index + 1);
        }
      }
    },
    onChangeTime(index, time) {
      let timeFormat = this.timeFormat;
      let [start, end] = time || [];
      Object.assign(this.form.chapter[index], {
        startTime: start ? parseTime(start, timeFormat + ':{s}') : '',
        endTime: end ? parseTime(end, timeFormat + ':{s}') : ''
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
          this.loading = true;
          return updateCourseChapter({
            ...this.form,
            chapter: JSON.stringify(chapter.concat(this.deletes)),
            courseId: this.courseId
          });
        })
        .finally(res => {
          this.loading = false;
        });
      this.setShelve = true;
    },
    async updateShelve() {
      await updateCourseShelve({
        courseId: this.courseId,
        unshelve: this.shelve
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

