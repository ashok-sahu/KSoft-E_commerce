const { check, validationResult } = require("express-validator");

exports.registerValidator = [
  check("name", "Your name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("number", "Please include a valid phone number").isMobilePhone(),
  check(
    "password",
    "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  check("confirmPassword", "Passwords do not match!").custom(
    (value, { req, loc, path }) => {
      if (value !== req.body.password) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }
  ),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
