import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:"../config/.env"
})
const databaseConnection = () => {
    mongoose.connect("mongodb://localhost:27017/tweet").then(()=>{
        console.log("Connected to mongoDB");
    }).catch((error)=>{
        console.log(error);
    })
}
export default databaseConnection;