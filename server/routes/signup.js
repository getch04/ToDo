const Joi = require("joi");
const jwt = require("jsonwebtoken");

const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user)
      return res.status(400).send("user with this email already exist!");

    const { name, email, password } = req.body;

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    //hash pass
    user.password = await bcrypt.hash(user.password, salt);

    ///save to database
    await user.save()
    // res.send('User Created!')
    console.log("User Created");
    //generate a token
    const secretkey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretkey
    );
    res.send(token);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
