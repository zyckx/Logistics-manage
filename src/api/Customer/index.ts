import http from "@/axios";
//获取当前任务
export const getCurrentTask = () => {
  return http.get("/custom/ViewIng");
};
//获取发布的任务
export const getTaskList = () => {
  return http.get("/custom/ViewList");
};
// 客户登录
export const customerLogin = (formData: any) => {
  return http.post("/custom/customlogin", formData);
};
// 客户登出
export const customerLogout = () => {
  return http.post("/custom/customlogout");
};
// 获取个人信息
export const getPersonInfo = () => {
  return http.get("/custom/information");
};
// 发布任务
export const publishTask = (formData: any) => {
  return http.post("/custom/publicmission", formData);
};

// 客户注册
export const customerRegister = (formData: any) => {
  return http.post("/custom/register", formData);
};
