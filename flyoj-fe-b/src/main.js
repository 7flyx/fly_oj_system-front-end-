
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/main.scss"
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// import 'prismjs/components/prism-json'; // 支持 JSON 语法高亮
// import 'prismjs/themes/prism.css';       // 代码高亮主题


// 使用 GitHub 风格主题
VMdEditor.use(githubTheme);

const app = createApp(App);
app.use(VMdEditor);

app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})


app.mount('#app')
