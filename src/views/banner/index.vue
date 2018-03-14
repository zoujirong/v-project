<template>
    <div class="app-container">
        <div class="btn-top">
            <button class="el-button el-button--primary el-button--medium" @click="addShow=true">新增推荐位</button>
        </div>
        <!-- 表格部分 -->
        <template>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" :index="indexMethod" label="序号" width="180"></el-table-column>
                <el-table-column prop="title" label="推荐位名称" width="180"></el-table-column>
                <el-table-column prop="url" label="图片"></el-table-column>
                <el-table-column prop="courseId" label="课程id"></el-table-column>
                <el-table-column prop="startDate" label="课程名称"></el-table-column>
                <el-table-column prop="startDate" label="开始时间"></el-table-column>
                <el-table-column prop="endDate" label="结束时间"></el-table-column>
                <el-table-column prop="startDate" label="创建时间"></el-table-column>
                <el-table-column prop="startDate" label="修改时间"></el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">上移</el-button>
                        <el-button type="text" size="small">下移</el-button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small"> 删除 </el-button>
                   </template>
                </el-table-column>
                
            </el-table>
       </template>
         
        <!-- 弹窗部分 -->
        <div class="vue-image-crop-upload" v-show="addShow">
            <div class="vicp-wrap">
                <div class="vicp-close" @click="addShow = false">
                    <i class="vicp-icon4"></i>
                </div>
                <div class="bannerform">
                    <form action="">
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium">
                            <label for="bannerList.title" class="el-form-item__label">推荐位名称</label>
                            <div class="el-form-item__content">
                                <el-input placeholder="请输入推荐位名称" v-model="bannerList.title" clearable></el-input>
                            </div>
                        </div>
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium updatapic">
                            <label for="title" class="el-form-item__label">图片</label>
                            <div class="el-form-item__content updata">
                                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :limit='1' :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                            </div>
                        </div>
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium">
                            <label for="title" class="el-form-item__label">对应跳转的课程id</label>
                            <div class="el-form-item__content">
                                <el-input placeholder="请输入对应跳转的课程id" v-model="bannerList.courseId" clearable></el-input>
                            </div>
                        </div>
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium">
                            <label for="title" class="el-form-item__label">开始时间</label>
                            <div class="el-form-item__content block">
                                <el-date-picker v-model="bannerList.startDate" type="datetime" placeholder="选择日期"  :picker-options="pickr"></el-date-picker>
                            </div>
                        </div>
                        <div class="el-form-item postInfo-container-item el-tooltip item el-form-item--medium">
                            <label for="title" class="el-form-item__label">结束时间</label>
                            <div class="el-form-item__content demo-input-suffix">
                                <el-date-picker v-model="bannerList.endDate" type="datetime" placeholder="选择日期" :picker-options="pickr"></el-date-picker>
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
            bannerList:{
              title: '',
              url:'',
              courseId:'',
              startDate:'',
              endDate:'' ,
              nowDate:'',
              creatDate:''
            },
            pickr:{
                disabledDate(time) {
                    return Date.now() > time.getTime() ;
                }
            },
            fileList2:[],
            tableData:[]
        }
    },
    methods:{
        submit(e){
            e.preventDefault();
            if(this.bannerList.title != '' && this.bannerList.courseId != '' && this.bannerList.startDate != '' && this.bannerList.endDate !=''){
              this.tableData.push(this.bannerList)
            }
           this.bannerList.title = '';
           this.bannerList.courseId = '';
           this.bannerList.startDate = '';
           this.bannerList.endDate = ''
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
      }
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
    height: 510px;
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

