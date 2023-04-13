import http from "../../axios";
import type { Response } from "../../axios";
import type { IRegisterForm } from "../../types";
export const register = (registerData: IRegisterForm) => {
  //传递多个params参数
  return http.post<Response>("/register", registerData);
};
