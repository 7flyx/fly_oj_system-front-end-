// 和管理员业务相关的前后端交互接口

import service from "@/utils/request"

// 管理员登录
// export 将方法暴露出去
export function loginService(userAccount, password) {
    var data = { userAccount, password };
    return service({
        url: '/sysUser/login',
        method: 'post',
        data: data
    })
}

// 获取用户信息，昵称
export function getUserInfoService() {
    return service({
        url: '/sysUser/info',
        method: 'get'
    })
}

export function logoutService() {
    return service({
        url: 'sysUser/logout',
        method: 'delete'
    })
}

