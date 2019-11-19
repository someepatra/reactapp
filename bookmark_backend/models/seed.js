const mongoose = require("mongoose");
const BookmarkModel = require("./bookmark.js");
const seedBookmark = [
  {
    title: "google",
    url: "google.com"
  },
  {
    title: "facebook",
    url: "facebook.com"
  },
  {
    title: "linkedin",
    url: "linkedin.com"
  },
  {
    title: "twitter",
    url: "twitter.com"
  }
];
// Seeding function
const seedDB = () => {
  // Declare db name, URI, and instantiate connection
  const dbName = "bookmark";
  const dbURI = `mongodb://localhost:27017/${dbName}`;
  const dbConnection = mongoose.connection;

  dbConnection.on("error", err => console.log("DB Connection Error: ", err));
  dbConnection.on("connected", () => console.log("DB Connected to: ", dbURI));
  dbConnection.on("disconnected", () => console.log("DB Disconnected"));

  mongoose.connect(dbURI, { useNewUrlParser: true }, () =>
    console.log(`${dbName} db running on ${dbURI}`)
  );
  BookmarkModel.collection.drop();
  BookmarkModel.create(seedBookmark, (err, newBookmarks) => {
    if (err) {
      console.log("Seeding error: ", err);
    } else {
      console.log("Seeding OK: ", newBookmarks);
    }
    dbConnection.close();
  });
};
seedDB();
module.exports = seedBookmark;