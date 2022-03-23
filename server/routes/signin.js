const Joi = require("joi");

const jwt = require("jsonwebtoken");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("Invalid Username or passwod");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send("Invalid Username or passwod");

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


module.exports=router;