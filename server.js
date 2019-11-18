const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("listening", port);
  });
  app.get("/", (req, res) => {
    res.send("its working");
  });
//console.log("welcome to react app");
