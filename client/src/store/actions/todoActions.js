import axios from "axios";

import { url } from "../../api";
import { ADD_TODO, CHECK_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO } from "../types";
import { toast } from "react-toastify";
//action ceator



export const getTodos = () => {
  return (dispatch) => {
    axios
      .get(`${url}/todos`)
      .then((todos) => {
        dispatch({
          type: GET_TODOS,
          todos,
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const addTodo = (newTodo) => {
  //redux-thunk alow ass to retrun a functions
  return (dispatch, getState) => {
    axios
      .post(`${url}/todos`, newTodo)
      .then((todo) => {
        dispatch({
          type: ADD_TODO,
          payload: todo,
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          icon: true,
        });
      });
  };
};

export const updateTodo = (updatedTodo, id) => {
  //redux-thunk alow ass to retrun a functions
  return (dispatch) => {
    axios
      .put(`${url}/todos/${id}`, updatedTodo)
      .then((todo) => {
        dispatch({
          type: UPDATE_TODO,
          todo,
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const checkTodo = (id) => {
  //redux-thunk alow ass to retrun a functions
  return (dispatch) => {
    axios
      .patch(`${url}/todos/${id}`, {})
      .then((todo) => {
        dispatch({
          type: CHECK_TODO,
          todo,
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};


export const deleteTodo = (id) => {
  //redux-thunk alow ass to retrun a functions
  return (dispatch) => {
    axios
      .delete(`${url}/todos/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_TODO,
          payload:id
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

