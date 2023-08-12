const mongoose = require('mongoose');
const { USER } = require('../models/userModel');
const UPLOADS = require('../models/blogModel');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const parseJwt = require('../helpers/jwtParser');
const convertISO = require('../helpers/dateConverter')


const login = (req, res) => {
    try {
        if (req.cookies.userToken) {
            res.redirect('/home')
        } else {
            res.render('user/login')
        }
    } catch (err) {
        res.render('user/404')
    }

}
const signup = (req, res) => {
    try {
        res.render('user/signUp')
    } catch (err) {
        res.render('user/404')
    }
}
const dosignup = (req, res) => {
    try {
        USER.find({ email: req.body.email, password: req.body.password }).then((response) => {
            if (response.length > 0) {
                res.json({ signup: false })
            } else {
                USER({
                    firstName: req.body.fname,
                    lastName: req.body.lname,
                    email: req.body.email,
                    password: req.body.password
                }).save().then(() => {
                    res.status(200).json({ signup: true })
                })
            }
        })
    } catch (err) {
        res.render('user/404.hbs')
    }
}
const dologin = (req, res) => {
    try {
        USER.findOne({ email: req.body.email, password: req.body.password }).then((response) => {
            if (response && response.status) {
                const token = jwt.sign({ userid: response._id }, process.env.JWT_PASS, { expiresIn: '2d' });
                res.cookie('userToken', token, {
                    httpOnly: true,
                    samSite: 'lax',
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.status(200).json({ login: true })
            }else if(response){
                res.json({login:"blocked"})
            }else {
                res.json({ login: false })
            }
        })
    } catch (err) {
        res.render('user/404')
    }
}
const Home = (req, res) => {
    try {
        UPLOADS.find().then(response => {
            UPLOADS.find().sort({ uploadedAt: -1 }).limit(5).then(sorted => {
                for(x of sorted){
                    x.date = convertISO(x.uploadedAt)
                }
                res.render('user/home', { data: response, latest: sorted })
            }).catch(err =>{
                res.render('user/404')
            })
        })
    } catch (err) {
        res.render('user/404')
    }
}
const Profile = (req, res) => {
    try {
        res.render('user/profile')
    } catch (err) {
        res.render('user/404')
    }

}
const detailedView = (req, res) => {
    try {
        UPLOADS.findOne({ _id: req.query.id }).populate({path:"createdBy",select:['firstName','lastName']}).then(response => {
            res.render('user/detailedView', { data: response })
        }).catch(err =>{
            res.render('user/404')
        })
    } catch (err) {
        res.render('user/404')
    }
}
const logout = (req, res) => {
    try {
        res.cookie('userToken', null, {
            httpOnly: true,
            samSite: "lax",
            secure: false,
            maxAge: 1
        })
        req.cookies.userToken = null;
        res.redirect('/')
    } catch (err) {
        res.render('user/404')
    }
}
const update = (req, res) => {
    try {
        const fileStorage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "public/assets")
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + "-" + file.originalname)
            }
        })
        const updateUp = multer({ storage: fileStorage }).array('images', 1)
        updateUp(req, res, (err) => {
            const userdata = {};
            if (req.body.firstname != "") {
                userdata.firstname = req.body.firstname;
            } else if (req.body.lastname != "") {
                userdata.lastname = req.body.lastname;
            } else if (req.body.work != "") {
                userdata.work = req.body.work;
            } else if (req.body.place != "") {
                userdata.place = req.body.place;
            } else if (req.files != "") {
                userdata.image = req.files;
                const filePath = path.join(__dirname,'..','public/assets',req.query.id);
                fs.unlink(filePath, err =>{ 
                    if(err){
                        throw err
                    }
                })
            }
            const parsedCookie = parseJwt(req.cookies.userToken)
            USER.findOneAndUpdate({ _id: parsedCookie.userid }, {
                firstName: userdata.firstname,
                lastName: userdata.lastname,
                work: userdata.work,
                place: userdata.place,
                image: userdata.image
            }).then(response => {
                res.redirect('/profile')
            }).catch(err =>{
                res.render('user/404')
            })
        })
    } catch (err) {
        res.render('user/404')
    }
}
const specificView = (req, res) =>{
    try{
        if(req.query.id){
            UPLOADS.find({catogory:req.query.id}).then(response =>{
                res.render('user/specificView.hbs',{data:response});
            })
        }
        else if(req.query.userId){
            UPLOADS.find({createdBy:req.query.userId}).then(response =>{
                res.render('user/specificView.hbs',{posts:response});
            })
        }
    }catch (err) {
        res.render('user/404')
    }
   
} 
const uploadUserBlog = (req, res) => {
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
                createdBy:req.query.id,
                images: req.files
            }).save().then((response) => {
                res.redirect('/profile');
            }).catch(err =>{
                res.render('user/404')
            })
        })
    }catch (err) {
        res.render('user/404')
    }
} 

module.exports = { login, signup, dosignup, dologin, Home, Profile, detailedView, logout, update, specificView, uploadUserBlog }