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

// 获取司机个人信息
export const getInfo = () => {
  return http.get("/driver/information");
};
// 司机提交申请
export const PublishApply = (FormData: any) => {
  return http.post("/driver/requests", FormData);
};
// 查看司机申请
export const getApply = () => {
  return http.get("/request/own");
};
// 获取司机个人任务
export const getTask = () => {
  return http.get("/driver/getOwnTask");
};
// 更新任务状态为已完成或者已取消
export const updateTaskStatus = (mid: any) => {
  return http.post("/driver/updateTask/" + mid);
};
// 获取司机公告
export const getDriverNotice = () => {
  return http.get("/driver/ViewNotice");
};
// 获取所有公告
export const getAllNotice = () => {
  return http.get("/notice/View");
};
