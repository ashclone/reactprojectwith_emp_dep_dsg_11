const mongoose = require("mongoose");

const dsgSchema = mongoose.Schema({
  name: String,
});

const dsgObj = mongoose.model("designation", dsgSchema);
module.exports = dsgObj;
