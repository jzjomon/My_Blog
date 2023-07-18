const express = require('express');
const router = express.Router();
const {doLogin , doSignUp , goHome} = require('../controllers/userControllers')

router.get('/',doLogin)
router.get('/signup',doSignUp)
router.post('/home',goHome)

module.exports=router;