<template>
  <div class="upload-container">
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>

    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
</script>

<style scoped>
.upload-container {
  display: flex;
  gap: 20px; /* 设置两个上传组件之间的间距 */
}

.upload-demo {
  flex: 1; /* 让两个上传组件平分容器宽度 */
  width: 300px; /* 设置上传框的宽度 */
  height: 200px; /* 设置上传框的高度 */
}

/* 调整内部元素的样式 */
.el-upload-dragger {
  width: 100%; /* 拖拽区域宽度填满父容器 */
  height: 100%; /* 拖拽区域高度填满父容器 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-icon--upload {
  font-size: 40px; /* 调整图标大小 */
  margin-bottom: 10px; /* 调整图标与文字间距 */
}

.el-upload__text {
  font-size: 14px; /* 调整文字大小 */
}

.el-upload__tip {
  font-size: 12px; /* 调整提示文字大小 */
}
</style>