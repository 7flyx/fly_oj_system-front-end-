<template>
  <!-- :destroy-on-close="true" 关闭抽屉的时候，子组件会被销毁 -->
  <el-drawer v-model="visibleDrawer" :destroy-on-close="true" :with-header="false" size="60%">
    <el-form :model="formModel" ref="formRef">
      <el-form-item label="题目标题:">
        <el-input style="width:387px !important" v-model="formQuestion.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="题目难度:">
        <QuestionSelector style="width:387px !important" v-model="formQuestion.difficulty" width="100%"
          placeholder="请选择题目难度">
        </QuestionSelector>
      </el-form-item>
      <el-form-item label="时间限制（单位毫秒）:">
        <el-input style="width:300px !important" v-model="formQuestion.timeLimit" placeholder="请输入时间限制"></el-input>
      </el-form-item>
      <el-form-item label="空间限制（单位字节）:">
        <el-input style="width:300px !important" v-model="formQuestion.spaceLimit" placeholder="请输入空间限制"></el-input>
      </el-form-item>
      <el-form-item label="题目内容:">
        <div class="editor editor-container" >
          <!-- <el-input placeholder="请输入题目内容" v-model="formQuestion.content" ></el-input> -->
          <!-- <v-md-editor 
            v-model="formQuestion.content" 
            height="300px"
            :disabled-menus="[]"
          /> -->
          <textarea id="markdown-editor" v-model="formQuestion.content"></textarea>
          <!-- <el-input style="width:387px !important" v-model="formQuestion.questionCase" placeholder="请输入题目用例"></el-input> -->
        </div>
      </el-form-item>
      <el-form-item label="题目用例:">
        <el-input style="width:387px !important" v-model="formQuestion.questionCase" placeholder="请输入题目用例"></el-input>
      </el-form-item>
      <el-form-item label="默认代码块:">
        <code-editor @update:value="handleEditorContent" ref="defaultCodeRef"></code-editor>
      </el-form-item>
      <el-form-item label="main函数:">
        <code-editor @update:value="handleEditorMainFunc" ref="mainFucRef"></code-editor>
      </el-form-item>
      <el-form-item>
        <el-button class="question-button" type="primary" plain @click="submitAndExit()">发布</el-button>
        <el-button class="question-button" type="info" plain @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import CodeEditor from './CodeEditor.vue'
import QuestionSelector from './QuestionSelector.vue';
import { ref, reactive } from 'vue';
import { addQuestionService, getQuestionDetailService, editQuestionService } from '@/apis/question'
import { useRouter } from 'vue-router';


const router = useRouter();


const visibleDrawer = ref(false)
// formQuesion 已经与上述的输入框进行了 双向绑定
const formQuestion = reactive({
  questionId: '',
  title: '',
  difficulty: '',
  content: '',
  questionCase: '',
  timeLimit: '',
  spaceLimit: '',
  defaultCode: '',
  mainFunc: ''
})

// 一个editor的实例对象，这个对象可以拿到 它里面自定义的函数 setAceCode()
const defaultCodeRef = ref()
const mainFucRef = ref()

async function open(questionId) {
  console.log("open questionId: ", questionId)
  visibleDrawer.value = true
  for (const key in formQuestion) {
    if (formQuestion.hasOwnProperty(key)) {
      formQuestion[key] = ''; // 清空之前添加题目的信息
    }
  }
  if (questionId) {
    const questionDetail = await getQuestionDetailService(questionId)
    Object.assign(formQuestion, questionDetail.data)
    defaultCodeRef.value.setAceCode(formQuestion.defaultCode)
    mainFucRef.value.setAceCode(formQuestion.mainFunc)
  }
}

// 将open方法暴露出去
defineExpose({
  open
})

function validate() {
  let msg = ''
  if (!formQuestion.title) {
    msg = '请添加题目标题'
  } else if (formQuestion.difficulty == '') {
    msg = '请选择题目难度'
  } else if (!formQuestion.timeLimit) {
    msg = '请输入时间限制'
  } else if (!formQuestion.spaceLimit) {
    msg = '请输入空间限制'
  } else if (!formQuestion.content) {
    msg = '请输入题目内容信息'
  } else if (!formQuestion.questionCase) {
    msg = '请输入题目用例名称'
  } else if (!formQuestion.defaultCode) {
    msg = '请输入默认代码'
  } else if (!formQuestion.mainFunc) {
    msg = '请输入main函数'
  } else {
    msg = ''
  }
  return msg

}
const emit = defineEmits(['success'])
async function onSubmit() {
  const errorMessage = validate()
  if (errorMessage) {
    ElMessage.error(errorMessage);
    return false
  }
  const fd = new FormData()
  for (let key in formQuestion) {
    fd.append(key, formQuestion[key])
  }
  // console.log(formQuestion)
  if (formQuestion.questionId) {
    //编辑题目请求
    await editQuestionService(fd)
    ElMessage.success('编辑成功')
    emit('success', 'edit')
  } else {
    console.log("addQuestionService")
    await addQuestionService(fd)
    ElMessage.success('添加成功')
    emit('success', 'add')
  }
  // visibleDrawer.value = false
}

async function submitAndExit() {
  await onSubmit();
  visibleDrawer.value = false
  console.log('打印收齐抽屉标志：')
  console.log(visibleDrawer.value)
}

function handleEditorContent(content) {
  formQuestion.defaultCode = content
}

function handleEditorMainFunc(content) {
  formQuestion.mainFunc = content
}

function onCancel() {
  visibleDrawer.value = false;
   console.log(visibleDrawer.value)
  router.push('/oj/layout/question')
  console.log("已点击取消按钮")
}

</script>

<style lang="scss">
.question-button {
  width: 200px;
}

.editor-container {
  width: 90%;
  height: 300px;
  margin: 0 auto; /* 居中 */
  max-width: 1400px;
}

#markdown-editor {
  width: 100%;
  height: 100%;
}
</style>