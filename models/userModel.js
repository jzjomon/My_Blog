const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    work:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
    creater:{
        type:Boolean,
        default:false
    },
    requestCreator:{
        type:Boolean,
        default:false
    },
    place:{
        type:String
    },
    image:[]
})
const USER = mongoose.model('users',userSchema);

module.exports = {USER};