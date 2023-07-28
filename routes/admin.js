const express = require('express');
const router = express.Router();
const {login,doLogin,home,uploadBlog,removeUser,removePost} = require('../controllers/adminControllers')

router.get('/',login)
router.post('/doLogin',doLogin)
router.get('/home',home)
router.post('/uploadBlog',uploadBlog)
router.post('/removeUser',removeUser)
router.post('/deletePost',removePost)

module.exports=router;