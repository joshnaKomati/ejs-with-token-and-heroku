const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/ejs",()=>{
    console.log("db is conneted");
})