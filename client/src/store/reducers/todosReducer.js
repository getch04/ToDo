import { ADD_TODO, CHECK_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO } from "../types";
import { toast } from "react-toastify";

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      toast.success("A todo was added...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(...state);
      console.log(action);
      return [action.payload.data, ...state];
    case GET_TODOS:
      console.log(action);
      return action.todos.data;
    case UPDATE_TODO:
      toast.success("A todo was updated...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return state.map((todo) =>
        todo._id === action.todo.data._id ? action.todo.data : todo
      );
    case CHECK_TODO:
      toast.success("A todo status was changed...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return state.map((todo) =>
        todo._id === action.todo.data._id ? action.todo.data : todo
      );
      case DELETE_TODO:
        toast.success("A todo was deleted...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return state.filter((todo)=>todo._id!==action.payload)
    default:
      return state;
  }
};

export default todoReducer;
