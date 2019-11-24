const express = require("express");
const bcrypt = require("bcrypt");
const users = express.Router();
const User = require("../models/loginSchema.js");
//     POST ROUTE
users.post("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  users.create(req.body, (error, createdUser) => {
    if (error) {
      //res.status(400).json({err:err.message})
      res.status(200).json("already exist");
    } else {
      res.status(200).send(createdUser);
    }
  });
});
//      INDEX ROUTE
users.get("/", (req, res) => {
  User.find({}, (error, foundUsers) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(400).json(foundUsers);
  });
});
//      POST ROUTE
users.get("/", (req, res) => {
  console.log("req.body");
  User.findOne({ username: req.body.username}, (error, foundUser) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    if (foundUser && foundUser._id) {
      //Check password match only for bcrypted passwords
      // if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      //Check password match for both bcrypt and non brcypted passwords
      if (req.body.password === foundUser.password) {
        console.log(req.body.username);
        res.status(200).send(foundUsers);
      } else {
        res.status(200).json("wrong entry");
      }
    } else {
      res.status(200).json("invalid username");
    }
  });
});
//       DELETE  ROUTE
users.delete("/:id", (req, res) => {
  User.findByidAndRemove(req.params.id, (error, deletedUser) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedUser);
  });
});
//      UPDATE ROUTE
users.put("/:id", (req, res) => {
  User.findByidAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    },
    (error, updatedUser) => {
      if (error) {
        res.status(400).json(updatedUser);
      }
    }
  );
});
