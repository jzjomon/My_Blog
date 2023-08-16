const express = require('express');
const router = express.Router();
const {login,doLogin,home,uploadBlog,blockUser,removePost,viewPage,signout,unblockUser,requestCreator,check, acceptRequest, manageUser, resetPage, updateReset} = require('../controllers/adminControllers')
const adminAuth = require('../middlewares/adminAuth')
const paginate = require('../middlewares/paginate')

router.get('/',login)
router.post('/doLogin',doLogin)
router.get('/home',paginate,adminAuth,home)
router.post('/uploadBlog',adminAuth,uploadBlog)
router.get('/blockUser',adminAuth,blockUser)
router.get('/unblockUser',adminAuth,unblockUser)
router.delete('/deletePost',adminAuth,removePost)
router.get('/viewPage',adminAuth,viewPage)
router.get('/signout',adminAuth,signout)
router.post('/requestCreator',requestCreator)
router.post('/check',check)
router.get('/acceptRequest',adminAuth,acceptRequest)
router.get('/manageUser',adminAuth,manageUser)
router.get('/resetPage',resetPage)
router.post('/updateReset',updateReset)

module.exports=router;