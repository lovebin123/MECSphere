const mongoose = require("mongoose");
const userModel = mongoose.model(
  "user",
  new mongoose.Schema({
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    role :{
        type: "string",
        required: true,
    },

    password: {
      type: "string",
      required: true,
    },
    pfp: {
      type: "string",
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    friends:[
      {
        type: mongoose.Schema.Types.ObjectId,
      }
    ],
    requests: [
      {
        accepted: {type: Boolean},
        name:{type:"string"},
        status: {
          type: String, 
        },
        id: {
          type: String,
        },
      },
    ],
    chatRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    notifications: [
      {
        data: { type: "string" },
        type: { type: "string" },
        status: {
          type: String,
        },
        userid: {
          type: String,
        },
      },
    ],
    data_permission: Boolean,
  })
);

module.exports = userModel;
