const expres=require('express')
const usermodel=require("../model/userSchema")
const front=expres()
front.get("/",async(req,res)=>{
    res.render('list',{result})
})