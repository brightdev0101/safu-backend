require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./routes/api.js");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

const db = require("./config/keys.js").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api", api);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
