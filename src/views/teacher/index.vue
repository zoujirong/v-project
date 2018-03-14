<template>
  <div class="app-container calendar-list-container">
    <!-- 搜索功能 -->
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="input" placeholder="输入讲师姓名"></el-input>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button type="primary">重置</el-button>
    </div>

    <!-- 讲师列表循环 -->
    <el-table :data="tableData3" border style="width: 100%">
      <el-table-column prop="date" label="讲师姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="讲师简介"> </el-table-column>
      <!-- 管理操作 -->
      <el-table-column label="管理操作" width="230">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogVisible = true">编辑讲师</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form type="index" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('讲师姓名：')" prop="title">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item :label="$t('讲师简介：')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('讲师照片')">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
            <el-button size="small" type="primary">点击上传图片</el-button>
            <div slot="tip" class="el-upload__tip">要求：图片宽高像素分别为 200 * 200</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>

    </el-dialog>
  </div>

</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "complexTable",
  directives: {
    waves
  },
  data() {
    return {
      input: "",
      fileList2: [{ name: "food.jpeg" }],
      tableData3: [
        {
          date: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],

      dialogVisible: false,
      tableKey: 0,
      list: null,
      listQuery: {
        limit: 10
      },
      temp: {
        // id: undefined,
        // importance: 1,
        // remark: '',
        // timestamp: new Date(),
        // title: '',
        // type: '',
        // status: 'published'
      }
    };
  },
  //   filters: {
  //     // statusFilter(status) {
  //     //   const statusMap = {
  //     //     published: 'success',
  //     //     draft: 'info',
  //     //     deleted: 'danger'
  //     //   }
  //     //   return statusMap[status]
  //     // },
  //     // typeFilter(type) {
  //     //   return calendarTypeKeyValue[type]
  //     // }
  //   },
  created() {
    this.getList();
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    // 循环列表
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
      });
    }
  }
};
</script>



<style scoped>
.fixed-width .el-button--mini {
  width: 72px;
}
.filter-item {
  margin-right: 15px;
}
</style>
