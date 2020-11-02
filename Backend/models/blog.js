const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  image: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true, unique: true },
  detail: { type: String, required: true },
  viewCount: { type: Number, required: true },
  comments: { type: Array, required: false },
});

blogSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Blog", blogSchema);
