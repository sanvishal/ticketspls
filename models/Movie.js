const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    default: 0,
  },
  link: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  genre: {
    type: String,
    default: "Unknown",
  },
  summary: {
    type: String,
    default: "",
  },
  theatres: {
    type: Array,
    default: [],
  },
});

module.exports = Movie = mongoose.model("movies", MovieSchema);
