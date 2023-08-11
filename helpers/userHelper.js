const {USER} = require('../models/userModel');
const mongoose = require('mongoose')

const getUserData = (userid) =>{
            return USER.findOne({_id:userid},{password:0})
}

module.exports = {getUserData}