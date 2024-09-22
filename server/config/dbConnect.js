const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CON, {
      dbName: "first",
    });
    console.log("Connected to the database successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
