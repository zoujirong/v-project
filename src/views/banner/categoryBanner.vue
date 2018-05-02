<template>
  <div class="categoryBanner">
    <el-button class="newAddButton" type="primary" @click="newAddCategory">新增推荐类目</el-button>
    <TablePager :data="categoryListData" :columns="column" :loading="loading" :pagination="{
            currentPage: requestData.pageNo,
            pageSize: requestData.pageSize,
            total: total}" @change="onChange ">
      <template slot="number" slot-scope="{row,index}">
        <span>{{index + 1}}</span>
      </template>
      <template slot="cover" slot-scope="{row}">
        <img :src="row.cover" alt="" />
      </template>
      <template slot="recomend" slot-scope="{row}">
        <span>{{row.recomend | parseTime(formatTime)}}</span>
      </template>
      <template slot="isRecommend" slot-scope="{row,index}">
        <span @click="clearRecomend(index)">取消推荐</span>
      </template>
    </TablePager>
    <!-- 新增推荐类目 -->
    <el-dialog title="新增推荐类目" :visible.sync="addDialog">
      <el-form>
        <el-form-item label="选择类目">
          <el-select v-model="addCategory.addcgName" placeholder="请选择活动区域" value-key="categoryName">
            <template v-for="item in chooesData ">
              <el-option :label="item.categoryName" :value="item.categoryName" :key="item.categoryName" @change="ChooseCategory"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="类目图标">
          <upload-image :limit="1" :fileList="[{url: 'http://abc.com/222.png'}]" @onSuccess="onUploadCategory"></upload-image>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCategoryHold">保存</el-button>
        <el-button @click="addDialog = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TablePager from '@/components/TablePager';
import UploadImage from '@/components/UploadImage';
import { listCategory } from '@/api/category';
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
      chooesData: [
        { categoryName: '111' },
        { categoryName: '2222' },
        { categoryName: '3333' }
      ],
      addCategory: {
        addcgName: '',
        addcgImage: ''
      }
    };
  },
  methods: {
    //   列表数据
    async categoryData() {
      this.loading = true;
      let res = await listCategory(this.requestData);
      this.loading = false;
      let { data, total } = res.data;
      this.categoryListData = data;

      this.total = total;
    },
    //   新增类目
    newAddCategory() {
      this.addDialog = true;
      console.log('新增推荐类目');
    },
    // 新增类目保存
    addCategoryHold() {
      this.addDialog = false;
      console.log('保存新增');
    },
    //新增 选择科目
    ChooseCategory() {
      console.log('选择科目');
    },
    // 取消类目推荐
    clearRecomend(index) {
      // console.log('d' + index);
      // let recomendId = this.categoryListData[index].categoryName;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 新增图标
    onUploadCategory() {
      console.log('新增图标');
    },
    //分页
    onChange({ pagination }) {
      // debugger
      let {
        page = this.requestData.pageNo,
        pageSize = this.requestData.pageSize
      } = pagination;
      Object.assign(this.requestData, {
        pageNo: page,
        pageSize
      });
      this.categoryData();
    }
  },
  components: {
    TablePager,
    UploadImage
  },
  created() {
    this.categoryData();
  }
};
</script>
<style>
.categoryBanner {
  margin: 15px;
}
.newAddButton {
  margin-bottom: 15px;
}
</style>

