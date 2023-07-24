const mongoose = require('mongoose');
const USER = require('../models/userModel').users;


const login = (req,res)=>{
    res.render('login')
}
const signup = (req,res)=>{
    res.render('signUp')
}
const dosignup = (req,res)=>{
    USER.find({email:req.body.email,password:req.body.password}).then((response)=>{
        if(response.length > 0){
            res.json({signup:false})
        }else{
            USER({
                firstName:req.body.fname,
                lastName:req.body.lname,
                email:req.body.email,
                password:req.body.password
            }).save().then(()=>{
                res.json({signup:true})
            })
        }
    })
}
const  dologin = (req,res)=>{
    USER.find({email:req.body.email,password:req.body.password}).then((response)=>{
        if(response.length > 0){
            res.json({login:true})
        }else{
            res.json({login:false})
        }
    })
}
const Home = (req,res) =>{
    res.render('home')
}
const Profile = (req,res) =>{
    res.render('profile')
}
module.exports = {login,signup,dosignup,dologin,Home,Profile}