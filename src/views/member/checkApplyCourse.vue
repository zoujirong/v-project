<template>
    <!-- 查看报名课程弹框 -->
    <el-dialog title="查看报名课程" :visible.sync='dialogVisible' @close='onDialogClose' @open="getUserApplyCourse">
        <el-form inline ref="checkForm" :model="checkParam">
            <el-form-item prop="courseName">
                <el-input v-model="checkParam.courseName" placeholder="输入课程名称查询"></el-input>
            </el-form-item>
            <el-form-item prop="presentWay">
                <el-select placeholder="免费报名" v-model="checkParam.presentWay">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click='getUserApplyCourse'>查询</el-button>&nbsp;&nbsp;
            <el-button @click='resetCheck'>重置</el-button>
        </el-form>
        <TablePager :data='data' :pagination="pagination" :columns="columns1" :loading="listLoading">
            <template slot-scope="{row,index}" slot="numberId">
                <span>{{index+1}}</span>
            </template>
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
        courseName: '',
        presentWay: '',
        pageNo: 1,
        pageSize: 10
      },
      pagination: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      },
      columns1: [
        { title: '序号', slot: 'numberId' },
        { title: '课程名称', key: 'courseName' },
        { title: '学员行为', key: 'presentWay' }
      ],
      data: [{ courseName: 'java初级班', presentWay: '免费报名' }],
      options: [
        {
          value: '选项1',
          label: '免费报名'
        },
        {
          value: '0',
          label: '购买'
        },
        {
          value: '1',
          label: '验证购买'
        }
      ]
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
      this.data = res.data;
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
    }
  }
};
</script>
