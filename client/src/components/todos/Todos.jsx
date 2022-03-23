import React, { useState } from "react";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";
import { Grid } from "@material-ui/core";

function Todos() {
  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
  });
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ListTodos setTodo={setTodo} />
        </Grid>
        <Grid item xs={4}>
          <AddTodo todo={todo} setTodo={setTodo} />
        </Grid>
      </Grid>
    </>
  );
}

export default Todos;
