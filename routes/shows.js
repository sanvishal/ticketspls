const express = require("express");
const Show = require("../models/Show");
const Movie = require("../models/Movie");
const Ticket = require("../models/Ticket");

const router = express.Router();

router.post("/bookshow", (req, res) => {
  const { tickets, userid, movieid, time, date, theatre } = req.body;

  Show.find({ movieid, time, date, theatre }).then((shows) => {
    if (shows.length) {
      Show.findOneAndUpdate(
        { movieid, time, date, theatre },
        { $push: { seatsbooked: tickets } },
        { new: true }
      ).then((updated) => {
        let newTicket = new Ticket({
          showid: updated._id,
          movieid,
          date,
          time,
          theatre,
          tickets,
          userid,
        });
        newTicket.save().then((ticket) => {
          return res.json({
            type: "ticket",
            message: ticket,
            status: "success",
          });
        });
      });
    } else {
      let newShow = new Show({
        movieid,
        time,
        date,
        theatre,
        seatsbooked: tickets,
      });
      newShow.save().then((result) => {
        let newTicket = new Ticket({
          showid: result._id,
          movieid,
          date,
          time,
          theatre,
          tickets,
          userid,
        });
        newTicket.save().then((ticket) => {
          return res.json({
            type: "ticket",
            message: ticket,
            status: "success",
          });
        });
      });
    }
  });
});

router.post("/getshow", (req, res) => {
  const { movieid, time, date, theatre } = req.body;

  Show.findOne({ movieid, time, date, theatre }).then((show) => {
    if (show) {
      return res.json({
        message: show.seatsbooked,
        type: "show",
        status: "success",
      });
    } else {
      return res.json({
        message: [],
        type: "show",
        status: "success",
      });
    }
  });
});

router.post("/getticket", (req, res) => {
  const { ticketid } = req.body;

  Ticket.findOne({ _id: ticketid }).then((ticket) => {
    if (ticket) {
      Movie.findOne({ _id: ticket.movieid }).then((movie) => {
        let result = {
          ticket: ticket,
          title: movie.title,
        };
        return res.json({
          message: result,
          type: "show",
          status: "success",
        });
      });
    } else {
      return res.json({
        message: {},
        type: "error",
        status: "success",
      });
    }
  });
});

module.exports = router;
