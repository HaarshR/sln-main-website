const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const serviceSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  // TO BE ADDED
});

serviceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Service", serviceSchema);
