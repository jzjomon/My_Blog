const { USER } = require('../models/userModel');
 const mongoose = require('mongoose');

 const getAdminData = (id) =>{
    return USER.findOne({_id:id,admin:true},{password:0})
 }

 module.exports = getAdminData;