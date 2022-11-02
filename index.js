const express=require("express")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("./configure/db")
const mainRouter=require("./Router/index")
app.set('view engine','ejs')
app.use('/api',mainRouter)
app.get("/",(req,res)=>{
res.render("home")
})
app.get("/form",(req,res)=>{
    res.render("formlist")
})
app.listen(4000,()=>{
    console.log("server is woking");
})