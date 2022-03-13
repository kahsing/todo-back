const dotenv = require("dotenv").config();
require("./db.js");

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

global["globalize"] = require("./helper/globalize");

const dbHelper = require("./helper/db_utils");
const genHelper = require("./helper/general");
const responseHelper = require("./helper/response");

globalize(dbHelper);
globalize(genHelper);
globalize(responseHelper);

// Apps
var app = express();
app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.json());

// Routes
const router = express.Router();
app.use(router);
router.get("/", (_, res) => res.json("hello world"));

const toDoRoute = require("./routes/toDoRoute");
app.use("/api", toDoRoute);

// Start App
const start = () => {
  try {
    app.listen(process.env.PORT || 3000, function () {
      console.log("listening on port 3000!");
    });
  } catch (err) {
    console.log("error", err);
  }
};

start();
