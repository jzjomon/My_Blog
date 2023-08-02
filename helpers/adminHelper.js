 const ADMIN = require('../models/adminModel');
 const mongoose = require('mongoose');

 const getAdminData = (id) =>{
    return ADMIN.find({_id:id},{password:0})
 }

 module.exports = getAdminData;