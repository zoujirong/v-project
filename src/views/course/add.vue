<template>
    <el-form>
        <el-form-item label="课程标题">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="课程类型">
            <el-radio>直播课</el-radio>
            <el-radio>录播课</el-radio>
        </el-form-item>
        <el-form-item label="课程类目">
            <el-radio>产品设计</el-radio>
            <el-radio>产品策划</el-radio>
        </el-form-item>
        <el-form-item label="潭州课堂ID">
            <el-input placeholder="填写潭州课程的课程ID（数字）"></el-input>
        </el-form-item>
        <el-form-item label="主讲老师">
            <el-select></el-select>
        </el-form-item>
        <el-form-item label="课程封面">

        </el-form-item>
        <el-form-item label="课程介绍">

        </el-form-item>
        <el-form-item label="课程价格">
            <el-input-number></el-input-number>
        </el-form-item>
        <el-form-item label="客服微信">
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <el-button>保存并下一步</el-button>
            <el-button>返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    
</script>
