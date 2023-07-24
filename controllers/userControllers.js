// const mongoose = require('mongoose');
// const USER = require('../models/userModel').users;


const doLogin = (req,res)=>{
    res.render('login')
}
const doSignUp = (req,res)=>{
    res.render('signUp')
}
const reqHome = (req,res)=>{
    res.json({login:true});

    // USER({email:req.body.email,
    //     password:req.body.password
    // }).save().then(()=>{
    //     res.json({login:true})
    // }).catch(()=>{
    //     res.json({login:false})
    // })
}
const goHome = (req,res) =>{
    res.render('home')
}
const goProfile = (req,res) =>{
    res.render('profile')
}
module.exports = {doLogin,doSignUp,reqHome,goHome,goProfile}