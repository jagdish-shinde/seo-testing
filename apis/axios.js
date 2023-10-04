import axios  from "axios";
import { cookie } from "./cookies";

function getAxios() {
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SEO_BACKEND_URL,
    });


    function onRequestFulfilled(request) {
        request.headers['source'] = 'fst-seo'
        return request;
    }

    function onRequestRejected(error) {
        // Do something with request error
        return Promise.reject(new Error(error?.response?.data?.message || error?.response?.data?.msg));
    }

    function onResponseFulfilled(response) {
        // Do something with response data
        const {
            data: { data, status, msg, token , message},
            config: { url },
        } = response || {data:{}, config:{}};

        if (!status) {
            return Promise.reject(new Error(message || msg));
        }

        return data;
    }


    function onResponseRejected(error) {
        // Do something with response error
        const {status} = error?.response || {}
        const {msg, code , message} = error?.response?.data || {}
        const responseMessage = message || msg
        const invalidRequestMsg = ['UNAUTHORISED_USER','SESSION_EXPIRED','INVALID_TOKEN']
  
        if (invalidRequestMsg.includes(responseMessage)) {
            cookie.clearCookieData()
            window.location.reload()
        }
        const errorObj = new Error(responseMessage)
        errorObj.status = status
        return Promise.reject(errorObj);
    }


    axiosInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected, {synchronous: true })
    axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected, { synchronous: true })

    return axiosInstance
}

let axiosInstance = null

if (!axiosInstance) {
    axiosInstance = getAxios()
}

export default axiosInstance