const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const subscriberSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  email: { type: String, required: true },
});

subscriberSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Subscriber", subscriberSchema);
