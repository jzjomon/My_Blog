const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const user = require('./routes/user');
const admin = require('./routes/admin');
const connectDB = require('./config/dbConfig');

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use('/',user);
app.use('/admin',admin)


connectDB();



app.listen(8080,(err)=>{
    if(err){
        console.log("server error");
    }
})