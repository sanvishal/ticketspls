const validator = require("validator");
const isEmpty = require("is-empty");

module.exports.validateRegisterData = function (data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_again = !isEmpty(data.password_again)
    ? data.password_again
    : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Enter your name";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Enter your Email";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Check if your Email is correct";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Enter your password";
  }
  if (validator.isEmpty(data.password_again)) {
    errors.password_again = "Re-enter the password";
  }
  if (!validator.isLength(data.password, { min: 6, max: 40 })) {
    errors.password = "Enter a password of minimum 6 characters";
  }
  if (!validator.equals(data.password, data.password_again)) {
    errors.password_again = "The passwords don't match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.validateLoginData = function (data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
