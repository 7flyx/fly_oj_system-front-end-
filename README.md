# fly_oj_system-front-end-
flyOj（在线编程系统）前端代码，使用vue3实现。



安装依赖

~~~js
// B 端、C端都需要的依赖
// 异步请求 第三方库
npm install axios

// cookie 第三方库
npm install js-cookie@3.0.5

// 前端ui组件 element plus
npm install element-plus --save
// element plus中，按需导入
npm install -D unplugin-vue-components unplugin-auto-import

npm install -D sass-embedded
// 网页代码编辑器 
npm install ace-builds@1.4.13

~~~

~~~js
// C端需要的依赖
npm install markdown-it
npm install splitpanes
~~~

若有遗漏的依赖，仔细查看`package.json`文件的 dependencies。
