import http from "@/axios"
//获取当前任务
export const getCurrentTask=()=>{
    return http.get("/custom/ViewIng")
}
//获取发布的任务
export const getTaskList=(params:any)=>{
    return http.get("/acustom/ViewList",params)
}
// 客户登录
export const customerLogin=(params:any)=>{
    return http.post("/custom/customlogin",params)
}
// 客户登出
export const customerLogout=(params:any)=>{
    return http.post("/custom/customlogout",params)
}
// 获取个人信息
export const getPersonInfo=()=>{
    return http.get("/custom/information")
}
// 发布任务
export const publishTask=(params:any)=>{
    return http.post("/custom/publicmission",params)
}

// 客户注册
export const customerRegister=(params:any)=>{
    return http.post("/custom/register",params)
}
// 获取任务详情
export const getTaskDetail=(params:any)=>{
    return http.get("/custom/ViewDetail",params)
}
