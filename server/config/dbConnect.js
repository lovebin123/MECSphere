const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://ma:123@cluster0.0or2qai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      dbName: "first",
    });
    console.log("Connected to the database successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
