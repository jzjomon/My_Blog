const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }
})
const ADMIN = mongoose.model('admin',adminSchema);

module.exports = ADMIN;