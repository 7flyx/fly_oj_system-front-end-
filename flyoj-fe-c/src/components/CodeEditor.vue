<template>
  <el-select v-model="laguage" placeholder="java" style="width: 100px">
    <el-option v-for="item in laguages" :key="item" :label="item" :value="item" />
  </el-select>
  <div ref="editorform" class="ace-editor">
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/theme-eclipse"
import "ace-builds/src-noconflict/ext-language_tools";

const laguages = ref([
  "java"
])

// 创建响应式引用
const laguage = ref('')
const editorform = ref(null);
let editor = null;
const emit = defineEmits(['update:value']);

const options = {
  theme: `ace/theme/theme-twilight.js`,
  mode: `ace/mode/java`,
  maxLines: 40,
  minLines: 40,
  fontSize: 16,
};

// 初始化编辑器
onMounted(() => {
  editor = ace.edit(editorform.value, options);
  editor.setOptions({
    enableBasicAutocompletion: true,
  });
  editor.getSession().on('change', () => {
    // 当编辑器内容变化时，触发自定义事件并传递编辑器的内容
    emit('update:value', editor.getValue());
  });
  // editor.setTheme("ace/theme/twilight");
  editor.setHighlightActiveLine(false);
});

// 销毁编辑器实例
onBeforeUnmount(() => {
  if (editor) {
    editor.destroy();
    editor = null;
  }
});

function setAceCode(content) {
  editor.setValue(content)
}

defineExpose({
  setAceCode
})
</script>

<style lang="scss" scoped>
.ace-editor {
  height: 100%;
}

// 设置编辑器的滚动条样式
:deep(.ace_scrollbar)::-webkit-scrollbar {
  height: 7px;
  width: 7px;
}
:deep(.ace_scrollbar)::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #272822; /* Matches ace monokai */
  border-radius: 10px;
}
:deep(.ace_scrollbar)::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 10px;
}

</style>