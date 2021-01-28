const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let todo = new Schema(
  {
    id: {
      type: Number,
    },
    text: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
    },
  },
  {
    collection: "todo",
    versionKey: false,
  }
);

module.exports = mongoose.model("Todo", todo);
