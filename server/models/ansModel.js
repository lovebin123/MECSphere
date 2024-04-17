const mongoose = require('mongoose');

const aSchema = new mongoose.Schema({
    ans: {
      type: String, // Corrected type declaration
      required: true,
    },
    question:{
        type: String, // Corrected type declaration
        required: true,
    },
    qid:{
        type: mongoose.Schema.Types.ObjectId,   
    },
    user: {
      type: String, // Corrected type declaration
      required: true,
    },
    type: {
      type: String, // Corrected type declaration
    },
  }, {
    timestamps: true, // Moved timestamps option to the options object
  });
  
  const aModel = mongoose.model("an", aSchema);
  
  module.exports = aModel;