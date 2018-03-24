<template>
  <!-- 编辑课程弹窗 -->
  <div ref='dataForm' class="addCourse">
    <el-form inline class='marginBottom' :model="searchParam" ref='searchForm'>
      <el-form-item label="编辑推荐课程" prop="courseParam">
        <el-input v-model="searchParam.courseParam" placeholder="课程名或课程id进行查询" clearable size="small" @keyup.enter='getList'></el-input>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      &nbsp;&nbsp;
      <el-button @click='reset'>重置</el-button>
      <br><br>
      <el-button type="primary" @click='editSort' v-if='EditSort'>编辑排序</el-button>
      <el-button type="success" @click='saveEditSort' v-else>保存</el-button>
    </el-form>
    <TablePager :data='courses' :columns="columns2" :pagination="false" row-key="courseId">
      <template slot='position' slot-scope='{row,index}'>
        <span>{{index+1}}</span>
      </template>
      <template slot="sort" slot-scope="{row}" ref='sortPart'>
        <svg-icon class='drag-handler' icon-class="drag" style="color:#409EFF"></svg-icon>
      </template>
      <template slot="handle" slot-scope="{row,index}">
        <el-button type="text" @click="delCourse(row.courseId,index)"> 取消推荐</el-button>
      </template>
    </TablePager>
  </div>
</template>

<script>
import { categoryCourse, sortCategoryCourse } from '@/api/category';
import { updateCourseRecommend } from '@/api/course';
import Sortable from 'sortablejs';
import TablePager from '@/components/TablePager';
import { fetchList } from '@/api/article';
export default {
  data() {
    return {
      listLoading: true,
      sortable: '',
      EditSort: true,
      searchParam: {
        categoryId: '',
        courseParam: ''
      },
      columns2: [
        { title: '位置', slot: 'position' },
        { title: '课程id', key: 'courseId' },
        { title: '课程名称', key: 'courseName' },
        { title: '操作', slot: 'handle' }
      ],
      courses: [
        { courseId: '25', courseName: '设计质量1', sort: 'start' },
        { courseId: '20', courseName: '设计质量2', sort: '' },
        { courseId: '13', courseName: '工业设计3', sort: 'end' }
      ],
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
      SortList: {},
      weight: ''
    };
  },
  components: { TablePager },
  created() {
    this.getList();
    this.drag();
  },
  computed: {
    categoryId() {
      return this.$router.params.categoryId;
    }
  },
  methods: {
    //获取推荐课程列表
    getList() {
      this.listLoading = true;
      categoryCourse(categoryId).then(res => {
        this.listLoading = false;
        this.courses = res.data.course;
      });
    },

    //重置
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      this.getList();
    },
    //编辑排序
    editSort() {
      this.columns2.splice(3, 0, { title: '排序', slot: 'sort' });
      this.EditSort = !this.EditSort;
    },
    //保存排序
    saveEditSort() {
      this.columns2.splice(3, 1);
      if (this.oldIndex !== this.newIndex) {
        let key = this.courses[this.newIndex].courseId;
        if (this.oldIndex == 0) {
          this.weight = this.courses[this.oldIndex + 1].weight / 2;
        } else if (this.oldIndex + 1 == this.courses.length) {
          this.weight = this.courses[this.oldIndex - 1].weight + 1;
        } else {
          this.weight =
            (this.courses[this.oldIndex - 1].weight +
              this.courses[this.oldIndex + 1].weight) /
            2;
        }
        this.SortList[key] = this.weight;

        this.sortCourse = Object.keys(this.SortList).map(item => ({
          courseId: item,
          weight: this.SortList[item]
        }));
        console.log(this.sortCourse);
      }
      // sortCategoryCourse({this.categoryId,this.sortCourse}).then(res => {
      // this.getList();
      // });
      this.EditSort = !this.EditSort;
    },
    //拖拽
    drag() {
      this.oldList = this.courses.map(v => v.courseId);
      this.newList = this.oldList.slice();
      this.$nextTick(() => {
        this.setSort();
      });
    },
    setSort() {
      const el = document.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0];
      console.log(el);
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '');
        },
        onEnd: evt => {
          const targetRow = this.courses.splice(evt.oldIndex, 1)[0];
          this.courses.splice(evt.newIndex, 0, targetRow);
          this.oldIndex = evt.oldIndex; //被拖动后的位置
          this.newIndex = evt.newIndex; //被拖动的元素的位置
        }
      });
    },
    //删除推荐课程
    async delCourse(row, index) {
      await updateCourseRecommend({
        courseId: row.courseId,
        isRecommend: 0
      });
      this.courses.splice(index, 1);
      this.$notify({
        title: '成功',
        message: '取消成功',
        type: 'success',
        duration: 2000
      });
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
