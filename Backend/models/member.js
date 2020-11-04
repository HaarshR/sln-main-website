const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const memberSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  dor: { type: Date, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  dob: { type: Date, required: false },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: false },
  social: { type: String, required: false },
  educInstitution: { type: String, required: false },
  fieldOfStudy: { type: String, required: false },
  questions: { type: Array, required: false },
  answers: { type: Array, required: false },
  department: { type: Array, required: false },
  membershipType: { type: String, required: true },
  cv: { type: String, required: false },
});

memberSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Member", memberSchema);
