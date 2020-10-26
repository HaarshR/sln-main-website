const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const departmentSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  date: { type: Date, required: true },
  images: { type: Array, required: true },
  title: { type: String, required: true, unique: true },
  about: { type: String, required: true },
});

departmentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Department", departmentSchema);
