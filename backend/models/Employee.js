const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
  name: String,
  address: String,
  salary: Number,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "department" },
  designation: { type: mongoose.Schema.Types.ObjectId, ref: "designation" },
});

const empObj = mongoose.model("employee", empSchema);
module.exports = empObj;
