<template>
    <div class="fl">
        <el-upload action="" accept="image/*" listType="picture-card" :limit="limit" :fileList="files" :autoUpload="false" :onChange="onChange" :onPreview="onPreview" :onExceed="onExceed">
            <div class="upload-tips">
                <i class="el-icon-plus"></i>
                <br>
                <span>选择图片并上传</span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="showPreview">
            <img width="100%" :src="previewUrl">
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: {
    limit: Number,
    fileList: Array
  },
  data() {
    return {
      files: this.fileList || [],
      showPreview: false,
      previewUrl: ''
    };
  },
  watch: {
    fileList(fileList) {
      this.files = fileList || [];
    }
  },
  methods: {
    getFileUrl(file) {
      return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.addEventListener('load', () => {
          resolve(fr.result);
        });
        fr.addEventListener('error', reject);
        fr.readAsDataURL(file);
      });
    },
    upload() {
      this.$emit('onSuccess', this.files.map(file => file.url));
    },
    onChange(file, fileList) {
      this.files = fileList;
      this.upload();
    },
    onPreview(file) {
      this.previewUrl = file.url;
      this.showPreview = true;
    },
    onExceed(files, fileList) {
      this.getFileUrl(files[0]).then(url => {
        this.files.splice(this.files.length - 1, 1, {
          url
        });
        this.upload();
      });
    }
  }
};
</script>
<style scoped>
.inline-block {
  display: inline-block;
}
.upload-tips {
  color: #ccc;
  line-height: normal;
}
.upload-tips > *:first-child {
  margin: 40px 0 7px 0;
}
</style>

