const express = require('express');
const router = express.Router();
const {doLogin,doSignUp,reqHome,goHome,goProfile} = require('../controllers/userControllers')

router.get('/',doLogin)
router.get('/signup',doSignUp)
router.post('/reqhome',reqHome)
router.get('/home',goHome)
router.get('/profile',goProfile)

module.exports=router;