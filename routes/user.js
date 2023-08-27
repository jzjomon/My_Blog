const express = require('express');
const router = express.Router();
const {login,signup,dosignup,dologin,Home,Profile,detailedView,logout,update,specificView, uploadUserBlog, resetPass, resetPage, updateReset, removePost, about, removeDp} = require('../controllers/userControllers');
const {userAuth} = require('../middlewares/userAuth')
const paginate = require('../middlewares/paginate')

router.get('/',login)
router.get('/signup',signup)
router.post('/dosignup',dosignup)
router.post('/dologin',dologin)
router.get('/home',userAuth,paginate,Home)
router.get('/profile',userAuth,Profile)
router.get('/detailedView',userAuth,detailedView)
router.get('/logout',userAuth,logout)
router.post('/update',userAuth,update)
router.get('/specificView',userAuth,specificView)
router.post('/uploadUserBlog',userAuth,uploadUserBlog)
router.get('/resetPass',resetPass)
router.get('/resetPage',resetPage)
router.post('/updateReset',updateReset)
router.get('/removePost',userAuth,removePost)
router.get('/about',userAuth,about)
router.get('/removeDp',userAuth,removeDp)


module.exports=router;