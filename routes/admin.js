const express = require('express');
const router = express.Router();
const {login,doLogin,home,uploadBlog,blockUser,removePost,viewPage,signout,unblockUser} = require('../controllers/adminControllers')
const adminAuth = require('../middlewares/adminAuth')

router.get('/',login)
router.post('/doLogin',doLogin)
router.get('/home',adminAuth,home)
router.post('/uploadBlog',adminAuth,uploadBlog)
router.get('/blockUser',adminAuth,blockUser)
router.get('/unblockUser',adminAuth,unblockUser)
router.delete('/deletePost',adminAuth,removePost)
router.get('/viewPage',adminAuth,viewPage)
router.get('/signout',adminAuth,signout)

module.exports=router;