const express = require('express');
const router = express.Router();
const {login,doLogin,home} = require('../controllers/adminControllers')

router.get('/',login)
router.post('/doLogin',doLogin)
router.get('/home',home)
module.exports=router;