const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const websiteInfoSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  landingPage: {
    detail: { type: String, required: true },
    helpPara: { type: String, required: true },
    joinPara: { type: String, required: true },
    joinParaImages: { type: Array, required: true },
  },
  departmentPage: {
    details: { type: String, required: true },
  },
  aboutUsPage: {
    image: { type: String, required: true },
    details: { type: String, required: true },
    mission: { type: String, required: true },
    galleryDetail: { type: String, required: true },
  },
  teamMembers: { type: Array, required: true },
});

websiteInfoSchema.plugin(uniqueValidator);

module.exports = mongoose.model("WebsiteInfo", websiteInfoSchema);
