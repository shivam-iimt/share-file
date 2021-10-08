const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.URL;
const connnection = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    if (conn) {
      console.log("Database Connected");
    } else {
      console.log("Database connection failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connnection;
