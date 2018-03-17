<template>
    <!-- 查看报名课程弹框 -->
    <el-dialog title="查看报名课程" :visible.sync='visible' @close='checkStatus'>
        <el-form inline ref="checkForm">
            <el-form-item prop="checkParam">
                <el-input v-model="checkParam.courseName" placeholder="输入课程名称查询"></el-input>
            </el-form-item>
            <el-form-item prop="options">
                <el-select placeholder="免费报名" v-model="value">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click='getUserApplyCourse()'>查询</el-button>&nbsp;&nbsp;
            <el-button @click='resetCheck'>重置</el-button>
        </el-form>
        <TablePager :data='data' :pagination="pagination" :columns="columns1">
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
      visible: this.dialogTableVisible,
      listLoading: true,
      //查看报名课程
      checkParam: {
        uid: '',
        courseName: '',
        presentWay: '',
        pageNo: '',
        pageSize: ''
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
          value: '选项2',
          label: '购买'
        },
        {
          value: '选项3',
          label: '验证购买'
        }
      ],
      value: ''
    };
  },
  props: {
    checkMumber: String,
    dialogTableVisible: Boolean
  },
  watch: {
    dialogTableVisible(dialogTableVisible) {
      this.visible = dialogTableVisible;
    }
  },
  components: { TablePager },
  methods: {
    //查看报名课程
    getUserApplyCourse() {
      this.listLoading = true;
      //   this.checkParam = this.checkMumber
      getApplyCourse(this.checkMumber).then(res => {
        this.listLoading = false;
        this.data = res.data.course;
      });
    },
    checkStatus() {
      this.$emit('change', false
      );
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
