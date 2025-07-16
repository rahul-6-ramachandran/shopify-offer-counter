import mongoose from "mongoose";

const connectDB = async()=>{
    try {
         const connection = await mongoose.connect(process.env.MONGO_URI);

          if(!connection){
            console.log("DB Connected Successfully")
          }
    } catch (error) {
        throw new Error(error)
    }   
}

export default connectDB