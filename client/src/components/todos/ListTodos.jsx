import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Todo from "./Todo";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../store/actions/todoActions";

const useStyles = makeStyles({
  todosStyles: {
    margin: "20px auto",
    padding: "20px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px",
  },
});

function ListTodos({setTodo}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  console.log(todos);
  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <div className={classes.todosStyles}>
      <Typography variant="h5">
        {todos.length > 0 ? "Your Todo Lists : " : "No todos Yet!"}
      </Typography>
      {todos.map((todo) => (
        <Todo todo={todo} setTodo={setTodo} key={todo._id} />
      ))}
    </div>
  );
}

export default ListTodos;
