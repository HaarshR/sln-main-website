const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const departmentSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  date: { type: Date, required: true },
  images: { type: Array, required: true },
  imageFolder: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  about: { type: String, required: true },
  colors: {
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
    tertiary: { type: String, required: true },
  },
});

departmentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Department", departmentSchema);
