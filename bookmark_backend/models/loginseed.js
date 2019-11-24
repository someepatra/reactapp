const mongoose = require("mongoose");
const loginModel = require("./loginschema.js");
const seedLogin = [
  {
    username: "somi",
    password: "patra"
  },
  {
    username: "jitu",
    password: "patra"
  },
  {
    username: "kunmun",
    password: "patra"
  }
];
const seedDB = () => {
  // Declare db name, URI, and instantiate connection
  const dbName = "login";
  const dbURI = `mongodb://localhost:27017/${dbName}`;
  const dbConnection = mongoose.connection;

  dbConnection.on("error", err => console.log("DB Connection Error: ", err));
  dbConnection.on("connected", () => console.log("DB Connected to: ", dbURI));
  dbConnection.on("disconnected", () => console.log("DB Disconnected"));

  mongoose.connect(dbURI, { useNewUrlParser: true }, () =>
    console.log(`${dbName} db running on ${dbURI}`)
  );
  loginModel.collection.drop();
  loginModel.create(seedLogin, (err, newLogins) => {
    if (err) {
      console.log("Seeding error: ", err);
    } else {
      console.log("Seeding OK: ", newLogins);
    }
    dbConnection.close();
  });
};
seedDB();
module.exports = seedLogin;
