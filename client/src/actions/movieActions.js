import axios from "axios";
import { getPath } from "../utils/getPath";
import { SELECTED_MOVIE, BOOK_TICKET, GET_ERRORS } from "./types";
import isEmpty from "is-empty";

export const getMovies = async (data, done) => {
  await axios
    .post(getPath("/movies/getmovies"), data)
    .then((res) => {
      done(res.data);
    })
    .catch((err) => {
      return done(err.response.data);
    });
};

export const getShow = async (data, done) => {
  await axios
    .post(getPath("/shows/getshow"), data)
    .then((res) => {
      return done(res.data);
    })
    .catch((err) => {
      return done(err.response.data);
    });
};

export const getTicket = async (data, done) => {
  await axios
    .post(getPath("/shows/getticket"), data)
    .then((res) => {
      return done(res.data);
    })
    .catch((err) => {
      return done(err.response.data);
    });
};

export const bookShow = (data) => async (dispatch) => {
  await axios
    .post(getPath("/shows/bookshow"), data)
    .then((res) => {
      dispatch({
        type: BOOK_TICKET,
        payload: res.data.message,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const selectShow = (movie, date, time, theatre) => (dispatch) => {
  if (!isEmpty(movie)) {
    dispatch({
      type: SELECTED_MOVIE,
      payload: movie,
      selected_date: date,
      selected_time: time,
      selected_theatre: theatre,
    });
  }
};
