const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const departmentSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  social: { type: String, required: true },
  educInstitution: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  questions: {
    question1: { type: String, required: true },
    question2: { type: String, required: true },
    question3: { type: String, required: true },
    question4: { type: String, required: true },
    question5: { type: String, required: true },
    question6: { type: String, required: true },
  },
  departments: { type: Array, required: true },
  cv: { type: String, required: false },
});

departmentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Department", departmentSchema);
