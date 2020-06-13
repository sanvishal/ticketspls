const mongoose = require("mongoose");
const fs = require("fs");

const mongoURI = require("../config/keys").mongoURI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection established!"))
  .catch((err) =>
    console.warn(
      "There is some problem with the database connection ->>\n",
      err
    )
  );

const Movie = require("../models/Movie");
let _top50 = fs.readFileSync("top50.json");
let top50 = JSON.parse(_top50);

function getRandomTheatre() {
  let theatres = ["A", "B", "C", "D", "E"];
  let numTheatres = Math.floor(Math.random() * 10) % theatres.length;
  let result = [];
  while (numTheatres--) {
    result.push(theatres[numTheatres]);
  }
  if (result.length === 0) {
    result.push(theatres[Math.floor(Math.random() * 10) % theatres.length]);
  }
  return result;
}

Movie.count({}).then((count) => {
  if (count !== 50) {
    top50.forEach((movie) => {
      let newMovie = new Movie({
        title: movie.Title,
        year: movie.Year,
        rating: movie.Rating,
        duration: movie.Runtime,
        summary: movie.Description,
        genre: movie.Genre,
        director: movie.Director,
        actor: movie.Actor,
        theatres: getRandomTheatre(),
      });

      newMovie.save().then((result) => {
        console.log(result.title);
      });
    });
  } else {
    process.exit(0);
  }
});
