const mongoose = require('mongoose');
const multer = require('multer');
const ADMIN = require('../models/adminModel');
const UPLOADS = require('../models/blogModel');
const {USER} = require('../models/userModel');
const jwt = require('jsonwebtoken')

const login = (req,res)=>{
    if(req.cookies.adminToken){
        res.redirect('admin/home')
    }else{
        res.render('admin/login')
    }
}
const doLogin = (req,res)=>{
    ADMIN.find({email:req.body.email,password:req.body.password}).then((response)=>{
        if(response.length > 0){
            const token = jwt.sign({id:response[0]._id},'tokenpass',{expiresIn:"2d"});
            res.cookie("adminToken",token,{
                httpOnly:true,
                samSite:'lax',
                secure:false,
                maxAge:24*60*60*1000
            })
            res.status(200).json({login:true})
        }else{
            res.json({login:false})
        }
    })
}
const home = (req,res)=>{
    USER.find().then(response =>{
        UPLOADS.find().then(posts =>{
            res.render('admin/home',{data:response,posts:posts});
        })
    })
    
}
const uploadBlog = (req,res)=>{
    const fileStorage = multer.diskStorage({
        destination:(req,file,callback)=>{
            callback(null,"public/assets");
        },
        filename:(req,file,callback)=>{
            callback(null,Date.now()+"-"+file.originalname)
        }
    })
    const upload = multer({storage:fileStorage}).array('images',3)
    upload(req,res,(err)=>{
        UPLOADS({
            heading:req.body.catogories,
            content:req.body.content,
            images:req.files
        }).save().then((response)=>{
                res.redirect('/admin/home');  
        })
    })
}
const removeUser = (req,res)=>{
    USER.deleteOne({email:req.body.email}).then(response =>{
        res.redirect('/admin/home');
    })
} 
const removePost = (req,res)=>{
    UPLOADS.deleteOne({content:req.body.content}).then(response =>{
       res.redirect('/admin/home')
    })
}
const viewPage = (req,res) =>{
    UPLOADS.find({_id:req.query.id}).then(response =>{
        res.render('admin/view',{data:response[0]})
    })
}
const signout = (req,res) =>{
    res.cookie('adminToken',null,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:0
    })
    res.redirect('/admin');
}


module.exports = {login,doLogin,home,uploadBlog,removeUser,removePost,viewPage,signout};