import http from "@/axios";

// 查看未处理的申请
export const getApplyList = () => {
  return http.get("/request/ViewDai");
};
// 司机查看本人提交申请
export const getMyApplyList = (params: any) => {
  return http.get("/driver/ViewApply", params);
};
// 管理员审核司机的申请
export const checkApply = (FormData:any) => {
  return http.get("/request/shenhe", FormData);
};
