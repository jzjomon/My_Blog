const mongoose = require('mongoose');
const multer = require('multer');
const ADMIN = require('../models/adminModel');
const UPLOADS = require('../models/blogModel');
const { USER } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const convertISO = require('../helpers/dateConverter')

const login = (req, res) => {
    try {
        if (req.cookies.adminToken) {
            res.redirect('admin/home?page=1')
        } else {
            res.render('admin/login')
        }
    } catch (err) {
        res.render('admin/404')
    }
}
const doLogin = (req, res) => {
    try {
        ADMIN.findOne({ email: req.body.email, password: req.body.password }).then((response) => {
            if (response) {
                const token = jwt.sign({ id: response._id }, process.env.JWT_PASS, { expiresIn: "2d" });
                res.cookie("adminToken", token, {
                    httpOnly: true,
                    samSite: 'lax',
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.status(200).json({ login: true })
            } else {
                res.json({ login: false })
            }
        })
    } catch (err) {
        res.render('admin/404')
    }
}
const home = (req, res) => {
    try {
        USER.find().then(response => {          
                res.render('admin/home', { data: response}); 
        })
    } catch (err) { 
        res.render('admin/404')
    }
}
const manageUser = (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = 4;
        const start = (page - 1) * limit;
        USER.find().limit(limit).skip(start).then( response => {
            let nextPage = page + 1;
        let previous = page - 1;
        if (page < response.length) {
            res.render('admin/manageUser',{ data: response, next: nextPage })
        } else if (page > response.length) {
            res.render('admin/manageUser',{ data: response, previous: previous })
        } else {
            res.render('admin/manageUser',{ data: response, next: nextPage, previous: previous })
        }
        })
    }catch (err) {
        res.render('admin/404')
    }
}
const uploadBlog = (req, res) => {
    try {
        const fileStorage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "public/assets");
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + "-" + file.originalname)
            }
        })
        const upload = multer({ storage: fileStorage }).array('images', 3)
        upload(req, res, (err) => {
            UPLOADS({
                heading: req.body.heading,
                catogory:req.body.catogories,
                content: req.body.content,
                images: req.files
            }).save().then((response) => {
                res.redirect('/admin/home?page=1');
            }).catch(err =>{
                res.render('admin/404')
            })
        })
    }catch (err) {
        res.render('admin/404')
    }
}
const blockUser = (req, res) => {
    try { 
        USER.findOneAndUpdate({ _id: req.query.id },{status:false,creater:false}).then(response => {
           res.redirect('/admin/manageUser')
        })
    } catch (err) {
        res.redirect('/admin/404')
    }
}
const unblockUser = (req, res) => {
    try {
        USER.findOneAndUpdate({_id: req.query.id},{status:true}).then(response => {
            res.redirect('/admin/manageUser')
        })
    } catch (err) {
        res.render('admin/404')
    }
}
const removePost = ( req, res) => {
    try {
        UPLOADS.findOne({_id:req.body.postId}).then(selectedPost =>{
            UPLOADS.deleteOne({_id:req.body.postId}).then(response => {   
              for(x of selectedPost.images){
                const filePath = path.join(__dirname,'..','public/assets',x.filename)
                fs.unlink(filePath, err =>{
                    if(err){
                        res.json({delete:false})
                    }else{
                        res.json({delete:true})
                    }
                })
              } 
            })
        }) 
        
    } catch (err) { 
        res.render('admin/404')
    }
}
const viewPage = (req, res) => {
    try {
        UPLOADS.findOne({ _id: req.query.id }).populate({path:"createdBy",select:['firstName','lastName']}).then(response => {
            let date = convertISO(response.uploadedAt)
            res.render('admin/view', { data: response, date:date})
        })
    } catch (err) {
        res.render('admin/404')
    }
}
const signout = (req, res) => {
    try {
        res.cookie('adminToken', null, {
            httpOnly: true,
            samSite: 'lax',
            secure: false,
            maxAge: 0
        })
        res.redirect('/admin');
    } catch (err) {
        res.status(404).render('admin/404')
    }
}
const requestCreator = (req, res) => {
    try{
     USER.findOneAndUpdate({_id:req.body.id},{requestCreator:true}).then(response =>{
        res.json({requested:true})
     })
    } catch (err) {
        res.status(404).render('admin/404')
    }
}
const check = (req, res) => {
    try{
    USER.findOne({_id:req.body.data}).then(response =>{
        if(response.creater){
            res.json({creator:true})
        }else{
            res.json({creater:false,id:response._id}) 
        }
    })
} catch (err) {
    res.status(404).render('admin/404')
}
}
const acceptRequest = (req, res) => {
    try{
    USER.findOneAndUpdate({_id:req.query.id},{creater:true,requestCreator:false}).then(response =>{
        res.redirect('/admin/manageUser?page=1')
    })
} catch (err) {
    res.status(404).render('admin/404')
}
}
const resetPage = (req, res) => {
    try{
        res.render('admin/resetPass',{mail:req.query.mail})
    }catch (err) {
        res.render('admin/404')
    }
}
const updateReset = (req, res) => {
    try{
        ADMIN.findOneAndUpdate({ email: req.body.data.email }, { password: req.body.data.password }).then(response => {
            res.json({ reset: true })
        })
    }catch (err) {
        res.render('admin/404')
    }
}


module.exports = { login, doLogin, home, uploadBlog, blockUser, removePost, viewPage, signout, unblockUser, requestCreator, check, acceptRequest, manageUser, resetPage, updateReset };