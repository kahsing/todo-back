const mongoose = require("mongoose");

const { DB_SERVER, DB_NAME, DB_CONFIG } = process.env;
const server = DB_SERVER;
const database = DB_NAME;
const config = DB_CONFIG;
const uri = server + database + config;

// Connect to DB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.log(err));
