const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("express-cors");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

// import all routes
const accounts = require("./routes/accounts");
const movies = require("./routes/movies");

// parse data in response body as JSON
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// Setting up CORS initally to avoid headaches
app.use(
  CORS({
    allowedOrigins: ["localhost:*", "*.now.sh"],
    headers: ["X-Requested-With", "content-type", "x-access-token"],
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  })
);

app.options("*", (req, res, next) => {
  res.sendStatus(204);
});

// connect to remote DB
const mongoURI = require("./config/keys").mongoURI;
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

app.get("/", (req, res) => {
  res.send("Ticketspls REST API");
});

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/accounts", accounts);
app.use("/movies", movies);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running healthy on port: ${port}`);
});
