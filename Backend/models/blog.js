const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  image: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  detail: { type: String, required: true },
  viewCount: { type: String, required: true },
  comments: { type: Array, required: false },
  style: {
    backgroundColor: { type: String, required: true },
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
  },
});

blogSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Blog", blogSchema);
