const mongoose = require('mongoose');

const blogShema = mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    catogory:{
        type:String,
        required:true
    },
    uploadedAt:{
        type:Date,
        default:new Date()
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }, 
    content:{
        type:String,
        required:true
    },
    images:[]
})
const UPLOADS = mongoose.model('uploads',blogShema);
module.exports = UPLOADS;