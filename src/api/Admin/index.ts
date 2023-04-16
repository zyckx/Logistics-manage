
import http from "@/axios"
export const adminLogin=(formData:any)=>{
    return http.post("/manager/managerlogin",formData)
}