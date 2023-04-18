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
// 查看进行中订单
export const getDoingList = () => {
  return http.get("/manager/findtask");
}
// 查看已完成订单
export const getDoneList = () => {
  return http.get("/manager/findcomtask");
}
// 查找未分配司机和未分配车辆的任务
export const getUnallocated = () => {
  return http.get("/manager/findcardrivertask");
}

// 查看所有司机
export const getDriverList = () => {
  return http.get("/manager/finddriver/1");
}
// 分配司机
export const assignDriver = (taskId:any,driverId:any) => {
  return http.post("/manager/condriver/" + taskId + "/" + driverId);
}
// 新增司机
export const addDriver = (formData: any) => {
  return http.post("/manager/savedriver", formData);
}
// 查看所有车辆
export const getCarList = () => {
  return http.get("/manager/findcar");
}
// 分配车辆
export const assignCar = (taskId:any,carId:any) => {
  return http.post("/manager/concar/" + taskId + "/" + carId);
}
// 新增车辆
export const addCar = (formData: any) => {
  return http.post("/manager/savecar", formData);
}
// 发布公告
export const addNotice = (formData: any) => {
  return http.post("/notice/public", formData);
}
// 删除公告
export const deleteNotice = (id: any) => {
  return http.post("/notice/delete/" + id);
}