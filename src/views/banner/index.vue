<template>
    <div class="app-container">
        <div class="btn-top">
            <button class="el-button el-button--primary el-button--medium">新增推荐位</button>
        </div>
        <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--medium">
            <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header">
                    <thead class="has-gutter">
                        <tr>
                            <th colspan="1" rowspan="1" class="el-table_1_column_7  is-center   is-leaf">
                                <div class="cell">序号</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_8  is-center   is-leaf">
                                <div class="cell">推荐位名称</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_9  is-center   is-leaf">
                                <div class="cell">图片</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_10  is-center   is-leaf">
                                <div class="cell">课程id</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_11  is-center   is-leaf">
                                <div class="cell">课程名称</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_12  is-center   is-leaf">
                                <div class="cell">开始时间</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_13  is-center   is-leaf">
                                <div class="cell">结束时间</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_14  is-center   is-leaf">
                                <div class="cell">创建时间</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_15  is-center   is-leaf">
                                <div class="cell">修改时间</div>
                            </th>
                            <th colspan="1" rowspan="1" class="el-table_1_column_16  is-center   is-leaf">
                                <div class="cell">操作</div>
                            </th>
                            <th class="gutter" style="width: 0px;"></th>
                        </tr>
                    </thead>
            </table>
            </div>
            <!-- 表格内容部分 -->
            <div class="el-table el-table__body-wrapper is-scroll-left">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body">
                    <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_7 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_8 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_9 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_10 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_11 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_12 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_13 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_14 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_15 is-center ">
                                <div class="cell">0</div>
                            </td>
                            <td class="el-table_1_column_16 is-center ">
                                <div class="cell operation">
                                    <a href="javascript:;">编辑</a>
                                    <a href="javascript:;">下移</a>
                                    <a href="javascript:;">上移</a>
                                    <a href="javascript:;">删除</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
  
}
</script>
<style>
  .operation a{padding: 0 10px}
  .btn-top{margin-bottom: 30px;padding-top: 10px}
  .el-table_1_column_7{width: 80px}
  .el-table_1_column_8{width: 120px}
  .el-table_1_column_9{width: 200px}
  .el-table_1_column_10{width: 80px}
  .el-table_1_column_11{width: 200px}
  .el-table_1_column_12{width: 180px}
  .el-table_1_column_13{width: 180px}
  .el-table_1_column_14{width: 180px}
  .el-table_1_column_15{width: 180px}
  .el-table_1_column_16{width: 260px}
</style>

