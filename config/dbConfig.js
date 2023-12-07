const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const result = await mongoose.connect(mongoURL);
    if (result) {
      console.log(`MongoDB Connected`);
    } else {
      console.log("db not connected");
    }
  } catch (err) {
    console.log("mongodb error");
  }
  }  
   
module.exports = connectDB;       