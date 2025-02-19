<template>
  <el-form inline="true">
    <el-form-item>
      <selector v-model="params.difficulty" placeholder="请选择题目难度" style="width: 200px;"></selector>
    </el-form-item>
    <el-form-item>
      <el-input  v-model="params.title" placeholder="请您输入要搜索的题目标题" />
    </el-form-item>
    <el-form-item>
      <el-button plain @click="onSearch" >搜索</el-button>
      <el-button plain type="info" @click="onReset" >重置</el-button>
      <el-button plain type="primary" :icon="Plus" @click="onAddQuestion">添加题目</el-button>
    </el-form-item>
  </el-form>
  <el-table height="526px" :data="questionList">
    <el-table-column prop="questionId" width="180px" label="题目id" />
    <el-table-column prop="title" label="题目标题" />
    <el-table-column prop="difficulty" label="题目难度" width="90px">
      <template #default="{ row }">
        <div v-if="row.difficulty === 1" style="color:#3EC8FF;">简单</div>
        <div v-if="row.difficulty === 2" style="color:#FE7909;">中等</div>
        <div v-if="row.difficulty === 3" style="color:#FD4C40;">困难</div>
      </template>
    </el-table-column>
    <el-table-column prop="createName" label="创建人" width="140px" />
    <el-table-column prop="createTime" label="创建时间" width="180px" />
    <el-table-column label="操作" width="100px" fixed="right">
      <!-- 插槽 -->
      <template #default="{ row }">
        <el-button type="text" @click="onEdit(row.questionId)">编辑
        </el-button>
        <el-button type="text" class="red" @click="onDelQuestion(row.questionId)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

<!-- 分页器 -->
  <el-pagination background size="default" layout="total, sizes, prev, pager, next, jumper " 
  :total="total" :page-sizes="[1, 5, 10, 20, 50]" v-model:current-page="params.pageNum" v-model:page-size="params.pageSize"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange" />

  <!-- 抽屉 -->
   <!-- ref 这里是会拿到 他的一个实例对象，然后通过这个对象去调用里面的open方法，实现跨组件访问 -->
    <!-- success,当添加成功后，会自动刷新页面，拿到新添加的数据 -->
<question-drawer ref="questionDrawerRef" @success="onSuccess"></question-drawer>
</template>

<script setup>
import { reactive, ref } from "vue"
// import QuestionEdit from '@/components/question/QuestionEdit.vue'
import QuestionDrawer from "@/components/question/QuestionDrawer.vue"
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import Selector from "@/components/question/QuestionSelector.vue"
import { delQuestionService, getQuestionListService } from '@/apis/question'

const params = reactive({
    pageNum: 1,
    pageSize: 10,
    difficulty: '',
    title: ''
})

const total = ref(0)
const questionList = ref([])

async function getQuestionList() {
  const result = await getQuestionListService(params)
    // console.log(result);
  questionList.value = result.rows
  total.value = result.total
}
getQuestionList() // 初始化列表

function handleSizeChange(newPageSize) { // 分页器的，改变每一页的元素条数
  // params.pageSize = newPageSize; // 已经双向绑定
  params.pageNum = 1;
  getQuestionList()
}

function handleCurrentChange(newPageNum) { // 分页器的 跳转到第几页
  // params.pageNum = newPageNum; // 已经双向绑定
  getQuestionList()
}

function onSearch() {
  params.pageNum = 1;
  getQuestionList()
}

function onReset() {
  params.pageNum = 1
  params.pageSize = 10
  params.title = ''
  params.difficulty = ''
  getQuestionList()
}


const questionDrawerRef = ref()

function onAddQuestion() {
  questionDrawerRef.value.open()
}

function onSuccess(service) {
  // 会根据是add还是edit进行判断，add的时候，会跳转到 第1页
  if (service === 'add') {
    params.pageNum = 1
  } else if (service == 'edit'){
  }
  getQuestionList()
}

async function onEdit(questionId) {
  // 让子组件自己去调用数据的接口，就越过了 父子组件 数据的传递
  console.log("questionId:", questionId)
  questionDrawerRef.value.open(questionId)
}


async function onDelQuestion(questionId) {
  await delQuestionService(questionId);
  params.pageNum = 1; // 调整到第1页
  getQuestionList()
}


</script>