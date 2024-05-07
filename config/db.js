const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/Blog");
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`MONGO Connect Error ${error}`);
  }
};

module.exports = connectDB;
