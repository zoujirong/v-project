<template>
  <!-- 查看报名课程弹框 -->
  <el-dialog title="查看报名课程" :visible.sync='dialogVisible' @close='onDialogClose' @open="getUserApplyCourse">
    <el-form inline ref="checkForm" :model="checkParam">
      <el-form-item prop="courseParam">
        <el-input v-model.trim="checkParam.courseParam" placeholder="输入课程名称查询"></el-input>
      </el-form-item>
      <el-form-item prop="presentWay">
<<<<<<< HEAD
        <el-select placeholder="免费报名" v-model.trim="checkParam.presentWay">
          <el-option v-for="(value,key) in options" :key="key" :label="value" :value="key">
=======
        <el-select placeholder="免费报名" v-model="checkParam.presentWay">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
>>>>>>> 870c24c892aac85b6b1579e008d122484e6942df
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click='getUserApplyCourse'>查询</el-button>&nbsp;&nbsp;
      <el-button @click='resetCheck'>重置</el-button>
    </el-form>
    <TablePager :data='data' :pagination="{currentPage:this.pagination1.pageNo,pageSize:this.pagination1.pageSize,total:total}" :columns="columns1" :loading="listLoading" @change="onTableChange">
      <template slot-scope="{row,index}" slot="numberId">
        <span>{{index+1}}</span>
      </template>
<<<<<<< HEAD
      <template slot-scope="{row,index}" slot="presentWay">
        <span>{{options[row.marketWay]}}</span>
      </template>
=======
>>>>>>> 870c24c892aac85b6b1579e008d122484e6942df
    </TablePager>
  </el-dialog>
</template>
<script>
import { getApplyCourse } from '@/api/member.js';
import TablePager from '@/components/TablePager';
export default {
  data() {
    return {
      dialogVisible: this.visible,
      listLoading: true,
      //查看报名课程
      checkParam: {
        courseParam: '',
        presentWay: '',
        pageNo: 1,
        pageSize: 10
      },
      pagination1: {
        pageNo: 1,
        pageSize: 10
      },
      columns1: [
        { title: '序号', slot: 'numberId' },
        { title: '课程名称', key: 'courseName' },
        { title: '学员行为', slot: 'presentWay' }
      ],
      data: [],
      options: {
        3: '免费报名',
        2: '购买',
        1: '验证购买'
      },
      total: 0
    };
  },
  props: {
    userId: [String, Number],
    visible: Boolean
  },
  watch: {
    visible(visible) {
      this.dialogVisible = visible;
    }
  },
  components: { TablePager },
  methods: {
    //查看报名课程
    async getUserApplyCourse() {
      this.listLoading = true;
      let res = await getApplyCourse({
        ...this.checkParam,
        uid: this.userId
      }).finally(() => {
        this.listLoading = false;
      });
      this.data = res.data.data;
      this.total = res.data.total;
    },
    onDialogClose() {
      let form = this.$refs.checkForm;
      form.resetFields();
      this.$emit('close', false);
    },
    //重置查看课程列表
    resetCheck() {
      let form = this.$refs.checkForm;
      form.resetFields();
      this.getUserApplyCourse();
    },
    //切换分页
    onTableChange({ pagination }) {
      let {
        page: pageNo = this.pagination1.pageNo,
        pageSize = this.pagination1.pageSize
      } = pagination;
      Object.assign(this.pagination1, {
        pageNo,
        pageSize
      });
      this.getUserApplyCourse();
    }
  }
};
</script>
