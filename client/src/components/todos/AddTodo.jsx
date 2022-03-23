import React from "react";

import { TextField, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../store/actions/todoActions";

const useStyle = makeStyles({
  formStyle: {
    margin: "30px auto",
    padding: "10px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px #000000",
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    marginLeft: "20px",
    maxHeight: "50px",
  },
});

function AddTodo({ todo, setTodo }) {
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(todo);

    if (todo._id) {
      const id = todo._id;
      const updatedTodo = {
        name: todo.name,
        isComplete: todo.isComplete,
        date: todo.date,
        author: "getch",
      };
      dispatch(updateTodo(updatedTodo, id));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
      dispatch(addTodo(newTodo));
    }
    setTodo({
      name: "",
      isComplete: false,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className={classes.formStyle}
      >
        <TextField
          id="enter-todo"
          label="enterTodo"
          variant="outlined"
          autoFocus
          fullWidth
          multiline
          value={todo.name}
          onChange={(e) => setTodo({ ...todo, name: e.target.value })}
        />
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          type="submit"
        >
          <Add />
        </Button>
      </form>
    </>
  );
}

export default AddTodo;
