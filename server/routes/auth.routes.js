const router = require("express").Router();
const { register } = require("../controllers/auth.controller");
const {
  isRequestValidated,
  registerValidator,
} = require("../validators/auth.validator");

router.post("/register", registerValidator, isRequestValidated, register);

module.exports = router;
