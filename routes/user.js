const express = require('express');
const router = express.Router();
const {login,signup,dosignup,dologin,Home,Profile} = require('../controllers/userControllers')

router.get('/',login)
router.get('/signup',signup)
router.post('/dosignup',dosignup)
router.post('/dologin',dologin)
router.get('/home',Home)
router.get('/profile',Profile)

module.exports=router;