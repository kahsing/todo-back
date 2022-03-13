// External Dependancies
const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    desc: String,
    done: Boolean,
    dateCreated: Date,
    dateUpdated: Date,
  },
  { versionKey: false }
);

module.exports = mongoose.model("ToDo", toDoSchema, "ToDos");
