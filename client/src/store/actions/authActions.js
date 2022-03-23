import axios from "axios";

import { url } from "../../api";
import { SIGNUP, USER_LOADED } from "../types";
import { toast } from "react-toastify";
//action ceator

export const signUp = (user) => {
  //using the help of react-thunk
  return (dispatch) => {
    axios
      .post(`${url}/signup`, user)
      .then((token) => {
        //save to local storage
        localStorage.setItem("token", token.data);
        dispatch({
          type: SIGNUP,
          token: token.data,
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

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: USER_LOADED,
        token,
      });
    } else return null;
  };
};
