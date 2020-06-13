const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const keys = require("../config/keys");
const validators = require("../utils/validators");

const router = express.Router();

router.post("/register", (req, res) => {
  const { errors, isValid } = validators.validateRegisterData(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json({ message: errors, status: "error", type: "auth" });
  }

  User.findOne({ email: req.body.email }).then((alreadyexists) => {
    if (alreadyexists) {
      return res.status(400).json({
        status: "error",
        type: "auth",
        message: "This Email has already been registered",
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(15, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw console.log("Error while encrypting password");
          }

          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.json({ status: "success", message: user, type: "auth" })
            )
            .catch((err) => {
              res.status(500).json({
                type: "auth",
                message: "Internal server error :(",
                staus: "error",
              });
            });
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validators.validateLoginData(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json({ message: errors, status: "error", type: "auth" });
  }

  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        status: "error",
        type: "auth",
        message: "Please register an account",
      });
    } else {
      bcrypt.compare(password, user.password).then((matches) => {
        if (matches) {
          const jwt_payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          };

          jsonwebtoken.sign(
            jwt_payload,
            keys.serverSecret,
            {
              expiresIn: 60 * 60 * 60 * 24,
            },
            (err, token) => {
              if (err) {
                throw console.log(
                  "Something happened while signing JWT\n",
                  err
                );
              }
              // res.cookie("JWT", "Bearer " + token, {
              //   httpOnly: true,
              //   secure: true,
              // });
              return res.json({ status: "success", token: "Bearer " + token });
            }
          );
        } else {
          return res.status(400).json({
            status: "error",
            type: "auth",
            message: "Invalid login credentials!",
          });
        }
      });
    }
  });
});

module.exports = router;
