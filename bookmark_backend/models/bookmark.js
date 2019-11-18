const mongoose = require("mongoose");
const bookmarkSchema = mongoose.Schema({
  title: { type: String },
  url: { type: String }
});
module.exports = mongoose.model("Bookmark", bookmarkSchema);
