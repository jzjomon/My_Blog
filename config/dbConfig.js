const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL).then((result) => {
        console.log(process.env.MONGO_URL);
        console.log(`MongoDB Connected`);
      }).catch((err) => {
        console.log("db not connected");
      }); 
    } catch (error) {       
      console.error(error.message);
      process.exit(1);
    } 
} 
   
module.exports = connectDB;  