<template>
    <div class="app-container calendar-list-container">
        <el-input style="width: 200px;" class="filter-item"></el-input>
        <el-input style="width: 200px;" class="filter-item"></el-input>

        <el-select class="filter-item" style="width: 130px">
            <el-option>全部</el-option>
            <el-option>验证手机</el-option>
            <el-option>直接购买</el-option>
        </el-select>

        <el-button class="filter-item" type="primary" icon="el-icon-search">查询</el-button>
        <el-button class="filter-item" type="primary">重置</el-button>

     <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">

      </el-table>


    </div>
</template>






<script>
    export default {

    }
</script>
<style scoped>

</style>