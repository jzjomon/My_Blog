const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
require('dotenv').config();
const user = require('./routes/user');
const admin = require('./routes/admin');
const connectDB = require('./config/dbConfig');
const cookieParser = require('cookie-parser');


app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser())
app.use('/',(req,res,next)=>{
    res.set('Cache-Control','no-store');
    next()
})

app.use('/admin',admin);
app.use('/',user);

connectDB();

app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("server error");
    }
})