import http from "@/axios";
export const adminLogin = (formData: any) => {
  return http.post("/manager/managerlogin", formData);
};
// 待审核
export const getCheckList = () => {
  return http.get(
    "/manager/finddaitask",
  );
};
// 审核通过
export const CheckList= (id: any, flag: any) => {
  return http.get("/manager/contask" + "/" + id + "/" + flag);
};
