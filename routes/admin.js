const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("hi you are in admin login")
})

module.exports=router;