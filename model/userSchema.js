const mongoose=require("mongoose")
const usermodel=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
})
module.exports=new mongoose.model("userinfom",usermodel)