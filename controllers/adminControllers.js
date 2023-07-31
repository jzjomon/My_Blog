const mongoose = require('mongoose');
const multer = require('multer');
const ADMIN = require('../models/adminModel');
const UPLOADS = require('../models/blogModel');
const {USER} = require('../models/userModel');

const login = (req,res)=>{
    res.render('admin/login')
}
const doLogin = (req,res)=>{
    ADMIN.find({email:req.body.email,password:req.body.password}).then((response)=>{
        if(response.length > 0){
            res.json({login:true})
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

module.exports = {login,doLogin,home,uploadBlog,removeUser,removePost};