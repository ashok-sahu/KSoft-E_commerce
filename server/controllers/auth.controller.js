const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CronJob = require("cron").CronJob;
const User = require("../models/User.model");
const asyncHandler = require("../helpers/asynHandler");
const nodemailer = require("../services/nodemailer.service");

exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, number, password, confirmPassword } = req.body;
    let user = await User.findOne({ email: email });
    if (user)
      return res.status(400).json({ message: "user is already exists" });

    var uid = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      uid += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    user = new User({
      name,
      email,
      number,
      password,
      confirmPassword,
      uid: uid,
    });

    console.log(user)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    await nodemailer
      .sendEmail(user.email, "register", null, user.name, uuid)
      .then(() => {
        res.status(200).send({
          status: "success",
          message: "Account Activation Link Sent To Your Mail",
        });
      });
  } catch (error) {
    res.json(400).json({
      status: false,
      error: error,
    });
  }
});
