const mongoose = require('mongoose');
const {USER} = require('../models/userModel');
const UPLOADS = require('../models/blogModel');
const jwt = require('jsonwebtoken');


const login = (req,res)=>{
    if(req.cookies.userToken){
        res.redirect('/home')
    }else{
        res.render('user/login')
    }
}
const signup = (req,res)=>{
    res.render('user/signUp')
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
                res.status(200).json({signup:true})
            })
        }
    })
}
const  dologin = (req,res)=>{
    USER.find({email:req.body.email,password:req.body.password}).then((response)=>{
        if(response.length > 0){
            const token = jwt.sign({userid:response[0]._id},'tokenpass',{expiresIn:'2d'});
            res.cookie('userToken',token,{
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
const Home = (req,res) =>{
    UPLOADS.find().then( response =>{
        UPLOADS.find().sort({uploadedAt:-1}).limit(5).then(sorted =>{
            res.render('user/home',{data:response,latest:sorted})
        })
    })
}
const Profile = (req,res) =>{
    res.render('user/profile')
}
const detailedView = (req,res) =>{
    UPLOADS.find({_id:req.query.id}).then(response =>{
        res.render('user/detailedView',{data:response[0]})
    })
}
const logout = (req,res) =>{
    res.cookie('userToken',null,{
        httpOnly:true,
        samSite:"lax",
        secure:false,
        maxAge:1
    })
    req.cookies.userToken = null;
    res.redirect('/')
}


module.exports = {login,signup,dosignup,dologin,Home,Profile,detailedView,logout}