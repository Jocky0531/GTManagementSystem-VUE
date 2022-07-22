import axios from "axios";
import router from "@/router";
import Element from "element-ui"
import es from "element-ui/src/locale/lang/es";

// 本地
axios.defaults.baseURL = "http://localhost:8081"



const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})



request.interceptors.response.use(response => {
        let res = response;
        if (res.data.code === undefined){
            return response
        } else if (res.data.code === 200) {
            return response
        } else {
            Element.Message.error(res.data.msg ? res.data.msg : '系统异常')
            return Promise.reject(response.data.msg)
        }
    }, error => {
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        if (error.response === 401) {
            router.push("/")
        }

        Element.Message.error(error.message,{duration:3000})

        return Promise.reject(error)
    }
)

export default request