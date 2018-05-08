<template>
  <!-- 编辑课程弹窗 -->
  <div ref='dataForm' class="addCourse">
    <el-form inline class='marginBottom' :model="searchParam" ref='searchForm'>
      <el-form-item label="编辑推荐课程" prop="courseParam">
        <el-input v-model.trim="searchParam.courseParam" placeholder="课程名或课程id进行查询" clearable size="small" @keyup.enter='getList'></el-input>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      &nbsp;&nbsp;
      <el-button @click='reset'>重置</el-button>
      <br><br>
      <el-button type="primary" @click='editSort' v-if='EditSort'>编辑排序</el-button>
      <el-button type="success" @click='saveEditSort' v-else>保存</el-button>
    </el-form>
    <TablePager :data='courses' :columns="columns2" :pagination="false" row-key="courseId" :loading="listLoading">
      <template slot='position' slot-scope='{row,index}'>
        <span>{{index+1}}</span>
      </template>
      <template slot="sort" slot-scope="{row}" ref='sortPart'>
        <svg-icon class='drag-handler' icon-class="drag" style="color:#409EFF"></svg-icon>
      </template>
      <!-- <template slot="handle" slot-scope="{row,index}">
        <el-button type="text" @click="delCourse(row.courseId, index)"> 取消推荐</el-button>
      </template> -->
    </TablePager>
  </div>
</template>

<script>
import { categoryCourse, sortCategoryCourse } from '@/api/category';
import { updateCourseRecommend } from '@/api/course';
import Sortable from 'sortablejs';
import TablePager from '@/components/TablePager';
import { fetchList } from '@/api/article';
import { calcuWeight } from '@/utils/index';
export default {
  data() {
    return {
      listLoading: true,
      sortable: '',
      EditSort: true,
      searchParam: {
        categoryId: '',
        courseParam: '',
        pageSize: 100,
        isRecommend: true
      },
      columns2: [
        { title: '位置', slot: 'position' },
        { title: '课程id', key: 'courseId' },
        { title: '课程名称', key: 'title' },
        { title: '主讲老师', key: 'mainTeacher' }
      ],
      courses: [],
      // 拖拽
      sortable: '',
      oldList: [],
      newList: [],

      listQuery: {
        courseId: '',
        courseName: '',
        weight: ''
      },
      courseSort: [
        {
          courserId: '',
          weight: ''
        }
      ],
      //被拖拽的课程
      oldIndex: '',
      newIndex: '',
      sortCourse: [],
      SortList: {}
    };
  },
  components: { TablePager },
  created() {
    this.getList();

    console.log(this);
  },
  computed: {
    // CategoryId() {
    //   return this.$route.query.categoryId;
    // }
  },
  methods: {
    //获取推荐课程列表
    async getList() {
      this.listLoading = true;
      let res = await categoryCourse({
        //
        // categoryId: this.CategoryId,
        courseParam: this.searchParam.courseParam,
        isRecommend: this.searchParam.isRecommend,
        pageSize: this.searchParam.pageSize
      });
      this.listLoading = false;
      this.courses = res.data.data;
    },

    //重置
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      this.getList();
    },
    //编辑排序
    editSort() {
      this.drag();
      this.columns2.splice(3, 0, { title: '排序', slot: 'sort' });
      this.EditSort = !this.EditSort;
    },
    //保存排序
    async saveEditSort() {
      console.log(this.SortList);
      this.sortable.option('disabled', true);
      this.columns2.splice(3, 1);
      let sort = Object.keys(this.SortList)
        .map(item => ({
          courseId: item,
          weight: this.SortList[item]
        }))
        .filter(item => {
          return +item.weight == item.weight;
        });
      this.listLoading = true;
      await sortCategoryCourse({
        // categoryId: this.CategoryId,
        courseSort: JSON.stringify(sort)
      }).finally(res => {
        this.listLoading = false;
      });

      this.getList();
      this.EditSort = !this.EditSort;
    },
    //拖拽
    drag() {
      this.oldList = this.courses.map(v => v.courseId);
      this.newList = this.oldList.slice();
      this.$nextTick(() => {
        if (this.sortable) {
          this.sortable.option('disabled', false);
        } else {
          this.setSort();
        }
      });
    },
    setSort() {
      const el = document.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '');
        },
        onEnd: evt => {
          const targetRow = this.courses.splice(evt.oldIndex, 1)[0];
          this.courses.splice(evt.newIndex, 0, targetRow);
          this.oldIndex = evt.oldIndex; //被拖动的位置
          this.newIndex = evt.newIndex; //被拖动的元素新的位置

          if (this.oldIndex !== this.newIndex) {
            let key = this.courses[this.newIndex].courseId;
            let weight = calcuWeight(this.courses, this.newIndex);
            this.SortList[key] = weight;
            // console.log(1, this.SortList);
            this.courses[this.newIndex].weight = weight;
          }
        }
      });
    },
    //取消推荐课程
    async delCourse(courseId, index) {
      await updateCourseRecommend({
        courseId: courseId,
        isRecommend: 0
      });
      if (this.EditSort) {
        //非编辑状态
        this.getList();
        this.$notify({
          title: '成功',
          message: '取消成功',
          type: 'success',
          duration: 2000
        });
      } else {
        this.courses.splice(index, 1);
        this.SortList[courseId] = null;
      }
    }
  }
};
</script>
<style scoped>
.el-input {
  width: auto;
}
.marginBottom {
  margin-bottom: 25px;
}
.addCourse {
  margin: 25px;
}
</style>
