const {USER} = require('../models/userModel');
const mongoose = require('mongoose')

const getUserData = (userid) =>{
    return USER.find({_id:userid},{password:0})
}

module.exports = {getUserData}