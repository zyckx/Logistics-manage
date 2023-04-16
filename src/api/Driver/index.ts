import http from "@/axios";
import axios from "axios";
// 司机登录
export const driverLogin = (params: any) => {
  return http.post("/driver/driverlogin", params);
};
// 司机登出

export const driverLogout = (params: any) => {
  return http.post("/driver/driverlogout", params);
};
// 获取司机个人任务
export const getTask = (params: any) => {
  return http.get("/driver/ViewIng", params);
};
// 获取司机个人信息
export const getInfo = () => {
  return http.get("/driver/information");
};
// 司机提交申请
export const PublishApply = (params: any) => {
    return http.post("/driver/PublishApply", params);
}
// 更新任务状态为已完成或者已取消
export const updateTaskStatus = (params: any) => {
  return http.post("/driver/UpdateStatus", params);
}
// 获取司机公告
export const getDriverNotice = () => {
  return http.get("/driver/ViewNotice");
}
// 获取所有公告
export const getAllNotice = () => {
    return http.get("/notice/View");
}