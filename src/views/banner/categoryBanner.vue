<template>
  <div class="categoryBanner">
    <el-button class="newAddButton" type="primary" @click="addDialog = true">新增推荐类目</el-button>
    <!-- :pagination="{
            currentPage: requestData.pageNo,
            pageSize: requestData.pageSize,
            total: total}" @change="onChange " -->
    <TablePager :data="list" :columns="column" :loading="loading">
      <template slot="number" slot-scope="{row,index}">
        <span>{{index + 1}}</span>
      </template>
      <template slot="cover" slot-scope="{row}">
        <img :src="row.cover" alt="" />
      </template>
      <template slot="recommendTime" slot-scope="{row}">
        <span>{{row.recommendTime | parseTime(formatTime)}}</span>
      </template>
      <template slot="isRecommend" slot-scope="{row,index}">
        <el-button type="text" @click="clearRecomend(row)">取消推荐</el-button>
        <!-- <el-button type="text" @click="clearRecomend(row)" v-else>设为推荐</el-button> -->

      </template>
    </TablePager>
    <!-- 新增推荐类目 -->
    <el-dialog title="新增推荐类目" :visible.sync="addDialog" @close="resetForm()">
      <el-form :model="addRecomParam" :rules="rules" ref="addRecomParam" :inline-message="true" validate-on-rule-change>
        <el-form-item label="选择类目" prop="categoryId">
          <el-select v-model="addRecomParam.categoryId" placeholder="请选择活动区域">
            <template v-for="item in chooesData ">
              <el-option :label="item.categoryName" :value="item.categoryId" :key="item.categoryId"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label=" 类目图标 " prop="cover">
          <upload-image v-model="addRecomParam.cover" :limit="1 " :fileList="addRecomParam.cover ? [{url:addRecomParam.cover}] :[] " @onSuccess="onUploadCategory ">
          </upload-image>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer ">
        <el-button type="primary " @click="addCategoryHold()">保存</el-button>
        <el-button @click="addDialog=false ">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TablePager from '@/components/TablePager';
import UploadImage from '@/components/UploadImage';
import { listCategory } from '@/api/category';
import { setRecommend } from '@/api/banner'; //新增推荐类目
// import { updateCourseRecommend } from '@/api/course';
import { parseTime } from '@/utils/index';
export default {
  data() {
    return {
      formatTime: '{y}-{m}-{d} {h}:{m}:{s}',
      loading: false,
      addDialog: false,
      requestData: {
        isRecommend: true,
        pageSize: 10,
        pageNo: 1
      },
      total: 0,
      column: [
        { title: '序号', slot: 'number' },
        { title: '类目名称', key: 'categoryName' },
        { title: '图片', slot: 'cover' },
        { title: '推荐时间', slot: 'recommendTime' },
        { title: '操作', slot: 'isRecommend' }
      ],
      categoryListData: [],
      //   新增选择类目
      chooesData: [],
      addRecomParam: {
        categoryId: '',
        isRecommend: true,
        cover: ''
      },
      list: [],
      rules: {
        categoryId: [{ required: true, message: '请选择类目名称' }],
        cover: [{ required: true, message: '请上传图片' }]
      }
    };
  },
  methods: {
    //类目
    async getCAtegory() {
      let res = await listCategory({
        pageNo: this.requestData.pageNo,
        pageSize: this.requestData.pageSize
      });
      this.categoryListData = res.data.data;
      this.chooesData = this.categoryListData.map(i => {
        return { categoryId: i.categoryId, categoryName: i.categoryName };
      });
    },
    //   列表数据
    async categoryData() {
      this.loading = true;
      let res = await listCategory(this.requestData);
      this.loading = false;
      let { data, total } = res.data;
      this.list = data;
      this.total = total;
      console.log(this.total);
      // this.list.map(response => {
      //   if (response.isRecommend == true) {
      //     return this.recommendNum++;
      //   }
      // });
      // console.log(this.recommendNum);
    },
    // 新增类目保存
    async addCategoryHold() {
      let form = this.$refs.addRecomParam;
      let res = await form.validate();
      if (!res) return Promise.reject({ msg: '信息有误' });

      // 类目推荐限制 4 条
      let Total = this.total + 1;
      if (Total <= 4) {
        await setRecommend({ ...this.addRecomParam });
        this.categoryData();
      } else {
        this.$message({
          type: 'error',
          message: '只能新增4条类目推荐'
        });
      }
      this.addDialog = false;
    },
    //重置表单内容
    resetForm() {
      this.$refs.addRecomParam.resetFields();
    },
    // 类目推荐、取消推荐
    async clearRecomend(row) {
      await this.$confirm('此操作将取消该类目推荐, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      await setRecommend({
        categoryId: row.categoryId,
        isRecommend: !row.isRecommend
      });
      this.$message({
        type: 'success',
        message: '成功取消推荐!'
      });

      this.categoryData();
      // console.log(row.categoryId);
    },
    // 新增图标
    onUploadCategory(urls) {
      this.addRecomParam.cover = urls[0];
      this.$refs.addRecomParam.validateField('cover');
    }
    //分页
    // onChange({ pagination }) {
    //   let {
    //     page = this.requestData.pageNo,
    //     pageSize = this.requestData.pageSize
    //   } = pagination;
    //   Object.assign(this.requestData, {
    //     pageNo: page,
    //     pageSize
    //   });
    //   this.categoryData();
    // }
  },
  components: {
    TablePager,
    UploadImage
  },
  created() {
    this.categoryData();
    this.getCAtegory();
  }
};
</script>
<style scoped>
.categoryBanner {
  margin: 15px;
}
.newAddButton {
  margin-bottom: 15px;
}
.cell img {
  width: 100px;
  height: 50px;
}
</style>

