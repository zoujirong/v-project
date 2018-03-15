<template>
    <div class="text-center" element-loading-text="获取数据中..." v-loading="loading">
        <el-table border :data="data" empty-text="没有相关的数据">
            <template v-for="column in columns">
                <el-table-column :label="column.title">
                    <template slot-scope="{row, $index: index}">
                        <slot v-if="column.slot" :name="column.slot" :row="row" :index="index"></slot>
                        <span v-else>{{row[column.key]}}</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[50, 100, 150, 200]" :page-size="pageSize" layout="total, prev, pager, next, sizes, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    let { currentPage, total, pageSize } = this.pagination;
    return {
      currentPage,
      total,
      pageSize
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    columns: Array,
    data: Array,
    /**
     * currentPage: Number
     * total: Number
     * pageSize: Number
     */
    pagination: Object
  },
  methods: {
    convert(a) {
      console.log(a);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>