const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const eventSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  logo: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  departmentName: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  images: { type: Array, required: false },
});

eventSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Event", eventSchema);
