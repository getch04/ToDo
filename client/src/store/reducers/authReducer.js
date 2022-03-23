//jwt-decode for decoding
// import { jwtDecode } from "jwt-decode";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { SIGNUP, USER_LOADED } from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  _id: null,
  name: null,
  email: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case SIGNUP:
      console.log(action);
      toast.success("Welcome...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // console.log(jwt_decode(action.token));
      const user = jwt_decode(action.token);
      // console.log(user);
      // console.log(user.name);
      return {
        ...state,
        token: action.token,
        name: user.name,
        email: user.email,
        _id: user._id,
      };

    default:
      return state;
  }
};

export default authReducer;
