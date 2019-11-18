const express = require("express");
const bookmark = express.Router();
const Bookmark = require("../models/bookmark.js");
bookmark.get("/", (req, res) => {
  res.send("bookmark");
});
bookmark.get("/", (req, res) => {
  bookmark.find({}, (error, foundbookmarks) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundbookmarks);
  });
});
module.exports = bookmark;
