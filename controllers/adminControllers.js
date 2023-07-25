const mongoose = require('mongoose');
const ADMIN = require('../models/adminModel').admin;

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
    res.render('admin/home')
}

module.exports = {login,doLogin,home}