<template>
  <!-- 编辑课程弹窗 -->
  <div ref='dataForm' class="addCourse">
    <div class='marginBottom'>
      编辑推荐课程: &nbsp;&nbsp;&nbsp;&nbsp;
      <el-input v-model="input1" placeholder="课程名或课程id进行查询" clearable size="small"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="searchList(this.input1)">查询</el-button>&nbsp;&nbsp;
      <el-button>重置</el-button>
      <br><br>
      <el-button type="primary">编辑排序</el-button>
    </div>
    <TablePager :data='courses' :columns="columns2" :pagination="pagination">
      <template slot='position' slot-scope='{row,index}'>
        <span>{{index+1}}</span>
      </template>
      <template slot="sort" slot-scope="{row}">
        <span>
          <el-button v-if="row.sort == 'start'" type="text">下移 删除</el-button>
          <el-button v-else-if="row.sort == 'end'" type="text">上移 删除</el-button>
          <el-button v-else type="text">上移 下移 删除</el-button>
        </span>
      </template>
      <template slot="sort" slot-scope="{row}">
        <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
      </template>
    </TablePager>
  </div>
</template>

<script>
import { categoryCourse } from '@/api/category';
import Sortable from 'sortablejs';
import TablePager from '@/components/TablePager';
export default {
  data() {
    return {
      input1: '',
      sortable: '',
      search: '',
      pagination: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      },
      columns2: [
        { title: '位置', slot: 'position' },
        { title: '课程id', key: 'courseId' },
        { title: '课程名称', key: 'courseName' },
        { title: '排序', slot: 'sort' }
      ],
      courses: [
        { courseId: '25', courseName: '设计质量', sort: 'start' },
        { courseId: '25', courseName: '设计质量', sort: '' },
        { courseId: '13', courseName: '工业设计', sort: 'end' }
      ],
      oldList: [],
      newList: []
    };
  },
  components: { TablePager },
  created() {
    // this.getList()
  },
  methods: {
    //获取推荐课程列表
    getList() {
      getCategoryCourse().then(res => {
        return (this.courses = res.data.course);
      });
    },
    //查询
    searchList(v) {
      let search = v;
      if (search) {
        return this.courses.filter(function(i) {
          return Object.keys(i).reduce(() => {});
        });
      }
    },

    //拖拽
    setSort() {
      const el = document.querySelectorAll('')[0];
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '');
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0];
          this.courses.splice(evt.newIndex, 0, targetRow);

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
        }
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
