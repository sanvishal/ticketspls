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
  rating: {
    type: Number,
    default: 0.0,
  },
  director: {
    type: String,
    default: "",
  },
  actor: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 0,
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
