const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },    
    password:{
        type:String,
        required:true
    },
})
const users = mongoose.model('users',userShema);

module.exports = {users}