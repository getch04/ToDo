const todos = require("./routes/todos");
const signup = require("./routes/signup");
const signin = require("./routes/signin");


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todos);
app.use("/api/signup", signup);
app.use("/api/signin", signin);
const connection_string = process.env.CONNECTION_STRING;

const port = process.env.PORT || 2222;

app.get("/", (req, res) => {
  res.send("Hello Todo!");
});

app.listen(port, () => {
  console.log("SERVER RUNNING....", port);
});

mongoose
  .connect(connection_string, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify:false
  })
  .then(() => {
    console.log("connected to databse...");
  })
  .catch((ee) => {
    console.log("error message: ", ee.message);
  });
