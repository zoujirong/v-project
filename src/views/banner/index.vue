<template>
    <div class="app-container">
        <div class="btn-top">
            <button class="el-button el-button--primary el-button--medium" @click="addShow=true">新增推荐位</button>
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
        <!-- 弹窗部分 -->
        <div class="vue-image-crop-upload" v-show="addShow">
            <div class="vicp-wrap">
                <div class="vicp-close" @click="addShow = false">
                    <i class="vicp-icon4"></i>
                </div>
                <div class="bannerform">
                    <form action="">
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium">
                            <label for="title" class="el-form-item__label">推荐位名称</label>
                            <div class="el-form-item__content">
                                <el-input placeholder="请输入推荐位名称" v-model="title" clearable></el-input>
                            </div>
                        </div>
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium updatapic">
                            <label for="title" class="el-form-item__label">图片</label>
                            <div class="el-form-item__content updata">
                                <input type="file">
                                <button class="el-button el-button--primary el-button--medium">上传图片</button>
                            </div>
                        </div>
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium">
                            <label for="title" class="el-form-item__label">对应跳转的课程id</label>
                            <div class="el-form-item__content">
                                <el-input placeholder="请输入对应跳转的课程id" v-model="courseId" clearable></el-input>
                            </div>
                        </div>
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium">
                            <label for="title" class="el-form-item__label">开始时间</label>
                            <div class="el-form-item__content block">
                                <el-date-picker v-model="startDate" type="datetime" placeholder="选择日期"  :picker-options="pickr"></el-date-picker>
                            </div>
                        </div>
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium">
                            <label for="title" class="el-form-item__label">结束时间</label>
                            <div class="el-form-item__content demo-input-suffix">
                                <el-date-picker v-model="endDate" type="datetime" placeholder="选择日期" :picker-options="pickr"></el-date-picker>
                            </div>
                        </div>
                        <button class="el-button el-button--primary el-button--medium" @click="submit">提交</button>
                    </form>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            addShow:false,
            title: '',
            courseId:'',
            startDate:'',
            endDate:'',
            pickr:{
                disabledDate(time) {
                    return Date.now() > time.getTime() ;
                }
            }
        }
    },
    methods:{
        submit(){
            this.title = '';
            this.courseId = '';
            this.startDate = '';
            this.endDate = ''
            this.addShow = false;
        }
    }
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
  .el-table_1_column_9 img{
      width: 100%;
      height: 100%
  }
  .vue-image-crop-upload .vicp-wrap{
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    position: fixed;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 600px;
    height: 410px;
    padding: 25px;
    background-color: #fff;
    border-radius: 2px;
    -webkit-animation: vicp-data-v-50443b38 0.12s ease-in;
    animation: vicp-data-v-50443b38 0.12s ease-in;
}
.vue-image-crop-upload{
    position: fixed;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    -webkit-tap-highlight-color: transparent;
    -moz-tap-highlight-color: transparent;
}
.vue-image-crop-upload .vicp-wrap .vicp-close{
    position: absolute;
    right: -30px;
    top: -30px;
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4{
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    -webkit-transition: -webkit-transform 0.18s;
    transition: -webkit-transform 0.18s;
    transition: transform 0.18s;
    transition: transform 0.18s, -webkit-transform 0.18s;
    -webkit-transform: rotate(0);
    transform: rotate(0);
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after, .vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::before {
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    content: '';
    position: absolute;
    top: 12px;
    left: 4px;
    width: 20px;
    height: 3px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    background-color: #fff;
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
}
.table__header{
    width: 100%
}
.updatapic{position: relative}
.updata input{opacity: 0;position: absolute;top: 0;left: 82px;width: 98px;height: 36px}
.updata button{margin-left: 42px;}
.el-form-item__content{float: left}
</style>

