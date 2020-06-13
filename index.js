const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("express-cors");

const app = express();

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

app.get("/", (req, res) => {
  res.send("Ticketspls REST API");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running healthy on port: ${port}`);
});
