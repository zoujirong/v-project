<template>
  <div class="text-center" element-loading-text="加载中..." v-loading="loading">
    <el-table border :data="data" empty-text="没有相关的数据" :row-key="rowKey" @sort-change="onSortChange">
      <template v-for="column in columns">
        <el-table-column :label="column.title" :prop="column.key" :sortable="column.sortable || false">
          <template slot-scope="{row, $index: index}">
            <slot v-if="column.slot" :name="column.slot" :row="row" :index="index"></slot>
            <span v-else>{{row[column.key]}}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination-container" v-if="pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, prev, pager, next, sizes, jumper" :total="total">
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
  watch: {
    pagination(pagination) {
      let { currentPage, total, pageSize } = this.pagination;
      this.currentPage = currentPage;
      this.total = total;
      this.pageSize = pageSize;
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: Array,
    data: Array,
    /**
     * @pagination: false/Object
     * currentPage: Number
     * total: Number
     * pageSize: Number
     */
    pagination: [Boolean, Object],
    rowKey: [Function, String]
  },
  methods: {
    convert(a) {
      console.log(a);
    },
    handleSizeChange(val) {
      this.$emit('change', {
        pagination: { pageSize: val }
      });
    },
    handleCurrentChange(val) {
      this.$emit('change', {
        pagination: { page: val }
      });
    },
    onSortChange({ prop, order }) {
      this.$emit('change', {
        sort: {
          [prop]: order === 'ascending' ? 1 : 0
        }
      });
    }
  }
};
</script>