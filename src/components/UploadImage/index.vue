<template>
  <div class="inline-block">
    <el-upload action="" accept="image/jpg,image/jpeg,image/png,image/gif" listType="picture-card" :limit="limit" :fileList="files" :autoUpload="false" :onChange="onChange" :onPreview="onPreview" :onExceed="onExceed" :onRemove="onRemove">
      <div class="upload-tips">
        <i class="el-icon-plus"></i>
        <br>
        <span>选择图片并上传</span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="showPreview" append-to-body>
      <img width="100%" :src="previewUrl">
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage, getUploadParam } from '@/api/common';
import { getRandom } from '@/utils';
import env from '@/utils/env';
const IMG_URL = env.res;
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
  computed: {
    uploadParam() {
      return this.$store.getters.uploadParam;
    }
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
    async upload(file) {
      console.log(file);
      let res = await getUploadParam();
      let random = Array.from({ length: 6 })
        .map(() => getRandom(1, 10))
        .join('');
      let fileName = 'small_' + +new Date() + random + '.png';
      let { host, accessid, dir, policy, signature } = res.data;
      return uploadImage(host, {
        name: fileName,
        key: dir + '/' + fileName,
        policy,
        OSSAccessKeyId: accessid,
        success_action_status: 200,
        signature,
        file
      }).then(res => {
        return [IMG_URL, dir, fileName].join('/');
      });
    },
    onChange(file, fileList) {
      this.upload(file.raw).then(res => {
        let files = fileList.slice();
        files[files.length - 1].url = res;
        this.files = files;
        this.$emit('onSuccess', files.map(file => file.url));
      });
    },
    onPreview(file) {
      this.previewUrl = file.url;
      this.showPreview = true;
    },
    onExceed(files, fileList) {
      this.onChange({ raw: files[0] }, fileList);
    },
    onRemove(file, fileList) {
      this.files = fileList;
      this.$emit('onSuccess', fileList.map(file => file.url));
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

