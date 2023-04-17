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
// 查找未分配司机和未分配车辆的任务
export const getUnallocated = () => {
  return http.get("/manager/findcardrivertask");
}

// 查看所有司机
export const getDriverList = () => {
  return http.get("/manager/finddriver");
}
// 新增司机
export const addDriver = (formData: any) => {
  return http.post("/manager/savedriver", formData);
}
// 查看所有车辆
export const getCarList = () => {
  return http.get("/manager/findcar");
}
// 新增车辆
export const addCar = (formData: any) => {
  return http.post("/manager/savecar", formData);
}