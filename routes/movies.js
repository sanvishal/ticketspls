const express = require("express");

const Movie = require("../models/Movie");

const router = express.Router();

router.post("/getmovies", (req, res) => {
  let rating = req.body.rating,
    theatre = req.body.theatre;
  sortby = req.body.sortby;

  let searchObj = {};
  if (rating) {
    searchObj = {
      rating: rating,
      theatres: { $in: [theatre] },
    };
  } else {
    searchObj = {
      theatres: { $in: [theatre] },
    };
  }

  console.log(searchObj);

  Movie.find(searchObj)
    .sort(sortby)
    .then((movies) => {
      res.json({
        status: "success",
        type: "movies",
        message: movies,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        type: "movies",
        message: "Internal server error  :(",
      });
    });
});

module.exports = router;
