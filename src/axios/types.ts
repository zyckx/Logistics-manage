//返回的数据结构
export interface Response<T = any> {
  success: boolean;
  code : number;
  msg: string;
  data: T;
}
