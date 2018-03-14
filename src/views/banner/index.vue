<template>
    <div class="app-container">
        <div class="btn-top">
            <button class="el-button el-button--primary el-button--medium" @click="addShow=true">新增推荐位</button>
        </div>
        <!-- 表格部分 -->
        <template>
            <TablePager :data="tableData" :columns="columns" :pagination="pagination">
                <template slot="operate" slot-scope="{row}">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="up(row.$index, tableData)">上移</el-button>
                    <el-button type="text" size="small" @click="down(row.$index, tableData)">下移</el-button>
                    <el-button @click.native.prevent="deleteRow(row.$index, tableData)" type="text" size="small"> 删除 </el-button>
                </template>
           </TablePager>
       </template>   
        <!-- 弹窗部分 -->
        <div class="vue-image-crop-upload" v-show="addShow">
            <div class="vicp-wrap">
                <div class="vicp-close" @click="addShow = false">
                    <i class="vicp-icon4"></i>
                </div>
                <div class="bannerform">
                    <el-form :model="bannerList" :rules="rules" ref="bannerList" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="推荐位名称" prop='title'>
                            <el-input v-model="bannerList.title"></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :limit='1' :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="对应跳转的课程id" prop='courseId'>
                            <el-input v-model.number="bannerList.courseId"></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间" prop='startDate'>
                            <el-date-picker v-model="bannerList.startDate" type="datetime" placeholder="选择日期"  :picker-options="pickr"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间" prop='endDate'>
                            <el-date-picker v-model="bannerList.endDate" type="datetime" placeholder="选择日期" :picker-options="pickr"></el-date-picker>
                        </el-form-item>
                        <button class="el-button el-button--primary el-button--medium" @click="submit">提交</button>
                    </el-form>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import TablePager from '@/components/TablePager';
export default {
    data(){
        return {
            addShow:false,
            bannerList:{
              title: '',
              url:'',
              courseId:'',
              startDate:'',
              endDate:'' ,
              nowDate:new Date(),
              creatDate:''
            },
            pagination: {
                currentPage: 1,
                total: 400,
                pageSize: 100
            },
            columns: [
                {title: '序号', key: 'index'},
                {title: '推荐位名称', key: 'title'},
                {title: '图片', key: 'url'},
                {title: '课程id', key: 'courseId'},
                {title: '课程名称', key: 'status'},
                {title: '开始时间', key: 'startDate'},
                {title: '结束时间', slot: 'endDate'},
                {title: '创建时间', key: 'nowDate'},
                {title: '修改时间', key: 'creatDate'},
                {title: '操作', slot: 'operate'}
            ],
            pickr:{
                disabledDate(time) {
                    return Date.now() > time.getTime() ;
                }
            },
            fileList2:[],
            tableData:[],
            rules:{
                title: [
                  { required: true, message: '请输入推荐位名称', trigger: 'blur' }
                ],
                url:[
                    {required: true,message: '请上传图片', trigger: 'blur'}
                ],
                courseId:[
                    {required: true,message: '请输入课程id', trigger: 'blur'},
                    { type: 'number', message: '课程id必须为数字值'}
                ],
                startDate:[
                    {required: true,message: '请选择开始时间', trigger: 'blur'}
                ],
                endDate:[
                    {required: true,message: '请选择结束时间', trigger: 'blur'}
                ]
            }
        }
    },
    components: {
        TablePager
    },
    methods:{
        submit(e){
            e.preventDefault();
            if(this.bannerList.title != '' && this.bannerList.courseId != '' && this.bannerList.startDate != '' && this.bannerList.endDate !=''){
              this.tableData.push(this.bannerList);
            }
            this.$refs[this.bannerList].resetFields();
            console.log(this.tableData)
            this.addShow = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        deleteRow(index, rows){
            rows.splice(index, 1);
        },
        indexMethod(index) {
        return index + 1;
        },
        up(i) {
            console.log(i)
            var options = this.tableData;
            if (i === 0) {
                layer.msg('第一个不能上移哦');
                return;
            }
            var prev = options.slice(0, i - 1);
            var curr = options.slice(i - 1, i + 1).reverse();
            var tail = options.slice(i + 1);
            this.tableData = prev.concat(curr).concat(tail);
        },
        down(i) {
            console.log(i)
            var options = this.tableData;
            if (i === options.length - 1) {
                layer.msg('最后一个不能下移哦');
                return;
            }
            var prev = options.slice(0, i);
            var curr = options.slice(i, i + 2).reverse();
            var tail = options.slice(i + 2);
            this.tableDatan = prev.concat(curr).concat(tail);
        },
    }
}
</script>
<style>
  .operation a{padding: 0 10px}
  .btn-top{margin-bottom: 30px;padding-top: 10px}
  .el-table th.is-leaf,.el-table tr{text-align: center}
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
    height: 550px;
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
.el-form-item__label{width: 140px !important}
</style>

