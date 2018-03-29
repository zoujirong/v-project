<template>
  <div class="app-container">
    <el-form inline :model="searchParam" ref="searchForm">
      <el-form-item label="课程" prop="courseParam">
        <el-input placeholder="输入课程id或课程名称" v-model.trim="searchParam.courseParam"></el-input>
      </el-form-item>
      <el-form-item label="类目" prop="categoryId">
        <el-select placeholder="选择类目" v-model="searchParam.categoryId">
          <el-option value="">全部</el-option>
          <template v-for="cate in categoryList">
            <el-option :key="cate.categoryId" :value="cate.categoryId" :label="cate.categoryName"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
    <router-link :to="{name: 'courseDetail'}">
      <el-button type="primary">发布课程</el-button>
    </router-link>
    <TablePager :loading="loading" :data="data" :columns="columns" :pagination="{
      currentPage: searchParam.pageNo,
      pageSize: searchParam.pageSize,
      total: total
    }" @change="onTableChange">
      <template slot="teachingMethod" slot-scope="{row}">
        <span>{{row.teachingMethod == 0 ? '直播课' : '录播课'}}</span>
      </template>
      <template slot="unshelve" slot-scope="{row}">
        <span>{{row.unshelve == 0 ? '下架' : '上架'}}</span>
      </template>
      <template slot="coursePrice" slot-scope="{row}">
        <span class="text-success" v-if="row.coursePrice == 0">免费</span>
        <span class="text-error" v-else>￥{{row.coursePrice}}</span>
      </template>
      <template slot="operate" slot-scope="{row, index}">
        <div class="op-btn">
          <router-link :to="{name: 'courseDetail', query: {id: row.courseId}}">
            <el-button type="text">【编辑课程】</el-button>
          </router-link>
          <router-link :to="{name: 'courseChapter', params: {id: row.courseId}, query: {type: row.teachingMethod, num: row.chapterNum}}">
            <el-button type="text">【编辑课时】</el-button>
          </router-link>
          <el-button type="text" @click="setMarketing(row)" v-if="row.coursePrice!=0">【设置营销方式】</el-button>
          <el-button type="text" @click="unShelve(row, index)" v-if="row.unshelve == 1">【课程下架】</el-button>
          <el-button type="text" @click="shelve(row, index)" v-else>【课程上架】</el-button>
          <router-link :to="{name: 'courseStedent', query: {id: row.courseId}}">
            <el-button type="text">【管理学员】</el-button>
          </router-link>
          <el-button type="text" @click="unRecommend(row, index)" v-if="row.isRecommend==1">【取消推荐】</el-button>
          <el-button type="text" @click="recommend(row, index)" v-else>【设为推荐】</el-button>
        </div>
      </template>
    </TablePager>

    <!-- 设置营销方式 -->
    <el-dialog title="设置营销方式" width="500px" :close-on-click-modal="false" :visible.sync="marketing">
      <el-table class="text-center" :data="marketingList" border>
        <el-table-column label="选择">
          <template slot-scope="{row}">
            <el-checkbox :label="row.marketWayId" v-model="marketingWay">{{''}}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="营销方式名称" prop="marketWayName"></el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="marketing=false">取消</el-button>
        <el-button type="primary" @click="updateMarkting">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TablePager from '@/components/TablePager';
import {
  queryCourseList,
  updateCourseShelve,
  updateCourseRecommend
} from '@/api/course';
import { listCategory } from '@/api/category';
import {
  getMarketWay,
  setCourseMarketWay,
  getCancelCourseMarketWay
} from '@/api/market';
export default {
  data() {
    return {
      marketing: false,
      loading: true,
      categoryList: [],
      marketingList: [],
      choosedRow: {},
      marketingWay: [], //设置营销方式时选择的参数
      searchParam: {
        courseParam: '',
        categoryId: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      commonParam: {
        pageNo: 1,
        pageSize: 100
      },
      columns: [
        { title: '课程ID', key: 'courseId' },
        { title: '课程名称', key: 'title' },
        { title: '课程类目', key: 'categoryName' },
        { title: '课程类型', slot: 'teachingMethod' },
        { title: '课程状态', slot: 'unshelve' },
        { title: '主讲老师', key: 'mainTeacher' },
        { title: '课程价格', slot: 'coursePrice' },
        { title: '学员数量', key: 'courseApplyNum' },
        { title: '管理操作', slot: 'operate' }
      ],
      data: []
    };
  },
  components: {
    TablePager
  },
  methods: {
    async getList() {
      let form = this.$refs.searchForm;
      this.loading = true;
      let res = await queryCourseList(this.searchParam).finally(() => {
        this.loading = false;
      });
      let { data, total } = res.data;
      this.data = data;
      this.total = total;
    },
    async getCategory() {
      let res = await listCategory(this.commonParam);
      this.categoryList = res.data.data;
    },
    async getMarketing() {
      let res = await getMarketWay(this.commonParam);
      this.marketingList = res.data.data;
    },
    reset() {
      let form = this.$refs.searchForm;
      form.resetFields();
      this.getList();
    },
    onTableChange({ pagination }) {
      let {
        page: pageNo = this.searchParam.pageNo,
        pageSize = this.searchParam.pageSize
      } = pagination;
      Object.assign(this.searchParam, {
        pageNo,
        pageSize
      });
      this.getList();
    },
    setMarketing(row) {
      this.choosedRow = row;
      row.marketWayId && (this.marketingWay = [row.marketWayId]);
      this.marketingList.length === 0 && this.getMarketing();
      this.marketing = true;
    },
    shelve(row, index) {
      this.loading = true;
      this.updateShelve(row, index).then(res => {
        this.loading = false;
      });
    },
    //下架
    async unShelve(row, index) {
      let { courseId, unshelve } = row;
      await this.$confirm('您确定要下架该课程吗？', '温馨提示', {
        type: 'info',
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            this.updateShelve(row, index).then(res => {
              instance.confirmButtonLoading = false;
              //状态改变了说明请求成功了，可以关闭弹窗
              unshelve !== row.unshelve && done();
            });
          } else {
            done();
          }
        }
      }).catch(res => {
        //不是主动点取消的，是确认过程中出错了
        if (res !== 'cancel') throw res;
      });
    },
    //上下架请求
    async updateShelve(row, index) {
      let { courseId, unshelve } = row;
      let newStatus = +unshelve ^ 1;
      await updateCourseShelve({
        courseId,
        unshelve: newStatus
      });
      this.$message({
        type: 'success',
        message: '操作成功'
      });
      this.data[index].unshelve = newStatus;
    },
    async updateRecommend(row, index) {
      let { courseId, isRecommend } = row;
      let newStatus = +isRecommend ^ 1;
      await updateCourseRecommend({
        courseId,
        isRecommend: newStatus
      });
      this.$message({
        type: 'success',
        message: '操作成功'
      });
      this.data[index].isRecommend = newStatus;
    },
    async recommend(row, index) {
      this.loading = true;
      this.updateRecommend(row, index).then(res => {
        this.loading = false;
      });
    },
    async unRecommend(row, index) {
      let { isRecommend } = row;
      await this.$confirm('您确定要取消推荐该课程吗？', '温馨提示', {
        type: 'info',
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'cancel') {
            done();
            return;
          }
          instance.confirmButtonLoading = true;
          this.updateRecommend(row, index).then(res => {
            instance.confirmButtonLoading = false;
            isRecommend !== row.isRecommend && done();
          });
        }
      }).catch(res => {
        //不是主动点取消的，是确认过程中出错了
        if (res !== 'cancel') throw res;
      });
    },
    async updateMarkting() {
      let marketWay = this.marketingWay[0];
      if (marketWay == this.choosedRow.marketWayId) {
        this.marketing = false;
        return;
      }
      await (marketWay ? setCourseMarketWay : getCancelCourseMarketWay)({
        courseId: this.choosedRow.courseId,
        marketingWay: marketWay || this.choosedRow.marketWayId
      });
      this.$message.success('营销方式修改成功');
      this.choosedRow.marketWayId = marketWay;
      this.marketing = false;
    }
  },
  created() {
    this.getList();
    this.getCategory();
  }
};
</script>
<style scoped>
.op-btn .el-button {
  padding: 0;
  margin: 0;
}
.text-success {
  color: #67c23a;
}
.text-error {
  color: #f56c6c;
}
</style>
