const express = require('express');
const router = express.Router();
const {doLogin , doSignUp} = require('../controllers/userControllers')
// const doSignUp = require('../controllers/userControllers')

router.get('/',doLogin)
router.get('/signup',doSignUp)

module.exports=router;