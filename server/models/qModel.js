const mongoose = require("mongoose");

const qSchema = new mongoose.Schema({
  description: {
    type: String, // Corrected type declaration
    required: true,
  },
  user: {
    type: String, // Corrected type declaration
    required: true,
  },
  type: {
    type: String, // Corrected type declaration
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer", // Assuming there's a model named "Answer" for answers
    },
  ],
}, {
  timestamps: true, // Moved timestamps option to the options object
});

const qModel = mongoose.model("que", qSchema);

module.exports = qModel;
