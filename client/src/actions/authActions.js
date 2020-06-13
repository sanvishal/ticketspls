import axios from "axios";
import jwt_decode from "jwt-decode";
import { getPath } from "../utils/getPath";
import { GET_ERRORS, SET_USER } from "./types";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(getPath("/accounts/register"), userData)
    .then((res) => history.push("/login"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post(getPath("/accounts/login"), userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("JWT", token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("JWT");
  dispatch(setCurrentUser({}));
};
