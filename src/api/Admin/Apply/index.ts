import http from "@/axios";

// 查看未处理的申请
export const getApplyList = (params: any) => {
  return http.get("/admin/ViewApply", params);
}
// 司机查看本人提交申请
export const getMyApplyList = (params: any) => {
  return http.get("/driver/ViewApply", params);
}
// 管理员审核司机的申请
export const checkApply = (params: any) => {
    return http.post("/admin/CheckApply", params);
}