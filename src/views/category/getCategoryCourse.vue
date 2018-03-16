<template>
  <!-- 编辑课程弹窗 -->
  <div ref='dataForm' class="addCourse">
    <div class='marginBottom'>
      编辑推荐课程: 
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-input v-model="input1" placeholder="课程名或课程id进行查询" clearable size="small" @keyup.enter='searchList'></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="searchList()">查询</el-button>
      &nbsp;&nbsp;
      <el-button>重置</el-button>
      <br><br>
      <el-button type="primary">编辑排序</el-button>
    </div>
    <!-- <TablePager :data='courses' :columns="columns2" :pagination="pagination">
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
        <svg-icon class='drag-handler' icon-class="drag"></svg-icon> &nbsp;&nbsp;
      </template>
      <template slot="handle" slot-scope="{row,index}">
        <el-button type="text" @click="delCourse(row.courseId,index)"> 取消推荐</el-button>
      </template>
    </TablePager> -->
    <el-table :data="courses" row-key="id">
      <el-table-column class-name="status-col" label="Status" width="110">
        <el-table-column align="center" label="ID" width="65">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="drag">
        <template slot-scope="{row}">
          <svg-icon class='drag-handler' icon-class="drag"></svg-icon> &nbsp;&nbsp;
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { categoryCourse } from '@/api/category';
import Sortable from 'sortablejs';
import TablePager from '@/components/TablePager';
import { fetchList } from '@/api/article';
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
        { title: '排序', slot: 'sort' },
        { title: '操作', slot: 'handle' }
      ],
      // courses: [
      //   { courseId: '25', courseName: '设计质量1', sort: 'start' },
      //   { courseId: '20', courseName: '设计质量2', sort: '' },
      //   { courseId: '13', courseName: '工业设计3', sort: 'end' }
      // ],
      // 拖拽
      sortable: '',
      oldList: [],
      newList: [],
      courses: [],

      listQuery:{
        courseId:'',
        courseName:'',
        weight:''
      }
    };
  },
  components: { TablePager },
  created() {
    this.getList();
    // this.aaa();
  },
  methods: {
    //获取推荐课程列表
    // getList() {
    //   getCategoryCourse(this.listQuery).then(res => {
    //     return (this.courses = res.data.course);
    //   });
    // },

    //查询
    searchList() {
      this.listQuery.courseId = 1;
      this.getList()
    },

    //拖拽
    // aaa() {
    //   this.oldList = this.courses.map(v => v.courseId);
    //   this.newList = this.oldList.slice();
    //   this.$nextTick(() => {
    //     this.setSort();
    //   });
    // },
    getList() {
      // this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.courses = response.data.items;
        // this.total = response.data.total;
        this.listLoading = false;
        this.oldList = this.courses.map(v => v.id);
        this.newList = this.oldList.slice();
        this.$nextTick(() => {
          this.setSort();
        });
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
          console.log(111);
          const targetRow = this.courses.splice(evt.oldIndex, 1)[0];
          this.courses.splice(evt.newIndex, 0, targetRow);
          console.log(this.courses);
        }
      });
    },
    //删除推荐课程
    delCourse(courseId, index) {
      console.log(courseId);

      this.courses.splice(index, 1);
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
