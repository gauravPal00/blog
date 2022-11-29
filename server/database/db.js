import mongoose from 'mongoose'

export const Connection = async()=>{

    const URL = "mongodb://localhost:27017/user"
    try{
       await mongoose.connect(URL,{ useNewUrlParser : true})
       console.log("database connected successfully");
    }
    catch(error){
        console.log("error while connecting database",error);
    }   
}