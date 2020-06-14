const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  booked_on: {
    type: Date,
    default: Date.now(),
  },
  movieid: {
    type: Schema.Types.ObjectId,
    ref: "movies",
  },
  showid: {
    type: Schema.Types.ObjectId,
    ref: "shows",
  },
  date: {
    type: String,
    default: "Today",
  },
  time: {
    type: String,
    default: "",
  },
  theatre: {
    type: String,
    default: "A",
  },
  tickets: {
    type: Array,
    default: [],
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Ticket = mongoose.model("tickets", TicketSchema);
