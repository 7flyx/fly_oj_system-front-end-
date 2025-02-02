import axios from "axios"
import { getToken, removeToken } from "./cookie"
import router from '@/router';
// 不同的功能，通过axios请求的是 不同接口的地址

// 设置json格式的数据传输
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

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
    if (code === 3001) { // 登录状态已过期，需要删除存储的token，并重定向到登录页
      ElMessage({ message: msg, type: "warning" });
      removeToken();
      router.push("/oj/login");
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


// 请求 拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // if (
    //   !isRepeatSubmit &&
    //   (config.method === "post" || config.method === "put")
    // ) {
    //   const requestObj = {
    //     url: config.url,
    //     data:
    //       typeof config.data === "object"
    //         ? JSON.stringify(config.data)
    //         : config.data,
    //     time: new Date().getTime(),
    //   };
    //   const sessionObj = cache.session.getJSON("sessionObj");
    //   if (
    //     sessionObj === undefined ||
    //     sessionObj === null ||
    //     sessionObj === ""
    //   ) {
    //     cache.session.setJSON("sessionObj", requestObj);
    //   } else {
    //     const s_url = sessionObj.url; // 请求地址
    //     const s_data = sessionObj.data; // 请求数据
    //     const s_time = sessionObj.time; // 请求时间
    //     const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
    //     if (
    //       s_data === requestObj.data &&
    //       requestObj.time - s_time < interval &&
    //       s_url === requestObj.url
    //     ) {
    //       const message = "数据正在处理，请勿重复提交";
    //       console.warn(`[${s_url}]: ` + message);
    //       return Promise.reject(new Error(message));
    //     } else {
    //       cache.session.setJSON("sessionObj", requestObj);
    //     }
      // }
    // }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 将Service 变量，暴露出去
export default service