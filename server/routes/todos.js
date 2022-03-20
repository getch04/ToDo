const { Todo } = require("../models/todo");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find().sort({ date: -1 });
    // .select({ name: 1 });
    res.send(todo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3).max(30),
    isComplete: Joi.boolean(),
    uid: Joi.string(),
    date: Joi.date(),
  });
  //   .options({abortEarly:false})

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { name, author, isComplete, date, uid } = req.body;
  let todo = new Todo({
    name,
    author,
    isComplete,
    date,
    uid,
  });
  try {
    todo = await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.send(404).send("Todo not Found...");

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
      isComplete: !todo.isComplete,
    });
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3).max(30),
    isComplete: Joi.boolean(),
    uid: Joi.string(),
    date: Joi.date(),
  });
  //   .options({abortEarly:false})
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.send(404).send("Todo not Found...");
    const { name, author, isComplete, date, uid } = req.body;

    const updateTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        name,
        author,
        isComplete,
        date,
        uid,
      },
      { new: true }
    );
    res.send(updateTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  //deleteOne()
  //deleteMany()
  //findByIdAndDelete()
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.send(404).send("Todo not Found...");

    const deletedtodo = await Todo.findByIdAndDelete(req.params.id);
    res.send(deletedtodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
