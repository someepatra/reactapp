const express = require("express");
const router = express.Router();
const Bookmark = require("../models/bookmark.js");

router.get("/", (req, res) => {
  Bookmark.find({}, (error, foundbookmarks) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundbookmarks);
  });
});
router.delete("/:id", (req, res) => {
  Bookmark.findByIdAndRemove(req.params.id, (error, deletedBookmark) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedBookmark);
  });
});
router.put("/:id", (req, res) => {
  Bookmark.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedBookmark) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).json(updatedBookmark);
    }
  );
});

router.post("/", (req, res) => {
  Bookmark.create(req.body, (error, createdBookmark) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdBookmark);
  });
});
module.exports = router;
