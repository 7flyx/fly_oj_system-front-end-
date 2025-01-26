import axios from "axios"

// 不同的功能，通过axios请求的是 不同接口的地址
// 127.0.0.1:19090   api网关
const service = axios.create({
    // http://localhost:5173/dev-api/sysUser/login 代理，解决了跨域问题
    // 根据代理的规则，会移除 dev-api,且请求 http:127.0.0.1:19090/system/sysUser/login
    baseURL: "/dev-api",
    timeout: 5000, // 5秒

})

// 响应拦截器
service.interceptors.response.use(
  (res) => { // res: 就是响应数据
    // 未设置状态码则默认成功状态
    const code = res.data.code || 1000;
    const msg = res.data.msg;
    if (code === 3001) {
      ElMessage({ message: msg, type: "warning" });
      removeToken();
      router.replace("/oj/login");
      return Promise.reject(new Error(msg));
    } else if (code !== 1000) {
      ElMessage({ message: msg, type: "error" });
      // ElNotification.error({ title: msg });
      return Promise.reject(new Error(msg)); // 类似于后端抛出异常信息
    } else {
      return Promise.resolve(res.data); // 会对返回的数据包进行解析，提取出后端返回的数据
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    return Promise.reject(error);
  }
);

// 将Service 变量，暴露出去
export default service