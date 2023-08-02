const express = require('express');
const router = express.Router();
const {login,doLogin,home,uploadBlog,removeUser,removePost,viewPage,signout} = require('../controllers/adminControllers')
const adminAuth = require('../middlewares/adminAuth')
router.get('/',login)
router.post('/doLogin',doLogin)
router.get('/home',adminAuth,home)
router.post('/uploadBlog',uploadBlog)
router.post('/removeUser',removeUser)
router.post('/deletePost',removePost)
router.get('/viewPage',viewPage)
router.get('/signout',signout)

module.exports=router;