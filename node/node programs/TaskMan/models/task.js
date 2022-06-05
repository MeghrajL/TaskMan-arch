const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    //setting up validation for our properties using this objects
    type: String,
    required: [true, "Name is Compulsory"],
    trim: true,
    maxlength: [20, "Name must be less than 20 chars"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
