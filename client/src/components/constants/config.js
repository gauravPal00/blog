//  API Notification Messages

export const Api_Notification_Messages = {
    loading: {
        title: "Loading...",
        message: "Data is Loaded Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    responseFailure: {
        title: "Error",
        message: "An error Occured while fetching response from the server. Please try again later."
    },
    requestFailure: {
        title: "Error",
        message: "An error occured while parsing request data"
    },
    networkError: {
        title: "Error",
        message: "Unable to connect with the server. Please check the connectivity and try again later."
    }
}

// Api service call
// Sample Request
// Need service call: {urls:"/",method:"POST/GET/PUT/DELETE",Params:true/false,query:true/false}
export const SERVICE_URLS = {
    userSignup: { url: "/signup", method: "POST" },
    userLogin:{ url:"/login" , method:"POST" },
    uploadFile:{url:"/file/upload",method:"POST"}
}