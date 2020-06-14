const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Show = new Schema({
  time: {
    type: String,
    required: true,
  },
  movieid: {
    type: Schema.Types.ObjectId,
    ref: "movies",
  },
  date: {
    type: "String",
    default: "Today",
  },
  seatsbooked: {
    type: Array,
    default: [],
  },
  theatre: {
    type: "String",
    default: "A",
  },
});

module.exports = Show = mongoose.model("users", Show);
