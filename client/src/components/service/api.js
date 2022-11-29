import axios from "axios"
import { Api_Notification_Messages, SERVICE_URLS } from '../constants/config.js'

const API_URL = "http://localhost:8000"

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        // Stop global loader here
        return processResponse(response);
    },
    function (error) {
        // Stop global loader here
        return Promise.reject(processError(error))
    }
)

/////////////////////////
// if success => return { isSuccess:true ,data : object }
// if fail => return { isFailure: true ,status :string msg:string,code:int}
/////////


const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    }
    else {
        return {
            isFailur: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

/////////////////////////
// if success => return { isSuccess:true ,data : object }
// if fail => return { isFailure: true ,status :string msg:string,code:int}
/////////


const processError = (error) => {
    if (error.response) {
        // Request made server resposnded with a status other
        //that falls out of the range 2.x.x  

        console.log("Error In response", error.toJSON());
        return {
            isError: true,
            msg: Api_Notification_Messages.responseFailure,
            code: error.response.status
        }
    }
    else if (error.request) {
        // Request made but no response was received
        console.log("Error In request", error.toJSON());
        return {
            isError: true,
            msg: Api_Notification_Messages.requestFailure,
            code: ""
        }
    }
    else {
        // something happened in setting up request that triggers an error
        console.log("Error In Network", error.toJSON());
        return {
            isError: true,
            msg: Api_Notification_Messages.networkError,
            code: ""
        }
    }
}


const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgree) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percenatgeCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percenatgeCompleted)
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgree) {
                    let percenatgeCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgree(percenatgeCompleted)
                }
            }

        })
}

export { API };