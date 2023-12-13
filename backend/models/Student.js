const mongoose = require("mongoose");
0.

const studentsSchema = new mongoose.Schema({
  admissionno: Number,
  name: String,
  Age: Number,
  course: String,
  image1:{data:Buffer,
    contentType:String
  }
});

var studentmodel = mongoose.model("student", studentsSchema);
module.exports = studentmodel;
