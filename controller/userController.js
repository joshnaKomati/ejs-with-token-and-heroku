const usermodel=require("../model/userSchema")
const bcrypt=require("bcrypt")
const jwt =require('jsonwebtoken')
module.exports={
    newuser:async(req,res)=>{
        const {name,email,password,age}=req.body
        const passwordGenerate=await bcrypt.hash(password,10)
        const checkEmail=await usermodel.findOne({email})
        if(checkEmail){
            res.json({message:"email is already exist"})
        }else{
            await usermodel.create({name,email,password:passwordGenerate,age})
            // res.json({message:"user is added"})
            res.redirect('/')
        }
    },
    userlist:async(req,res)=>{
        const result=await usermodel.find()
        // res.json({message:"user list is dispalyed",result})
        res.render("list",{result})
    },
    userUpdate:async(req,res)=>{
        const {name,email,password,age,id}=req.body
        const passwordGenerate=await bcrypt.hash(password,10)
        const checkId=await usermodel.findById(id)
        if(checkId){
            await usermodel.findByIdAndUpdate(id,{name,email,password,age})
            // res.json({message:"user is updted"})
            res.redirect("/")
        }else{
            res.json({message:"user details does not updated"})
        }
    },
    userGetUpdate:async(req,res)=>{
        const {id}=req.params
        const checkId=await usermodel.findById(id)
        if(checkId){
            await usermodel.findByIdAndUpdate(id)
            // res.json({message:"user detals get by id",checkId})
            res.render("editfile",{checkId})
        }else{
            res.json({message:"user details does not get by id"})
        }
    },
    userdelete:async(req,res)=>{
        const {id}=req.params
        const checkId=await usermodel.findById(id)
        if(checkId){
            await usermodel.findByIdAndDelete(id)
            // res.json({message:"user details deleted by id"})
            res.redirect("/")
        }else{
            res.json({message:'user details does not deleted by id'})
        }
    },
    userlogin:async(req,res)=>{
        const {email,password}=req.body
        const checkEmail=await usermodel.findOne({email})
        if(checkEmail){
            if(await bcrypt.compare(password,checkEmail.password)){
                const token=jwt.sign({email},'secretkey')
                res.json({message:"user logined",token})
            }else{
                res.json({message:"password is wrong"})
            }
    }   else{
        res.json({message:"email is already exist"})
    }
    }
}